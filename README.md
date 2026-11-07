# KAIROS MOTION LAB — V1

Studio vidéo **indépendant** en React / TypeScript / Remotion. Première composition : `HiddenClueTrailer`, 1080 × 1920, 30 fps, 285 frames, **9,5 secondes**. Le site `kairos-experience` n’est ni modifié ni utilisé au runtime.

## Démarrer

Prérequis : Node 22+ (testé sur Node 24), FFmpeg/ffprobe sur PATH et un Chrome/Chromium compatible. Le script utilise `/usr/bin/chromium` s’il existe ; sinon Remotion utilise sa gestion de navigateur. `CHROME_PATH` peut préciser un exécutable local.

```sh
npm ci
npm run studio
npm run typecheck
npm run render
npm run check
```

Le Studio ouvre la timeline Remotion, avec scrubbing et édition des props. Aucun service, token ou API externe n’est nécessaire. `npm run render` produit `out/HiddenClueTrailer-v1.mp4`, cinq PNG de contrôle et un manifeste. FFmpeg finalise le conteneur MP4 en faststart, sans seconde compression des images. Le master est H.264 / yuv420p pour lecture mobile. Les rendus et `node_modules` sont ignorés par `.gitignore`.

```sh
npm run stills
npm run render -- --variant v1
npm run render -- --variant v1 --props ./props.json --out ./out
```

`--props` accepte les champs du schema dans `src/experiments/hooks.ts`. `variant` doit être un identifiant simple, sans espace ni slash. V1 n’enregistre **qu’un hook**, `v1`. Pour les futurs A/B tests, ajouter une entrée à ce registre et conserver la même composition. Aucun autre film n’est construit.

## Intention / direction

Une enquête graphique semble rapprocher les pièces du téléphone, puis cache le détail au moment de la résolution. Palette graphite / ivoire / rouge contrôlé ; cover KAIROS conservée dans ses tons chauds. Fonte éditoriale forte, labels monospace, lignes fines, cadres, masques, fragments natifs et grain discret. Le mouvement révèle des relations : pas de montage de rushes, ni de faux chiffre de réussite ou d’urgence.

| Beat           | Fenêtre indicative | Fonction visuelle                                                                                                                             |
| -------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Hook           | 0–1,4 s            | « LE FILM AVAIT » puis le fragment « UN INDICE. », masqués typographiquement.                                                                 |
| Fragments      | 1,4–4,4 s          | Rupture du titre ; date, crop de cover, waveform, fichier verrouillé, message ; une ligne les relie et une redaction interrompt la lecture.   |
| Suspense       | 4,4–5,9 s          | Ralentissement ; cercle sur l’horloge ; « PERSONNE » puis « NE L’A REMARQUÉ. ».                                                               |
| Reconstruction | 5,9–7,7 s          | 29 et 10 changent de place et de niveau, slash mobile, fermeture du cadenas, waveform aplatie ; redaction puis obstruction avant la solution. |
| Question       | 7,7–9,5 s          | Cut sombre, « TU L’AS VU ? », puis uniquement `kairosarchives.com` comme CTA.                                                                 |

Les phrases principales proviennent des props, pas du JSX. Les onsets et durées de mouvement sont centralisés dans `src/audio/timeline.ts`. Les composants ne lisent pas une horloge réelle : tout découle du frame Remotion. Les variations de texture sont déterministes.

## Musique à fournir

Déposer **un seul** fichier réel :

```text
public/assets/audio/master-track.wav
```

Extensions reconnues : `.wav`, `.mp3`, `.m4a`, `.aac`, `.ogg`. Le renderer le détecte automatiquement. Ou préciser `audioSrc: "assets/audio/master-track.wav"` dans les props. `audioOffsetSeconds` choisit le départ dans la piste, `audioGain` le gain. Un fondu final est prévu ; aucun SFX artificiel n’est ajouté.

**En l’absence de master, la V1 est volontairement muette.** Les beats actuels sont des repères de mise en scène provisoires, pas une analyse musicale. La waveform est un élément graphique seeded, pas la représentation d’un audio absent. Après réception de la piste, analyser ses accents/silences puis adapter `beats`, `cues` et `durations` dans l’unique timeline. `@remotion/media-utils` pourra alors être ajouté pour une waveform réelle si nécessaire. Aucun package audio inutilisé n’est installé maintenant.

## Organisation

- `src/compositions/HiddenClueTrailer/` : orchestration, board d’indices et reconstruction.
- `src/components/` : textes masqués, carte, redaction, waveform, connecteur, image crop, grain, cadenas et CTA.
- `src/audio/timeline.ts` : beats, cues, durées et géométrie du master.
- `src/motion/` : courbes, interpolation, reveal et bruit déterministe.
- `src/experiments/hooks.ts` : schema Zod, props V1 et registre de variantes.
- `scripts/render-variants.ts` : bundle, PNGs, contrôle de déterminisme, rendu et finalisation FFmpeg.
- `scripts/check-output.ts` : contrôle technique du MP4 et des assets.

## Assets / validation

La cover et les deux icônes sont des copies locales exactes des assets existants du projet KAIROS ; leur provenance et SHA-256 figurent dans `public/assets/manifest.json`. Les fontes DejaVu sont locales et leur licence est jointe. Les autres interfaces et symboles sont dessinés en HTML/SVG, sans captures génériques ni faux médias externes. Les répertoires SFX/textures sont prêts mais ne déclenchent aucun chargement fantôme.

Le renderer compare deux PNG du même frame et échoue s’ils diffèrent. `npm run check` vérifie props, marqueurs, absence de Date.now/Math.random/CSS animations temporelles, empreintes des assets, dimensions, fps, nombre de frames, durée, codec et présence/absence d’audio cohérente avec le master fourni. Les cinq images de contrôle couvrent les beats principaux ; elles sont inspectées pour la lisibilité et les masques.

L’aperçu muet permet de juger la chorégraphie. Le rythme final et le mix ne peuvent être validés qu’avec la vraie piste. Aucun déploiement ou changement au site de production n’est effectué.
