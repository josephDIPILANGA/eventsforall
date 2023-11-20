import React from 'react';
import styles from './categoryList.module.css';
import Link from 'next/link';
import Image from 'next/image';

const getData = async () => {

  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if(!res.ok){
    throw new Error("Failed");
  }

  return res.json();
}

const categoryList = async () => {

  const data = await getData();

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Popular Category</h1>
        <div className={styles.categories}>
          {data?.map((item) => (
                              <Link href={`/blog?cat=${item.title}`} 
                              className={`${styles.category} ${styles[item.slug]}`}
                              key={item._id}
                    
                              >
                                  {item.image ? (<Image 
                                  src="/next.svg" 
                                  className={styles.image} 
                                  alt="" 
                                  width={33} 
                                  height={33} />) : (

                                    <Image 
                                  src="/next.svg" 
                                  className={styles.image} 
                                  alt="" 
                                  width={33} 
                                  height={33} />
                                  )}

                                  {item.title}

                              </Link>
          ))}
        </div>
    </div>
  )
}

export default categoryList
