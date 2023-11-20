"use client";

import React, {useState, useEffect}from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import generateContent from '../../../utils/automatisation/chatgpt';
import generateNewContent from '../../../utils/automatisation/executor';

const Featured = () => {

  const [content, setContent] = useState("");

  useEffect( () => {
          // Déclaration de la fonction asynchrone à l'intérieur de useEffect
              // async function fetchContent() {
              //   try {
                  // const fetchedContent = await generateContent();                  
                  // setContent(fetchedContent);
                  // console.log(fetchedContent);
                  // console.log(content);
                  // let data = JSON.parse(fetchedContent);
                  //  console.log(data);

                // } catch (error) {
                  // console.error('Erreur lors de la récupération du contenu:', error);
              //   }
              // }
          // Appel de la fonction asynchrone
          // fetchContent();
  }, [])



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, joseph here!</b> Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/post/warEgs.png" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur.</h1>
          <p className={styles.postDesc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione voluptate voluptatem tempora?
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;