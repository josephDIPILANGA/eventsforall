"use client"

import styles from './write.module.css';
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


    // const getData = async () => {

    //     const res = await fetch(`http://localhost:3000/api/categories}`, {
    //       cache: "no-store",
    //     });
    //     // const res = await fetch(`http://localhost:3000/api/activities`, {
    //     //   cache: "no-store",
    //     // });
      
    //     if(!res.ok){
    
    //     //   throw new Error("Failed");
    //      return console.log('Failed-------------------------------------------')
    
    //     }
    
    //     return res.json();
    // };



  const page = () => {

  const { status } = useSession();
  const router = useRouter();


  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [date_begin, setDate_begin] = useState(null);
  const [date_end, setDate_end] = useState(null);
  const [categories, setCategories] = useState([]);




  useEffect(() => {

    const getData = async () => {

        const res = await fetch(`http://localhost:3000/api/categories`, {
            cache: "no-store",
          });

          if(!res.ok){
            throw new Error("Failed");
          }

          const data =  res.json();

          setCategories([data]);
          console.log('------------------------------',categories)
    }

        getData();

        console.log('categories---------------', categories);

        const storage = getStorage(app);
        const upload = () => {
                    const name = new Date().getTime + file.name
                    const storageRef = ref(storage, name);

                    const uploadTask = uploadBytesResumable(storageRef, file);
  
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

        // La date------------------------------------------------------
       
        const dateTimeFormat = new Date(date_begin);
        dateTimeFormat.setHours(0, 0, 0, 0); // Réglez l'heure sur minuit
        const newDate = dateTimeFormat.toISOString();
        setDate_begin(newDate)
        console.log("the new date----" , newDate)
          
        const res = await fetch("/api/activities", {
            method: "POST",
            body: JSON.stringify({
                title,
                town,
                description: description,
                image: media,
                street: street,
                number: number,
                date_begin: newDate,
                date_end: date_end,
                slug: slugify(title),
                catSlug: catSlug || "style",
            })
        });

        console.log('-------this is the town', town);
        console.log('-------this is the title', title);


        if (res.status === 200) {
            const data = await res.json();
            console.log('so there it is-----------', data)
            router.push(`/activities/${data.slug}`);
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
                        <label for="titre" class="block text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
                        <div class="grid grid-cols-7 gap-4">
                            <input onChange={e => setTown(e.target.value)}  type="text" id="town" class="bgInput col-span-2  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="town" required />
                            <input type="text"  onChange={e => setStreet(e.target.value)} id="street" class="bgInput col-span-4  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="street" required />
                            <input type="number" onChange={e => setNumber(e.target.value)} id="number" class="bgInput col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="number" required />
                        </div>
                     </div>

                     <div class="mb-6">
                        <label for="titre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Begin at</label>
                        <input onChange={e => setDate_begin(e.target.value)}  type="date" name="date_begin" pattern="\d{4}-\d{2}-\d{2}" id="titre" class="bgInput  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div class="mb-6">
                        <label for="titre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End at</label>
                        <input onChange={e => setDate_end(e.target.value)} type="time" v-model="form.date_fin"  id="titre" class="bgInput  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
