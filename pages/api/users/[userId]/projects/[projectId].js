import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})
    //Affiche une projet
    if (req.method === "GET") {
        const project = await prisma.project.findUnique({
            where: {
                id: req.query.projectId,
            },
        });
        if (project)
            return res.status(200).json(project);
        if (!project)
            return res.status(404).json({message: "Not found"});
    }
    //Supprime un projet
    if (req.method === "DELETE") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        try {
            const project = await prisma.project.delete({
                where: {
                    id: req.query.projectId
                }
            })
            if (project)
                return res.status(200).json({message: "Successfully deleted!"});
        } catch {
            return res.status(404).json({message: "Not Found"})
        }

    }
    //Modifie un projet
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        const project = await prisma.project.update({
            where: {
                id: req.query.projectId,
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                dateBegin: req.body.dateBegin,
                dateFinish: req.body.dateFinish,
                link: req.body.link,
                challengeName: req.body.challengeName,
            }
        });
        if (project)
            //Projet mise à jour
            return res.status(200).json({message: "Successfully updated", project});
        else
            return res.status(404).json({message: "Not found"});

    } else {
        // Methode non implémentée
        return res.status(501).json({message: "Not implemented"})
    }

}
