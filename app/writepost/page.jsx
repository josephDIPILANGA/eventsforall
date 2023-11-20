"use client"

import styles from './writepost.module.css';
import Image from 'next/image';
import {useEffect, useState} from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {app} from "../../utils/firebase";
import ReactQuill from "react-quill";
import { 
    getStorage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL } from "firebase/storage";



  const page = () => {

  const { status } = useSession();
  const router = useRouter()



  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");




  useEffect(() => {
        const storage = getStorage(app);
        const upload = () => {
                    const name = new Date().getTime + file.name
                    const storageRef = ref(storage, name);

                    const uploadTask = uploadBytesResumable(storageRef, file);
                    // Register three observers:
                    // 1. 'state_changed' observer, called any time the state changes
                    // 2. Error observer, called on failure
                    // 3. Completion observer, called on successful completion
                    uploadTask.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {}, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL)
                        });
                    }
                    );

        };

        file && upload();
    },[file])
  
    // console.log(data,status)
  
    if(status === "loading"){
      return <div className={styles.loading}>Loading...</div>
    }
  
    if(status === "unauthenticated"){
      router.push("/")
    }

    const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
          
        const res = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title,
                desc: description,
                img: media,
                slug: slugify(title),
                catSlug: catSlug || "style",
            })
        });

        console.log('-------this is the title', title);


        if (res.status === 200) {
            const data = await res.json();
            console.log('so there it is-----------', data)
            router.push(`/post/${data.slug}`);
          }
    }

  return (

    <div className={styles.container}>

                    <div class="mb-6">
                        <input
                                type="file"
                                id="image"
                                onChange={e=>setFile(e.target.files[0])} 
                                />
                    </div>

                    <div class="mb-6">
                        <label for="titre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input onChange={e=> setTitle(e.target.value)}  type="text" id="titre" class="bgInput  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div class="mb-6">
                        <label for="titre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
                            <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
                                <option value="style">style</option>
                                <option value="fashion">fashion</option>
                                <option value="food">food</option>
                                <option value="culture">culture</option>
                                <option value="travel">travel</option>
                                <option value="coding">coding</option>
                            </select>
                    </div>

                    <div class="mb-6">
                            <label for="titre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <ReactQuill 
                            className={styles.textArea} 
                            placeholder="Describe you event..." 
                            onChange={setDescription} 
                            theme="bubble" 
                            description={description}
                            />
                    </div>

          
        <button className={styles.publish} onClick={handleSubmit}>
            Publish
        </button>
    </div>

  )
}

export default page
