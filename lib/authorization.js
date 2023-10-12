import {getSession} from "next-auth/react";
import prisma from "./prisma";

export default async function authorization({req, query}) {
    const {userId, challengeId} = query
    const session = await getSession({req});
    let isAdmin = false;
    let isMine = false;
    let isSuperAdmin = false;
    let isRecruiter = false;

    if (session?.role === 'superadmin') {
        isSuperAdmin = true;
    }
    if (session?.role === 'admin' || session?.role === 'superadmin') {
        isAdmin = true;
    }
    if (session?.user?.id === userId) {
        isMine = true;
    }
    if (session?.type === "recruiter") {
        isRecruiter = true;
    }
    /*const challenge = await prisma.challenge.findUnique({
        where: {
            id: challengeId,
        },
    });*/

   /* const challenge = await prisma.challenge.findUnique({
        where: {
            id: challengeId,
        },
    });
    if (session?.user.id === challenge.userId) {
        isOwnChallenge = true;
    }*/
    console.log(challengeId);
    return {
        isSuperAdmin: isSuperAdmin,
        isAdmin: isAdmin,
        isMine: isMine,
        isRecruiter: isRecruiter,
    }
}