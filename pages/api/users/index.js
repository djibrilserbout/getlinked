import prisma from '../../../lib/prisma';
import {getSession, useSession} from "next-auth/react";



export default async function handler(req, res) {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
}