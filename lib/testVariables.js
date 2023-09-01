export const ownUserSession = {
    user: {
        name: 'usertest',
        email: 'user.test@mail.com',
        image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
        id: 'testid'
    },
    expires: '2023-09-30T07:25:23.720Z',
    role: 'user'
}
export const adminSession = {
    user: {
        name: 'otheruser',
        email: 'otheruser.test@mail.com',
        image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
        id: 'otherid'
    },
    expires: '2023-09-30T07:25:23.720Z',
    role: 'admin'
}
export const superadminSession = {
    user: {
        name: 'otheruser',
        email: 'otheruser.test@mail.com',
        image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
        id: 'otherid'
    },
    expires: '2023-09-30T07:25:23.720Z',
    role: 'superadmin'
}
export const unauthorizedSession = {
    user: {
        name: 'otheruser',
        email: 'otheruser.test@mail.com',
        image: 'https://avatars.githubusercontent.com/u/54867968?v=4',
        id: 'otherid'
    },
    expires: '2023-09-30T07:25:23.720Z',
    role: 'user'
}

export const educationOne = {
    id: "educationid1",
    name: "Master degree",
    dateBegin: "2023-08-31T00:00:00.000Z",
    dateFinish: "2023-08-31T00:00:00.000Z",
    schoolName: "schoolone",
    description: "description",
    userId: "usertest"
}
export const educationTwo = {
    id: "educationid2",
    name: "PHD",
    dateBegin: "2023-08-11T00:00:00.000Z",
    dateFinish: "2023-08-31T00:00:00.000Z",
    schoolName: "schooltwo",
    description: "description",
    userId: "usertest"
}
export const updatedEducation = {
    id: "educationid1",
    name: "education",
    dateBegin: "2023-08-31T00:00:00.000Z",
    dateFinish: "2023-08-31T00:00:00.000Z",
    schoolName: "etna",
    description: "description",
    userId: "usertest"
}

export const experienceOne = {
    id: "experienceid1",
    name: "Frontend Developer",
    dateBegin: "2023-08-31T00:00:00.000Z",
    dateFinish: "2023-08-31T00:00:00.000Z",
    companyName: "companyone",
    description: "description",
    userId: "usertest"
}
export const experienceTwo = {
    id: "experienceid2",
    name: "Backend Developer",
    dateBegin: "2023-08-11T00:00:00.000Z",
    dateFinish: "2023-08-31T00:00:00.000Z",
    companyName: "companytwo",
    description: "description",
    userId: "usertest"
}
export const updatedExperience = {
    id: "experienceid1",
    name: "Frontend Developer",
    dateBegin: "2023-08-31T00:00:00.000Z",
    dateFinish: "2023-08-31T00:00:00.000Z",
    companyName: "NASA",
    description: "description",
    userId: "usertest"
}

export const challengeOne = {
    id: "challengeone",
    name: "Faire une calculatrice en JS"
}

export const challengeTwo = {
    id: "challengetwo",
    name: "Faire un site e-commerce de A à Z"
}

export const updatedChallenge = {
    id: "challengeone",
    name: "Faire une calculatrice en Python"
}

export const stepOne = {
    id: "stepone",
    challengeId: "challengeone",
    name: "Planifier à quoi va ressembler votre jeu",
    description: "Démarrer par ça puis fait ça ensuite ..."
}

export const stepTwo = {
    id: "steptwo",
    challengeId: "challengeone",
    name: "Créer un input en HTML",
    description: "Ajouter un input pour l'ecran de la calculatrice"
}

export const updatedStep = {
    id: "stepone",
    challengeId: "challengeone",
    name: "Planifier à quoi va ressembler votre application",
    description: "Démarrer par ça puis fait ça ensuite ..."
}

export const normalUser = {
    id: 'testid',
    name: 'usertest',
    email: 'user.test@mail.com',
    emailVerified: null,
    image: 'https://avatars.githubusercontent.com/u/112714807?v=4',
    description: null,
    role: 'user',
    jobTitle: null
}

export const adminUser = {
    id: 'admin',
    name: 'admin',
    email: 'admin@mail.com',
    emailVerified: null,
    image: 'https://avatars.githubusercontent.com/u/112714807?v=4',
    description: null,
    role: 'admin',
    jobTitle: null
}