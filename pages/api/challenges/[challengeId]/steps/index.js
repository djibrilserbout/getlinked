import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";


export default async function handler(req, res) {
    const session = await getSession({req})
    if (req.method === "GET") {
        const steps = await prisma.step.findMany({
            where: {
                challengeId: req.query.challengeId,
            },
        });
        if(steps)
            res.status(200).json(steps);
        if(!steps)
            res.status(404).json({message: "Not found"});
    }
    if (req.method === "POST") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin')
            return res.status(401).json({message: "Unauthorized"})
        try {
            const step = await prisma.step.create({
                data: {
                    name: req.body.name ?? null,
                    description: req.body.description ?? null,
                    challengeId: req.query.challengeId ?? null
                }
            })
            console.log(step)
            if (step)
                return res.status(201).json({message: "Created Successfully!", step})
            else
                return res.status(404).json({message: "Error"})

        } catch (e) {
            return res.status(404).json({message: e.message})
        }

    }

}