import { getReview, getReviews, postReview, updateReview } from '@/modules/Data';
import { useAuth, UserButton, SignIn } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import ReviewEditor from '@/components/ReviewEditor'

export default function Test() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  async function test() {
    const token = await getToken({template: 'codehooks'})
    
  }

  return <>{userId ? <UserButton></UserButton> : <SignIn></SignIn>}
    <ReviewEditor group="MaryJ"></ReviewEditor></>
}
