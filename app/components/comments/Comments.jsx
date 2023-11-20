"use client"

import { useState} from "react";
import styles from './comments.module.css';
import Link from 'next/link';
import useSWR from "swr";
import {useSession} from "next-auth/react";
import Image from "next/image"

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();


  if(!res.ok){
    const error = new Error(data.message);
    throw error;
  }

  return data;
}

const Comments = ({activitieSlug}) => {
    const {status} = useSession();


    const {data, mutate, isLoading} = useSWR(`http://localhost:3000/api/comments?activitieSlug=${activitieSlug}`, 
    fetcher);

    const [description, setDescription] = useState("")


    const handleSubmit = async () => {

      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({description, activitieSlug})
      })
      mutate();
      setDescription("")
    }


  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Comments</h1>

      {status === 'authenticated' ? (
      
      <div className={styles.write}>

        <textarea 
        value={description}
        onChange={e => setDescription(e.target.value)} 
        className={styles.input} 
        placeholder='write a comment...' 
        />

        <button className={styles.button} onClick={handleSubmit}>Send</button>
      </div>
      
      ) : (
      
      <Link href="/login">Login to write a comment </Link>
      )}

<div className={styles.comments}>

{  isLoading 
            ? "loading" 
            : data?.map((item) => (

  <div className={styles.comment} key={item._id}>
          <div className={styles.user}>
                  <Image 
                  src={item.user.image}
                  width={50}
                  height={50} 
                  className={styles.image} 
                  />
                  <div className={styles.userInfo}>
                      <span className={styles.username}>{item.user.name}</span>
                      <span className={styles.date}>{item.createdAt.substring(0, 10)}</span>
                  </div>
                </div>
                <p className={styles.desc}>
                  {item.description}
                </p>
            </div>
          ))};
      </div>
    </div>
  );
};

export default Comments;
