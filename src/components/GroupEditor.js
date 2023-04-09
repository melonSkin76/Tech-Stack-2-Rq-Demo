import { addGroup, getGroups, deleteGroup } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

export default function GroupEditor() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [newName, setNewName] = useState("");

  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setGroups(await getGroups(token));
        setLoading(false);
      }
    }
    process();
  }, [isLoaded]);

  async function add() {
    const token = await getToken({ template: "codehooks" });
    const newGroup = await addGroup(token, newName);
    setNewName("");
    setGroups(groups.concat(newGroup));
  }

  async function del(group) {
    const token = await getToken({ template: "codehooks" });
    try {
      await deleteGroup(token, group);
    } catch (e) {
      console.log(e);
    }
    setGroups(await getGroups(token));
  }

  if (loading) {
    return <span> loading... </span>;
  } else {
    const groupListItems = groups.map((group) => (
      <li key={group.name}>
        {group.name}
        <span
          onClick={() => {
            del(group);
          }}
        >
          (x)
        </span>
      </li>
    ));

    return (
      <>
        <ol>
          {groupListItems}
          <input
            placeholder="add a group"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
          ></input>
          <button onClick={add}>add</button>
        </ol>
      </>
    );
  }
}
