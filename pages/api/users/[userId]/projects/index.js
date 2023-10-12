import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../auth/[...nextauth]";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
        // Liste les expérience d'un utilisateur
        if (req.method === "GET") {
            const projects = await prisma.project.findMany({
                where: {
                    userId: req.query.userId,
                },
            });
            if (projects)
                return res.status(200).json(projects);
            if (!projects)
                // Erreur sur la requête
                return res.status(404).json({message: "Not found"});
        }
    if (session) {
        // Ajoute un projet à un utilisateur
        if (req.method === "POST") {
            if (session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId) {
                console.log(["session-user-id", session?.user.id])
                return res.status(401).json({message: "Unauthorized"})
            }
            try {
                const project = await prisma.project.create({
                    data: {
                        name: req.body.name ?? null,
                        dateBegin: req.body.dateBegin ?? null,
                        dateFinish: req.body.dateFinish ?? null,
                        challengeName: req.body.challengeName ?? null,
                        link: req.body.link ?? null,
                        description: req.body.description ?? null,
                        userId: req.query.userId ?? null
                    }
                })
                console.log(project)
                if (project)
                    // Nouveau projet crée
                    return res.status(201).json({message: "Created Successfully!", project})
                else
                    // Erreur dans la requête
                    return res.status(404).json({message: "Error"})

            } catch (e) {
                //Erreur lancée avec throw
                return res.status(404).json(e.message)
            }

        }
    }else {
        return res.status(404).json({message: "Error"})
    }

}