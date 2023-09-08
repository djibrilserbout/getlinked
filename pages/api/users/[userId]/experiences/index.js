import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";


export default async function handler(req, res) {
    const session = await getSession({req})
    // Liste les expérience d'un utilisateur
    if (req.method === "GET") {
        const experiences = await prisma.experience.findMany({
            where: {
                userId: req.query.userId,
            },
        });
        if(experiences)
            res.status(200).json(experiences);
        if(!experiences)
            // Erreur sur la requête
            res.status(404).json({message: "Not found"});
    }
    // Ajoute une expérience à un utilisateur
    if (req.method === "POST") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            return res.status(401).json({message: "Unauthorized"})
        try {
            const experience = await prisma.experience.create({
                data: {
                    name: req.body.name ?? null,
                    dateBegin: req.body.dateBegin ?? null,
                    dateFinish: req.body.dateFinish ?? null,
                    companyName: req.body.companyName ?? null,
                    description: req.body.description ?? null,
                    userId: req.query.userId ?? null
                }
            })
            console.log(experience)
            if(experience)
                // Nouvelle expérience crée
                res.status(201).json({message: "Created Successfully!", experience})
            else
                // Erreur dans la requête
                res.status(404).json({message: "Error"})

        }
        catch(e) {
            //Erreur lancée avec throw
            res.status(404).json(e.message)
        }

    }

}