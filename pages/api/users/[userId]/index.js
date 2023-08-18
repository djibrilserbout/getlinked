import prisma from '../../../../lib/prisma';
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({req})
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
    if (req.method === "PUT") {
        if(session?.role !== 'admin' && session?.role !== 'superadmin' && session?.user.id !== req.query.userId)
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
            return res.status(200).json({message: "Successfully updated", user });
        else
            return res.status(404).json({message: "Not found"});

    }
    else {
        return res.status(501).json({message: "Not implemented"})
    }
}