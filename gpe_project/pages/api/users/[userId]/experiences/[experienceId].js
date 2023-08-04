import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})

    if (req.method === "GET") {
        const experience = await prisma.experience.findUnique({
            where: {
                id: req.query.experienceId,
            },
        });
        if (experience)
            res.status(200).json(experience);
        if (!experience)
            res.status(404).json({message: "Not found"});
    }
    if (req.method === "DELETE") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        try {
            const experience = await prisma.experience.delete({
                where: {
                    id: req.query.experienceId
                }
            })
            if (experience)
                res.status(200).json({message: "Successfully deleted!"});
        } catch {
            res.status(404).json({message: "Not Found"})
        }

    }
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        const experience = await prisma.experience.update({
            where: {
                id: req.query.experienceId,
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                dateBegin: req.body.dateBegin,
                dateFinish: req.body.dateFinish,
                companyName: req.body.companyName
            }
        });
        if (experience)
            return res.status(200).json({message: "Successfully updated", experience});
        else
            return res.status(404).json({message: "Not found"});

    } else {
        return res.status(501).json({message: "Not implemented"})
    }

}