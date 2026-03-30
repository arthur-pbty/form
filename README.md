# FormCraft

FormCraft est une application de creation de formulaires en ligne.

Site en production : [https://form.arthurp.fr](https://form.arthurp.fr)

## A propos

FormCraft permet de :

- creer un formulaire public en quelques secondes
- partager un lien public
- consulter les reponses collectees
- supprimer un formulaire via une cle secrete

Pour decouvrir l'application, visiter [form.arthurp.fr](https://form.arthurp.fr).

## Stack technique

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma
- SQLite (developpement local)

## Lancer en local

Prerequis :

- Node.js 18+
- npm

Installation et lancement :

```bash
npm install
npm run dev
```

Application disponible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Le projet utilise une variable Prisma :

```env
DATABASE_URL="file:./dev.db"
```

Le fichier `.env` est ignore par Git.

## Deploiement

Build de production :

```bash
npm run build
npm run start
```

Avant publication GitHub :

- verifier que `.env`, `.vscode/`, `node_modules/`, `.next/` et les bases SQLite locales ne sont pas suivis
- verifier qu'aucune cle API ou secret n'est commite

## Liens utiles

- Application : [https://form.arthurp.fr](https://form.arthurp.fr)
- Page d'accueil FormCraft : [https://form.arthurp.fr](https://form.arthurp.fr)
- Next.js : [https://nextjs.org](https://nextjs.org)
