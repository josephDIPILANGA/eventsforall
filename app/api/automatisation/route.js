import { CronJob } from 'cron';
import {generateContent} from '../../../utils/automatisation/chatgpt';
import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import {getAuthSession} from "@/utils/auth";



export const GET = async () => {

    const session = await getAuthSession();

    if(!session){
        return new NextResponse(
            JSON.stringify({message: "Not Authenticated"}, {status: 401})
            );
    }

    try {
        const job = new CronJob(
            '* * * * *', // cronTime
            async function () {
                let data = await generateContent();
                console.log('BEFORE PARSING _____________', data);
                let inputData = JSON.parse(data);
                console.log('after parsing-------------------', inputData);
                const activitie = await prisma.post.create({
                    data: {...inputData, userEmail: session.user.email}
                })
                return new NextResponse(JSON.stringify(activitie, {status: 200}));
            }, // onTick
            null, // onComplete
            true, // start
            'America/Los_Angeles' // timeZone
        );

        // job.start() is optional here because of the fourth parameter set to true.
        // const body = generateContent();
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Something went wrong"}, {status: 500}))
    }
}
