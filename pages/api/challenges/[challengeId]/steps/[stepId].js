import prisma from '../../../../../lib/prisma';
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../auth/[...nextauth]";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        // Affiche une étape en particulier
        if (req.method === "GET") {
            const step = await prisma.step.findUnique({
                where: {
                    id: req.query.stepId,
                },
            });
            if (step)
                return res.status(200).json(step);
            if (!step)
                return res.status(404).json({message: "Not found"});
        }
        // Supprime une étape en particulier
        if (req.method === "DELETE") {
            if (session?.role !== 'admin' && session?.role !== 'superadmin')
                return res.status(401).json({message: "Unauthorized"})
            try {
                const step = await prisma.step.delete({
                    where: {
                        id: req.query.stepId
                    }
                })
                if (step)
                    return res.status(200).json({message: "Successfully deleted!"});
            } catch (e) {
                return res.status(404).json({message: e.message})
            }
        }
        // Modifie une étape en particulier
        if (req.method === "PUT") {
            if (session?.role !== 'admin' && session?.role !== 'superadmin')
                return res.status(401).json({message: "Unauthorized"})
            const step = await prisma.step.update({
                where: {
                    id: req.query.stepId,
                },
                data: {
                    name: req.body.name,
                    description: req.body.description
                }
            });
            if (step)
                //Etape modifiée
                return res.status(200).json({message: "Successfully updated", step});
            else
                //Etape non trouvée
                return res.status(404).json({message: "Not found"});

        }
    }else {
        return res.status(404).json({message: "Error"})
    }

}