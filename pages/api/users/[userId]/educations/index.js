import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
        //Affiche les formations
        if (req.method === "GET") {
            const educations = await prisma.education.findMany({
                where: {
                    userId: req.query.userId,
                },
            });
            if (educations)
                return res.status(200).json(educations);
            if (!educations)
                return res.status(404).json({message: "Not found"});

        }
    if (session) {
        // Ajoute une formation
        if (req.method === "POST") {
            console.log("this")
            console.log(session);
            if (session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
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
                    return res.status(201).json({message: "Created Successfully!", education})
                else
                    return res.status(404).json({message: "Error"})

            } catch (e) {
                // Erreur sur la requête
                return res.status(404).json(e.message)
            }

        }

    }else {
        return res.status(404).json({message: "Error"})
    }
}
