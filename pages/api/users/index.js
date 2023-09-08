import prisma from '../../../lib/prisma';



export default async function handler(req, res) {
    //Liste tous les profils disponibles.
    const users = await prisma.user.findMany();
    res.status(200).json(users);
}