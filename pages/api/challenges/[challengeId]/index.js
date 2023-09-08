import prisma from '../../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})
    // Affiche un challenge en particulier
    if (req.method === "GET") {
        const challenge = await prisma.challenge.findUnique({
            where: {
                id: req.query.challengeId,
            },
        });
        if (challenge)
            return res.status(200).json(challenge);
        if (!challenge)
            return res.status(404).json({message: "Not found"});
    }
    // Supprime un challenge en particulier
    if (req.method === "DELETE") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin')
            return res.status(401).json({message: "Unauthorized"})
        try {
            const challenge = await prisma.challenge.delete({
                where: {
                    id: req.query.challengeId
                }
            })
            if (challenge)
                return res.status(200).json({message: "Successfully deleted!"});
            else
                return res.status(404).json({message: "Error"})
        } catch(e) {
            return res.status(404).json({message: e.message})
        }
    }
    //Modifie un challenge en particulier
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin')
            return res.status(401).json({message: "Unauthorized"})
        const challenge = await prisma.challenge.update({
            where: {
                id: req.query.challengeId,
            },
            data: {
                name: req.body.name,
            }
        });
        if (challenge)
            return res.status(200).json({message: "Successfully updated", challenge});
        else
            return res.status(404).json({message: "Not found"});

    }
    else {
        // Methode non implementée
        return res.status(501).json({message: "Not implemented"})
    }
}