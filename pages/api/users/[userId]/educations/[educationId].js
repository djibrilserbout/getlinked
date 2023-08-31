import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})
    if (req.method === "GET") {
        const education = await prisma.education.findUnique({
            where: {
                id: req.query.educationId,
            },
        });
        if(education)
            return res.status(200).json(education);
        if(!education)
            return res.status(404).json({message: "Not found"});
    }
    if (req.method === "DELETE") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        try {
            const education = await prisma.education.delete({
                where: {
                    id: req.query.educationId
                }
            })
            if (education)
                return res.status(200).json({message: "Successfully deleted!"});
        }
        catch {
            return res.status(404).json({message: "Not Found"})
        }

    }
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        const education = await prisma.education.update({
            where: {
                id: req.query.educationId,
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                dateBegin: req.body.dateBegin,
                dateFinish: req.body.dateFinish,
                schoolName: req.body.schoolName
            }
        });
        if (education)
            return res.status(200).json({message: "Successfully updated", education });
        else
            return res.status(404).json({message: "Not found"});

    }
    else {
        return res.status(501).json({message: "Not implemented"})
    }


}
