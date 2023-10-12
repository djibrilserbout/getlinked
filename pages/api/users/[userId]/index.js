import prisma from '../../../../lib/prisma';
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    // Afficher un utilisateur
    if (req.method === "GET") {
        const user = await prisma.user.findUnique({
            where: {
                id: req.query.userId,
            },
        });
        if (user)
            return res.status(200).json(user);
        else
            return res.status(404).json({message: "Not found"});
    }
    // Mettre à jour l'utilisateur
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
            // Non autorisé
            return res.status(401).json({message: "Unauthorized"})
        const user = await prisma.user.update({
            where: {
                id: req.query.userId,
            },
            data: {
                jobTitle: req.body.jobTitle,
                description: req.body.description,
            }
        });
        if (user)
            //Mise à jour de l'utilisateur
            return res.status(200).json({message: "Successfully updated", user });
        else
            //Problème avec la requête
            return res.status(404).json({message: "Not found"});

    }
    else {
        // Methode non implémentée
        return res.status(501).json({message: "Not implemented"})
    }
}