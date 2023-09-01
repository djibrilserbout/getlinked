import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";


export default async function handler(req, res) {
    const session = await getSession({req})
    if (req.method === "GET") {
        const step = await prisma.step.findUnique({
            where: {
                id: req.query.stepId,
            },
        });
        if(step)
            return res.status(200).json(step);
        if(!step)
            return res.status(404).json({message: "Not found"});
    }
    if (req.method === "DELETE") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin')
            return res.status(401).json({message: "Unauthorized"})
        try {
            const step = await prisma.step.delete({
                where: {
                    id: req.query.stepId
                }
            })
            if (step)
                return res.status(200).json({message: "Successfully deleted!"});
        } catch(e) {
            return res.status(404).json({message: e.message})
        }
    }
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin')
            return res.status(401).json({message: "Unauthorized"})
        const step = await prisma.step.update({
            where: {
                id: req.query.stepId,
            },
            data: {
                name: req.body.name,
                description : req.body.description
            }
        });
        if (step)
            return res.status(200).json({message: "Successfully updated", step});
        else
            return res.status(404).json({message: "Not found"});

    }

}