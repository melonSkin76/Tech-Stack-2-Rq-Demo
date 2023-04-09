import { addGroup, getGroups, deleteGroup, getReview, postReview, updateReview } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

export default function ReviewEditor( {group}) {
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [newName, setNewName] = useState("");

  const [notes, setNotes] = useState("")
  const [score, setScore] = useState(0)
  

  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        const newReview = await getReview(token, group);
        if (newReview) {
            setNotes(newReview?.notes);
            setScore(newReview?.score);
        }
        setReview(newReview);
        setLoading(false);
      }
    }
    process();
  }, [isLoaded, group]);


  async function createOrUpdate() {
    const token = await getToken({ template: "codehooks" })
    if (review) {
        // copy
        let newReview = { ...review}
        newReview.notes = notes;
        newReview.score = score;
        newReview = await updateReview(token, newReview);
        setReview(newReview);
    } else {
        const newReview = await postReview(token, group, notes, score);
        setReview(newReview);
    }
  }

  if (loading) {
    return <span> loading... </span>;
  } else {
    return <><h1>{group}</h1>
        <input type="number" min="0" max="10" value = {score} onChange={(e)=>setScore(e.target.value)}></input>
        <textarea value = {notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
        <button onClick = {createOrUpdate}>Save</button>
    </>
  }
}
