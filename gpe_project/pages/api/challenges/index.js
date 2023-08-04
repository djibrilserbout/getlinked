import prisma from '../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})
    if (req.method === "GET") {
        try {
            const challenges = await prisma.challenge.findMany();
            return res.status(200).json(challenges);

        } catch {
            return res.status(404).json({message: "error"})
        }
    }

    if (req.method === "POST") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin')
            return res.status(401).json({message: "Unauthorized"})
        try {

            const challenge = await prisma.challenge.create({
                data: {
                    name: req.body.name ?? null
                }
            })
            if(challenge)
                res.status(201).json({message: "Created Successfully!", challenge})
            else
                res.status(404).json({message: "Error"})

        }
        catch(e) {
            res.status(404).json({message: e.message})
        }

    }
    else {
        return res.status(501).json({message: "Not implemented"})
    }
}