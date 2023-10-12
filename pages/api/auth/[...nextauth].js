import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import {getToken} from "next-auth/jwt";


const prisma = new PrismaClient();
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_APP_ID,
            clientSecret: process.env.GITHUB_APP_SECRET,
            authorization: {
                params: {
                    scope: 'repo read:user user:email'
                }
            },
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            //console.log({user, account, profile, email, credentials});
            const newUser = await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
            })
            if(newUser && user.type !== "recruiter" && account.provider === "linkedin") {
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        type: 'recruiter',
                    }
                })
            }
            if(newUser && user?.type !== "developer" && account.provider === "github") {
                 await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        type: 'developer',
                    }
                })
            }
            if(newUser && user?.email === "djibril.serbout@gmail.com" && user.role !== "superadmin") {
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        role: 'superadmin',
                    }
                })
            }
            return true
        },
        async session({session, token, user}) {
            session.role = user.role;
            session.type = user.type;
            session.user.id = user.id;
            return session
        }
    }
};
async function revokeToken(token) {
    const response = await fetch('https://api.github.com/applications/Iv1.21ea27f362830cf4/token',
        {
            method: "DELETE",
            body: JSON.stringify({
                access_token: token
            })
        })
    console.log(response);
}
/*async function yourRefreshFunction(currentToken) {
    const response = await fetch('https://github.com/login/oauth/access_token',
        {
            method: "POST",
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                refresh_token: currentToken.refreshToken,
                grant_type: 'refresh_token',
            })
    })

    return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
    }
}*/
export default NextAuth(authOptions)