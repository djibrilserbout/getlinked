import prisma from '../../../../../lib/prisma';
import {getSession, useSession} from "next-auth/react";
import {authOptions} from "../../../auth/[...nextauth]";
import {getServerSession} from "next-auth";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if(session) {
        //Affiche une expérience
        if (req.method === "GET") {
            const experience = await prisma.experience.findUnique({
                where: {
                    id: req.query.experienceId,
                },
            });
            if (experience)
                return res.status(200).json(experience);
            if (!experience)
                return res.status(404).json({message: "Not found"});
        }
        //Supprime une expérience
        if (req.method === "DELETE") {
            if (session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
                return res.status(401).json({message: "Unauthorized"})
            try {
                const experience = await prisma.experience.delete({
                    where: {
                        id: req.query.experienceId
                    }
                })
                if (experience)
                    return res.status(200).json({message: "Successfully deleted!"});
            } catch {
                return res.status(404).json({message: "Not Found"})
            }

        }
        //Modifie une expérience
        if (req.method === "PUT") {
            if (session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
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
                //Expérience mise à jour
                return res.status(200).json({message: "Successfully updated", experience});
            else
                return res.status(404).json({message: "Not found"});

        } else {
            // Methode non implémentée
            return res.status(501).json({message: "Not implemented"})
        }
    }else {
        return res.status(404).json({message: "Error"})
    }
}
