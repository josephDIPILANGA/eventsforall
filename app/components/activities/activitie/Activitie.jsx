
import Image from 'next/image';
import Link from 'next/link'
import styles from "../activities.module.css";

const Activitie = ({item}) => {

    console.log("ITEM_________________________")

  return (
    <div>
    <div>
        <div class="flex">
                <div  class={`${styles.back} shadow-xl min-w-300 rounded-lg mx-1`}>
                    <Link href={`/activities/${item.slug}`} class="relative">
                            { item.image ? 
                                        (<Image class="rounded-t-lg" width={350} height={350} src={item.image} alt="" />) : 
                                        (<Image class="rounded-t-lg" width={350} height={350} src='/post/velo.jpg' alt="" />)
                            }
                        <div class="absolute top-2 bg-white left-2 p-1 rounded">
                            <p>{item.catSlug}</p>
                        </div>

                        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center absolute top-2 right-2">
                            <i class="fas fa-location-arrow text-black-500"></i>
                        </div>

                        <div class="absolute bottom-4 right-2 p-1 text-white">
                            <p>{item.date_begin.substring(0,10)}</p>
                        </div>
                    </Link>
                    
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white text-white">{item.title}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 "><i class="fa fa-location-arrow" aria-hidden="true"></i>{item.town}, {item.street} {item.number}</p>
                        <p  class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-white"><i class="fa-solid fa-user"> </i> <a href=""> organisé par {item.user.name}</a ><i class="fa-solid fa-star"></i></p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-white"><i class="fa-solid fa-users"></i> Participants autorisés {item.peoples_authaurize}</p>
                        <Link href={`/activities/${item.slug}`} class="inline-flex items-center px-3 py-2 bg-white text-sm font-medium text-center text-lime-600 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
        </div>
    </div>
</div>
  )
}

export default Activitie
