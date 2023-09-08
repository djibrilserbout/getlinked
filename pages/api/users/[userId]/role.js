import prisma from '../../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})
    if (req.method === "PUT") {
        if (session?.role === 'superadmin' && req.query.userId !== session?.user.id) {
            //Donner un role admin
            if (req.body.action === 'grant') {
                const user = await prisma.user.update({
                    where: {
                        id: req.query.userId,
                    },
                    data: {
                        role: 'admin',
                    }
                });
                if (user)
                    return res.status(200).json({message: "Successfully updated", user});
                else
                    return res.status(404).json({message: "Not found"});
            }
            //Enlever un role admin
            if (req.body.action === 'revoke') {
                const user = await prisma.user.update({
                    where: {
                        id: req.query.userId,
                    },
                    data: {
                        role: 'user',
                    }
                });
                if (user)
                    //mise à jour du role de l'utilisateur
                    return res.status(200).json({message: "Successfully updated", user});
                else
                    //Problème avec le requete
                    return res.status(404).json({message: "Not found"});
            }
        } else {
            //Utilisateur non autorisé
            return res.status(401).json({message: "Unauthorized"})
        }

    } else {
        //Si la methode n'est pas implémenté
        return res.status(501).json({message: "Not implemented"})
    }
}