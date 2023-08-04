import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";

export default async function handler(req, res) {
    const session = await getSession({req})
    if (req.method === "GET") {
        const session = await getSession({req})
        console.log(session);
        const educations = await prisma.education.findMany({
            where: {
                userId: req.query.userId,
            },
        });
        if (educations)
            res.status(200).json(educations);
        if (!educations)
            res.status(404).json({message: "Not found"});

    }
    if (req.method === "POST") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        try {
            const education = await prisma.education.create({
                data: {
                    name: req.body.name ?? null,
                    dateBegin: req.body.dateBegin ?? null,
                    dateFinish: req.body.dateFinish ?? null,
                    schoolName: req.body.schoolName ?? null,
                    description: req.body.description ?? null,
                    userId: req.query.userId ?? null
                }
            })
            console.log(education)
            if (education)
                res.status(201).json({message: "Created Successfully!", education})
            else
                res.status(404).json({message: "Error"})

        } catch (e) {
            res.status(404).json(e.message)
        }

    }


}
