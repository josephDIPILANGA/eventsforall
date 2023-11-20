import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req, {params}) => {

    const {slug} = params;

    console.log('--------the slug:', slug)

    try {

        const activitie = await prisma.activitie.update({
            where: {slug},
            data: {views: {increment: 1}},
            include: {user: true}
        });

        // const user =  await prisma.activitie.findUnique({
        //     where: {slug},
        // })

        console.log("the activities----------------", activitie)

        return new NextResponse(JSON.stringify(activitie, {status: 200}))
        
    } catch (err) {
        console.log('c est une erreur ici------', err)
        return new NextResponse(JSON.stringify({message: "Something went wrong"}, {status: 500}))
    }
}



