
import React from 'react'
import Image from 'next/image';
import styles from "./activities.module.css";
import Activitie from "./activitie/Activitie";
import Link from 'next/link';
// import {useRouter} from "next/navigation";


const getData = async (page, cat) => {

    const res = await fetch(`http://localhost:3000/api/activities?page=${page}&cat=${cat || ""}`, {
      cache: "no-store",
    });
  
    if(!res.ok){

      throw new Error("Failed");

    }
      
    return res.json();

};


const Activities = async  ({page, cat}) => {

    const {activities, count} = await getData(page, cat);

    // const router = useRouter();

    // if (router.pathname === '/') {
    //   // Vous êtes sur la page d'accueil
    // }

    const POST_PER_PAGE = 2;
    const hasPrev = POST_PER_PAGE * (page-1) > 0;
    const hasNext = POST_PER_PAGE * (page-1) + POST_PER_PAGE < count;

  return (
    <div>
      <section class="overflow-hidden relative">
                          <div class="flex">
                              <h1 class="text-white py-5">Nearest activities</h1>
                          </div>
                          <div className='flex'>
                                {activities?.map((item) => (
                                    <Activitie item={item} key={item._id} />
                                  ))}
                          </div>
                     <Link href="/activities">
                        <div class="w-20 h-20 absolute top-40 right-2 rounded-full flex items-center justify-center bg-white opacity-50 hover:opacity-80 transition-opacity duration-300">
                          <i class="text-gray-700 fas fa-chevron-right">MORE</i>
                        </div>
                    </Link> 
       </section>
    </div>
  )
}

export default Activities
