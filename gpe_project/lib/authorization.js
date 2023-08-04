import {getSession} from "next-auth/react";

export default async function authorization({req, query}) {
    const {userId} = query
    const session = await getSession({req});
    let isAdmin = false;
    let isMine = false;
    let isSuperAdmin = false;
    if (session?.role === 'superadmin') {
        isSuperAdmin = true;
    }
    if (session?.role === 'admin' || session?.role === 'superadmin') {
        isAdmin = true;
    }
    if (session?.user?.id === userId) {
        isMine = true;
    }
    return {
        isSuperAdmin: isSuperAdmin,
        isAdmin: isAdmin,
        isMine: isMine,
    }
}