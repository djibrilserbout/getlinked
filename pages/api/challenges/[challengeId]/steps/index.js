import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../auth/[...nextauth]";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    // Liste les étapes d'un challenenge en particulier
    if (req.method === "GET") {
        const steps = await prisma.step.findMany({
            where: {
                challengeId: req.query.challengeId,
            },
        });
        if (steps)
            return res.status(200).json(steps);
        if (!steps)
            return res.status(404).json({message: "Not found"});
    }
    if (session) {
        // Ajoute une étape à un challenge
        if (req.method === "POST") {
            if (session?.role !== 'admin' && session?.role !== 'superadmin')
                return res.status(401).json({message: "Unauthorized"})
            try {
                const step = await prisma.step.create({
                    data: {
                        name: req.body.name ?? null,
                        description: req.body.description ?? null,
                        challengeId: req.query.challengeId ?? null
                    }
                })
                console.log(step)
                if (step)
                    return res.status(201).json({message: "Created Successfully!", step})
                else
                    return res.status(404).json({message: "Error"})

            } catch (e) {
                // Erreur dans la requête
                return res.status(404).json({message: e.message})
            }

        }
    }else {
        return res.status(404).json({message: "Error"})
    }
}