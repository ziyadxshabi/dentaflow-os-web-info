# DentaFlow OS · Site vitrine

Landing page de pré-lancement pour DentaFlow OS, système de gestion pour cabinets dentaires au Maroc (récupération de patients, planning intelligent, suivi du flux patients).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 3.4 + shadcn/ui
- framer-motion (animations au scroll)
- lenis (défilement fluide)

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # sortie dans dist/
```

## Déploiement

Le build est statique, n'importe quel hébergeur statique convient :

- **Vercel** : importer le repo, framework "Vite", build `npm run build`, sortie `dist`
- **Netlify** : build `npm run build`, publish `dist`
- **GitHub Pages** : builder puis publier le contenu de `dist` (le `base: './'` de vite.config.ts est déjà configuré pour)

## Personnalisation rapide

- Offre fondateur (places, texte) : `src/sections/CTASection.tsx`
- Email de contact : `src/sections/CTASection.tsx` et `src/sections/Footer.tsx`
- Couleurs d'accent : rechercher `#8fdcb0` (confirmé/récupéré) et `#f2cd88` (relance/offre)
