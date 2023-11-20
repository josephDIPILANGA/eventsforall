import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import {getAuthSession} from "@/utils/auth";

export const GET = async (req) => {

    const {searchParams} = new URL(req.url);

    const page = searchParams.get("page");
    const cat = searchParams.get("cat");

    const POST_PER_PAGE = 10;

    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        include: {user: true},
        where: {
            ...(cat && { catSlug: cat }),
        },
    };

    try {
        const [activities, count] = await prisma.$transaction([
            prisma.activitie.findMany(query),
            prisma.activitie.count({where:query.where})
        ])
        // const activities = await prisma.activitie.findMany()
        return new NextResponse(JSON.stringify({activities}, {status: 200}))
        
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Something went wrong"}, {status: 500}))
    }
}


// CREATE A ACTIVITIE

export const POST = async (req) => {

    console.log('hello here')

    const session = await getAuthSession();

    if(!session){
        return new NextResponse(
            JSON.stringify({message: "Not Authenticated"}, {status: 401})
            );
    }
    console.log('hello here two you are auth---');

    // const {searchParams} = new URL(req.url);
    // const activitieSlug = searchParams.get("activitieSlug");
    try {
        const body = await req.json()
        const activitie = await prisma.activitie.create({
            data: {...body, userEmail: session.user.email}
        })
        console.log('congratulation, we post a activitie--------------')
        return new NextResponse(JSON.stringify(activitie, {status: 200}))
        
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Something went wrong"}, {status: 500}))
    }
}