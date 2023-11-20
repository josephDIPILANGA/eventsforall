import React from 'react';
import styles from "./card.module.css";
import Image from "next/image";
import Link from 'next/link';

const Card = ({key, item}) => {
  return (
    <div>
      <div className={styles.container} key={key}>
        {item.image ? (
            <div className={styles.imageContainer}>
                  <Image src={item.image} alt="" className={styles.image} fill />
            </div>
        ) : (<div className={styles.imageContainer}>
                <Image src='/post/velo.jpg' alt="" className={styles.image} fill />
            </div>)}

        <div className={styles.textContainer}>
            <div className={styles.detail}>
                <span className={styles.date}>{item.createdAt.substring(0,10)}</span>
                <span className={styles.category}>{item.catSlug}</span>
            </div>
            <Link href={`/post/${item.slug}`}>
                <h1>{item.title}</h1>
            </Link>
                      <p className={styles.desc} 
                          dangerouslySetInnerHTML={{__html: item?.desc.substring(0, 65)}} 
                      />

                <div>
                      <Link href={`/post/${item.slug}`} className="inline-flex items-center px-3 py-2 bg-white text-sm font-medium text-center text-lime-600 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </Link>
                </div>                
        </div>
      </div>
    </div>
  )
}

export default Card
