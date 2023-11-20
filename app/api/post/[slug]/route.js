import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req, {params}) => {

    const {slug} = params;

    console.log('--------the slug:', slug)

    try {

        const post = await prisma.post.findUnique({
            where: {slug},
            include: {user: true}
        });

        // const user =  await prisma.activitie.findUnique({
        //     where: {slug},
        // })

        console.log("the posts----------------", post)

        return new NextResponse(JSON.stringify(post, {status: 200}))
        
    } catch (err) {
        console.log('c est une erreur ici------', err)
        return new NextResponse(JSON.stringify({message: "Something went wrong"}, {status: 500}))
    }
}



