# Documentation API



## Utilisateurs

### `/api/users/`
#### [GET] Donne la liste des utilisateurs s'étant inscrit à GetLinked grâce à GitHub
- **Paramètres Path** : Aucun
- **Paramètres Query** : Aucun
- **Retour - Code HTTP : 200** :
    - Un tableau d'`User`
- **Erreur** : Pas de gestion

### `/api/users/[userId]`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur 
#### [GET] Donne un utilisateur
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `User`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie les informations d'un utilisateur
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Query** :
    - `jobTitle` | Intitulé du travail voulu
    - `description` | Description de l'utilisateur
- **Retour / Code HTTP = 200** :
    - message : "Successfully updated"
    - Le `User` mis à jour
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
 
#### Autre
- **Erreur** :
    - **Méthode non implémenté - Code HTTP 501** :
        - message: "Not implemented"

## Formations

### `/api/users/[userId]/educations`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
#### [GET] Liste les différentes formations d'un utilisateur
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Education`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute une formation associé à un utilisateur
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Nom de la formation
    - `dateBegin` | Date de début de la formation
    - `dateFinish` | Date de fin de la formation
    - `schoolName` | Nom de l'organisme formateur
    - `description` | Description de la formation
- **Retour - Code HTTP = 201** :
    - Un `Education`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
### `/api/users/[userId]/educations/[educationId]`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
    - `educationId` | L'ID de la formation
#### [GET] Donne une formation
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Education`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie une formation
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Nom de la formation
    - `dateBegin` | Date de début de la formation
    - `dateFinish` | Date de fin de la formation
    - `schoolName` | Nom de l'organisme formateur
    - `description` | Description de la formation
- **Retour - Code HTTP = 200** :
    - `Education`
    - message : "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime une formation
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : Aucun
- **Retour - Code HTTP = 200** :
    - `Education`
    - message : "Successfully deleted!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
## Expériences professionelles

### `/api/users/[userId]/experiences`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
#### [GET] Liste les différentes expériences professionelles d'un utilisateur
- **Session** : Aucun
- **Retour - Code HTTP = 200** :
    - Un tableau d `Expererience`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute une expérience professionelle à un utilisateur
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Intitulé du poste pour l'expérience professionelle
    - `dateBegin` | Date de début de l'experience professionelle
    - `dateFinish` | Date de fin de l'experience professionelle
    - `companyName` | Nom de l'entreprise
    - `description` | Description de l'expérience professionelle
    
- **Retour - Code HTTP = 201** :
    - Un `Education` créé
    - message: "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

### `/api/users/[userId]/experiences/[experienceId]`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
    - `experienceId` | L'ID de l'experience professionelle
#### [GET] Donne une expérience professionelle
- **Paramètres Body** : Aucun
- **Retour - Code HTTP = 200** :
    - `Experience`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie une expérience professionelle
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Intitulé du poste pour l'expérience professionelle
    - `dateBegin` | Date de début de l'experience professionelle
    - `dateFinish` | Date de fin de l'experience professionelle
    - `companyName` | Nom de l'entreprise
    - `description` | Description de l'expérience professionelle

- **Retour - Code HTTP = 200** :
    - `Experience`
    - message: "Successfully updated"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime une expérience professionnelle
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Retour - Code HTTP = 200** :
    - `Experience`
    - message: "Successfully deleted!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

## Challenges

### `/api/challenges`
- **Paramètres Path** : Aucun
#### [GET] Liste les différents challenges disponible
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - `Challenge`[]
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Paramètres Body** : 
    - `name` | Nom du challenge
- **Retour - Code HTTP = 201** :
    - `Challenge`
    - message: "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"


### `/api/challenges/[challengeId]`
- **Paramètres Path** : 
    - `challengeId` | L'ID du challenge
#### [GET] Donne un challenge
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Challenge`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Paramètres Body** : 
    - `name` | Nom du challenge
- **Retour - Code HTTP = 200** :
    - Le `Challenge` modifié
    - message: "Successfully updated"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 200** :
    - Le `Challenge` supprimé
    - message: "Successfully deleted"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

## Etapes

### `/api/challenges/[challengeId]/steps`
- **Paramètres Path** : 
    - `challengeId` | L'ID du challenge
#### [GET] Liste les différentes étapes disponible sur un challenge
- **Session** : Aucun
- **Retour - Code HTTP = 200** :
    - Un tableau de `Step`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute une étape à un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 201** :
    - Un `Step`
    - message: "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

### `/api/challenges/[challengeId]/steps/[stepId]`
- **Paramètres Path** : 
    - `challengeId` | L'ID du challenge
    - `stepId` | L'ID de l'étape
#### [GET] Donne une étape d'un challenge
- **Session** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Step`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie une étape
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 200** :
    - `Step`
    - message: "Successfully updated"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime une étape
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 200** :
    - `Step`
    - message: "Successfully deleted!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
    - **Non trouvé - Code HTTP = 401** :
        - message : "Unauthorized"

## Données

### `User`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de l'utilisateur |
| name | String? | Le nom GitHub de l'utilisateur |
| email | String? | l'e-mail GitHub de l'utilisateur |
| emailVerified | DateTime? | Date de vérification de l'e-mail |
| image | String? | URL de l'image de profil GitHub |
| description | String? | Description du profil |
| jobTitle | String? | Intitulé du travail voulu |

### `Education`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de la formation|
| name | String | Nom du diplôme |
| dateBegin | DateTime? | Date de début de la formation |
| dateFinish | DateTime? | Date de fin de la formation |
| schoolName | String? | Nom de l'organisme formateur |
| description | String? | Description de la formation |
| userId | Clé vers User - String | ID de l'utilisateur associé à cette formation |

### `Experience`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de l'expérience |
| name | String | Titre de l'expérience |
| dateBegin | DateTime? | Date de début de l'expérience |
| dateFinish | DateTime? | Date de fin de l'expérience |
| companyName | String? | Nom de l'entreprise, où l'expérience s'est acquise |
| description | String? | Description de l'experience |
| userId | Clé vers User - String | ID de l'utilisateur associé à cette expérience |

### `Challenge`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID du challenge |
| name | String | Nom du challenge |
| description | String? | Description du challenge |

### `Etape`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de l'étape |
| name | String | Nom de l'étape |
| description | String? | Description de l'étape |
| challengeId | Clé vers User - String | ID du challenge associé à cette étape |
# Documentation API



## Utilisateurs

### `/api/users/`
#### [GET] Donne la liste des utilisateurs s'étant inscrit à GetLinked grâce à GitHub
- **Paramètres Path** : Aucun
- **Paramètres Query** : Aucun
- **Retour - Code HTTP : 200** :
    - Un tableau d'`User`
- **Erreur** : Pas de gestion

### `/api/users/[userId]`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur 
#### [GET] Donne un utilisateur
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `User`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie les informations d'un utilisateur
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Query** :
    - `jobTitle` | Intitulé du travail voulu
    - `description` | Description de l'utilisateur
- **Retour / Code HTTP = 200** :
    - message : "Successfully updated"
    - Le `User` mis à jour
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
 
#### Autre
- **Erreur** :
    - **Méthode non implémenté - Code HTTP 501** :
        - message: "Not implemented"

## Formations

### `/api/users/[userId]/educations`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
#### [GET] Liste les différentes formations d'un utilisateur
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Education`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute une formation associé à un utilisateur
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Nom de la formation
    - `dateBegin` | Date de début de la formation
    - `dateFinish` | Date de fin de la formation
    - `schoolName` | Nom de l'organisme formateur
    - `description` | Description de la formation
- **Retour - Code HTTP = 201** :
    - Un `Education`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
### `/api/users/[userId]/educations/[educationId]`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
    - `educationId` | L'ID de la formation
#### [GET] Donne une formation
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Education`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie une formation
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Nom de la formation
    - `dateBegin` | Date de début de la formation
    - `dateFinish` | Date de fin de la formation
    - `schoolName` | Nom de l'organisme formateur
    - `description` | Description de la formation
- **Retour - Code HTTP = 200** :
    - `Education`
    - message : "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime une formation
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : Aucun
- **Retour - Code HTTP = 200** :
    - `Education`
    - message : "Successfully deleted!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
## Expériences professionelles

### `/api/users/[userId]/experiences`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
#### [GET] Liste les différentes expériences professionelles d'un utilisateur
- **Session** : Aucun
- **Retour - Code HTTP = 200** :
    - Un tableau d `Expererience`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute une expérience professionelle à un utilisateur
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Intitulé du poste pour l'expérience professionelle
    - `dateBegin` | Date de début de l'experience professionelle
    - `dateFinish` | Date de fin de l'experience professionelle
    - `companyName` | Nom de l'entreprise
    - `description` | Description de l'expérience professionelle
    
- **Retour - Code HTTP = 201** :
    - Un `Education` créé
    - message: "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

### `/api/users/[userId]/experiences/[experienceId]`
- **Paramètres Path** : 
    - `userId` | L'ID de l'utilisateur
    - `experienceId` | L'ID de l'experience professionelle
#### [GET] Donne une expérience professionelle
- **Paramètres Body** : Aucun
- **Retour - Code HTTP = 200** :
    - `Experience`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie une expérience professionelle
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Paramètres Body** : 
    - `name` | Intitulé du poste pour l'expérience professionelle
    - `dateBegin` | Date de début de l'experience professionelle
    - `dateFinish` | Date de fin de l'experience professionelle
    - `companyName` | Nom de l'entreprise
    - `description` | Description de l'expérience professionelle

- **Retour - Code HTTP = 200** :
    - `Experience`
    - message: "Successfully updated"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime une expérience professionnelle
- **Session** : session.role = "admin" || session.role = "superadmin" || session.user.id = userId 
- **Retour - Code HTTP = 200** :
    - `Experience`
    - message: "Successfully deleted!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

## Challenges

### `/api/challenges`
- **Paramètres Path** : Aucun
#### [GET] Liste les différents challenges disponible
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - `Challenge`[]
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Paramètres Body** : 
    - `name` | Nom du challenge
- **Retour - Code HTTP = 201** :
    - `Challenge`
    - message: "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"


### `/api/challenges/[challengeId]`
- **Paramètres Path** : 
    - `challengeId` | L'ID du challenge
#### [GET] Donne un challenge
- **Paramètres Query** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Challenge`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Paramètres Body** : 
    - `name` | Nom du challenge
- **Retour - Code HTTP = 200** :
    - Le `Challenge` modifié
    - message: "Successfully updated"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 200** :
    - Le `Challenge` supprimé
    - message: "Successfully deleted"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

## Etapes

### `/api/challenges/[challengeId]/steps`
- **Paramètres Path** : 
    - `challengeId` | L'ID du challenge
#### [GET] Liste les différentes étapes disponible sur un challenge
- **Session** : Aucun
- **Retour - Code HTTP = 200** :
    - Un tableau de `Step`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [POST] Ajoute une étape à un challenge
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 201** :
    - Un `Step`
    - message: "Created Successfully!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"

### `/api/challenges/[challengeId]/steps/[stepId]`
- **Paramètres Path** : 
    - `challengeId` | L'ID du challenge
    - `stepId` | L'ID de l'étape
#### [GET] Donne une étape d'un challenge
- **Session** : Aucun
- **Retour - Code HTTP = 200** :
    - Un `Step`
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [PUT] Modifie une étape
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 200** :
    - `Step`
    - message: "Successfully updated"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
#### [DELETE] Supprime une étape
- **Session** : session.role = "admin" || session.role = "superadmin"
- **Retour - Code HTTP = 200** :
    - `Step`
    - message: "Successfully deleted!"
- **Erreur** :
    - **Non trouvé - Code HTTP = 404** :
        - message : "Not Found"
    - **Non trouvé - Code HTTP = 401** :
        - message : "Unauthorized"

## Données

### `User`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de l'utilisateur |
| name | String? | Le nom GitHub de l'utilisateur |
| email | String? | l'e-mail GitHub de l'utilisateur |
| emailVerified | DateTime? | Date de vérification de l'e-mail |
| image | String? | URL de l'image de profil GitHub |
| description | String? | Description du profil |
| jobTitle | String? | Intitulé du travail voulu |

### `Education`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de la formation|
| name | String | Nom du diplôme |
| dateBegin | DateTime? | Date de début de la formation |
| dateFinish | DateTime? | Date de fin de la formation |
| schoolName | String? | Nom de l'organisme formateur |
| description | String? | Description de la formation |
| userId | Clé vers User - String | ID de l'utilisateur associé à cette formation |

### `Experience`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de l'expérience |
| name | String | Titre de l'expérience |
| dateBegin | DateTime? | Date de début de l'expérience |
| dateFinish | DateTime? | Date de fin de l'expérience |
| companyName | String? | Nom de l'entreprise, où l'expérience s'est acquise |
| description | String? | Description de l'experience |
| userId | Clé vers User - String | ID de l'utilisateur associé à cette expérience |

### `Challenge`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID du challenge |
| name | String | Nom du challenge |
| description | String? | Description du challenge |

### `Etape`
| Nom | Type | Description
| ------ | ------ | ------ |
| id | String | l'ID de l'étape |
| name | String | Nom de l'étape |
| description | String? | Description de l'étape |
| challengeId | Clé vers User - String | ID du challenge associé à cette étape |

