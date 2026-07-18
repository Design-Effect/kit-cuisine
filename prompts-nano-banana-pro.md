# Kit Cuisine — Génération des 35 photos avec Nano Banana Pro

Ce document te donne tout ce qu'il te faut pour générer les 35 visuels de recettes de manière **cohérente** dans Google AI Studio (modèle Nano Banana Pro / Gemini Image).

---

## 1. Workflow recommandé dans Google AI Studio

1. Ouvre [aistudio.google.com](https://aistudio.google.com) → onglet **Image generation**
2. Sélectionne le modèle **Nano Banana Pro** (Gemini 3 Image)
3. Génère la **première image** (ex. Poulet rôti) en collant le prompt complet ci-dessous
4. Une fois la photo validée, **réinjecte-la comme image de référence** pour la photo suivante en demandant : *"Same photographic style, lighting, plate type and background as reference. Now generate: [prompt suivant]"*
5. Cette technique de **chaînage par référence** garantit que tes 35 photos auront le même look book — c'est la vraie force de Nano Banana Pro vs ses concurrents
6. Format de sortie : **1024×1024 ou 1536×1024** (4:3 conviendra pile au format des cartes)

---

## 2. Style Guide global (à coller en tête de chaque prompt)

```
STYLE: Editorial food photography, professional magazine quality, hero shot.
LIGHTING: Soft natural daylight from upper left, gentle shadows, warm tones.
ANGLE: 45-degree overhead angle, slight tilt, shallow depth of field.
BACKGROUND: Warm wooden cutting board OR cream linen tablecloth OR beige marble.
DISH: Simple cream ceramic plate or rustic clay tagine — never plastic, never overly modern.
ATMOSPHERE: Cozy home cooking, freshly served, slight steam visible if hot dish.
GARNISH: Always include 1-2 fresh herbs/ingredients scattered around the dish for life.
COLOR PALETTE: Warm earth tones — terracotta, cream, olive, soft amber.
NO TEXT, NO LOGO, NO PEOPLE, NO HANDS, NO UTENSILS UNLESS SPECIFIED.
PHOTOREALISTIC, ULTRA-DETAILED, 4K QUALITY.
```

Tu peux raccourcir ce bloc à `[STYLE: editorial food photo, soft daylight, 45° angle, cream ceramic plate, warm wooden background, no text, photorealistic 4K]` une fois que tu as une image de référence solide.

---

## 3. Convention de nommage

Une fois tes 35 photos générées, **nomme-les** comme ceci puis place-les dans un dossier `img/recipes/` à côté de ton HTML :

```
img/recipes/r1.jpg   → Poulet rôti aux herbes
img/recipes/r2.jpg   → Tajine poulet olives citron
img/recipes/r3.jpg   → Couscous 7 légumes
... etc jusqu'à r35
```

**Format conseillé** : JPG qualité 80%, dimensions 800×600 max (compresse avec [tinyjpg.com](https://tinyjpg.com) — chaque image doit faire <80 Ko pour rester rapide).

---

## 4. Insertion dans le code

Dans `kit-cuisine-v1.2.html`, chaque recette du tableau `RECIPES` doit recevoir un champ `img`. Exemple pour la recette r1 :

```js
{id:'r1', name:'Poulet rôti aux herbes', emoji:'🍗', img:'img/recipes/r1.jpg', time:50, ...}
```

Tant qu'une recette n'a pas de `img`, le placeholder SVG s'affiche automatiquement avec son emoji et son nom (avec la mention "PHOTO À VENIR"). Tu peux donc générer et brancher tes 35 photos progressivement, l'app reste fonctionnelle.

---

## 5. Les 35 prompts — copier/coller directement

### r1 — Poulet rôti aux herbes
> A whole roasted chicken, golden-brown crispy skin, served on a cream ceramic platter. Surrounded by roasted baby potatoes, lemon halves, fresh thyme sprigs, and roasted garlic cloves. Glistening with cooking juices. Warm wooden background, scattered fresh herbs. [STYLE block above]

### r2 — Tajine de poulet aux olives et citron
> A traditional Moroccan chicken tagine in an authentic conical clay pot, lid removed and placed beside it. Tender chicken pieces in a saffron-yellow sauce with green olives and preserved lemon slices on top. Fresh coriander leaves scattered. Rustic terracotta tones, dark wooden background. Steam rising. [STYLE block above]

### r3 — Couscous 7 légumes
> A generous bowl of fluffy semolina couscous topped with vibrant stewed vegetables: orange carrots, green zucchini, golden chickpeas, soft turnip pieces, and tender lamb chunks. Spoonfuls of golden broth being poured. Fresh coriander on top. Cream ceramic bowl, linen tablecloth, traditional North African vibe. [STYLE block above]

### r4 — Pâtes bolognaise
> A deep cream pasta plate with twirled spaghetti coated in rich red beef bolognese sauce. Topped with shaved Parmesan and a single fresh basil leaf. Visible meat texture in the sauce. Warm Italian kitchen ambiance, wooden board, scattered Parmesan crumbs. [STYLE block above]

### r5 — Shakshuka
> Cast iron skillet with bubbling tomato-pepper sauce, three perfectly poached eggs nestled in, runny yolks just visible, sprinkled with fresh parsley and a dusting of paprika. Crusty bread on the side. Rustic Middle Eastern atmosphere, wooden table. [STYLE block above]

### r6 — Soupe de lentilles corail
> A creamy orange-red lentil soup in a deep cream bowl, swirl of cream on top, fresh coriander leaves, lemon wedge on the side. Steam rising. Comforting winter atmosphere, wooden spoon beside. Linen napkin. [STYLE block above]

### r7 — Riz sauté au poulet
> A wide bowl of golden fried rice with diced chicken, scrambled eggs, julienned carrots, and corn kernels. Glossy from soy sauce, garnished with chopped spring onions. Wooden chopsticks beside. Asian street food vibe, dark wooden background. [STYLE block above]

### r8 — Curry de poulet
> Indian chicken curry with creamy orange sauce in a copper bowl. Tender chicken pieces visible, swirl of yogurt on top, fresh coriander, fluffy basmati rice served in its own cream ceramic bowl beside the curry (never directly on the board). Steam rising. Warm spice tones, dark moody background. [STYLE block above]

### r9 — Salade César au poulet
> Generous Caesar salad in a wide cream bowl: crisp romaine lettuce, golden grilled chicken slices, crunchy croutons, large Parmesan shavings, creamy dressing drizzle. Fresh black pepper on top. Bright fresh atmosphere, light wooden background. [STYLE block above]

### r10 — Omelette aux légumes
> Fluffy folded French omelette on a cream plate, slightly oozing with melted cheese, topped with sautéed colorful vegetables (red peppers, tomato, onion). Sprinkled with fresh parsley. Bright morning light, simple breakfast vibe. [STYLE block above]

### r11 — Ratatouille
> Provençal ratatouille in a rustic ceramic dish: layered slices of zucchini, eggplant, tomato, and bell pepper in vibrant red, purple, green, and orange. Glistening with olive oil, fresh basil leaves, sprig of thyme. Mediterranean atmosphere. [STYLE block above]

### r12 — Hachis parmentier
> Classic French shepherd's pie in a rectangular ceramic baking dish, golden-brown mashed potato topping with fork ridges and melted cheese, slightly bubbling. A spoon scoop reveals seasoned ground beef beneath. Comfort food atmosphere, wooden table. [STYLE block above]

### r13 — Boulettes sauce tomate
> Italian-style meatballs swimming in vibrant red tomato sauce, served in a shallow cream bowl. Topped with grated Parmesan and fresh basil leaves. Steam rising, glossy sauce. Rustic Italian kitchen background. [STYLE block above]

### r14 — Wrap au poulet
> A grilled chicken wrap cut diagonally, showing colorful layers inside: lettuce, tomato, avocado slices, grilled chicken strips, creamy sauce. Standing upright on a wooden board, second half lying beside. Bright fresh atmosphere. [STYLE block above]

### r15 — Saumon citron thym
> A perfectly cooked pink salmon fillet on a cream ceramic plate, golden crispy skin on top, lemon slices, fresh thyme sprigs, sautéed zucchini ribbons on the side. Drizzle of olive oil. Light healthy atmosphere, marble background. [STYLE block above]

### r16 — Houmous maison
> Creamy hummus in a shallow rustic bowl, swirled top with a well of golden olive oil, sprinkle of paprika and cumin, whole chickpeas as garnish, fresh parsley. Warm pita bread torn beside. Middle Eastern mezze atmosphere. [STYLE block above]

### r17 — Falafels
> Six golden-brown crispy falafel balls on a cream plate, slightly broken open showing green herbed interior. Yogurt-tahini sauce in a small bowl, lemon wedge, fresh parsley, pita bread. Mediterranean street food vibe. [STYLE block above]

### r18 — Dhal de lentilles
> Indian yellow lentil dhal in a copper bowl, creamy texture, tempered with caramelized onions on top, fresh coriander leaves, side of fluffy basmati rice. Steam rising, warm spice tones, dark moody background. [STYLE block above]

### r19 — Pizza maison express
> A homemade thin-crust pizza on a wooden board, melted mozzarella, fresh basil leaves, sautéed mushrooms and bell peppers, slightly charred edges. One slice slightly pulled away showing cheese stretch. Italian rustic atmosphere. [STYLE block above]

### r20 — Tabbouleh libanais
> A vibrant Lebanese tabbouleh salad in a cream bowl, dominantly green from masses of finely chopped parsley, with red tomato cubes, white onion, soft bulgur wheat. Lemon wedge, drizzle of olive oil. Fresh Mediterranean atmosphere, linen background. [STYLE block above]

### r21 — Bowl quinoa équilibré
> A healthy buddha bowl with quinoa base, arranged sections of: avocado slices, cherry tomatoes, sweet corn, grilled chicken strips, fresh herbs. Lemon wedge, olive oil drizzle. Bright clean wellness atmosphere, light wooden background. [STYLE block above]

### r22 — Tacos mexicains
> Three folded soft tortilla tacos on a wooden board, filled with seasoned ground beef, fresh lettuce, diced tomato, guacamole, melted cheese. Lime wedges, fresh coriander scattered. Mexican street food vibe, warm tones. [STYLE block above]

### r23 — Gratin de courgettes
> A golden-baked zucchini gratin in a rectangular ceramic dish, browned cheesy crust on top with thyme sprigs, slight bubbling. A spoon scoop reveals creamy zucchini layers underneath. Comfort food atmosphere, wooden background. [STYLE block above]

### r24 — Pad thaï au poulet
> Thai pad thai noodles in a wide cream bowl, glossy noodles tossed with chicken, scrambled egg, julienned carrots, bean sprouts. Lime wedge, scattered crushed peanuts, fresh coriander. Asian street food vibe, dark wooden background. [STYLE block above]

### r25 — Risotto aux champignons
> Creamy Italian mushroom risotto in a wide shallow cream bowl, golden creamy rice studded with sautéed mushrooms, large Parmesan shavings on top, fresh thyme sprigs, drizzle of truffle oil. Steam rising, sophisticated atmosphere. [STYLE block above]

### r26 — Chili con carne
> A deep cream bowl of chili con carne, rich red-brown stew with ground beef, chickpeas, bell peppers, tomatoes, topped with a dollop of yogurt and fresh coriander. Mexican spice atmosphere, side of rice visible. [STYLE block above]

### r27 — Cabillaud provençal
> A white cod fillet bathed in vibrant Provençal tomato sauce in a cream baking dish, topped with fresh basil leaves and a lemon slice. Steam rising. Mediterranean coastal atmosphere, marble background. [STYLE block above]

### r28 — Quinoa aux épinards
> A vibrant green dish of quinoa mixed with wilted spinach and golden chickpeas in a cream bowl, lemon wedge, drizzle of olive oil, sprinkle of cumin. Healthy Levantine atmosphere, light marble background. [STYLE block above]

### r29 — Tomates farcies
> Four large red tomatoes stuffed with seasoned ground beef and rice, topped with their cut-off "hats", baked golden in a rectangular ceramic dish. Fresh thyme sprigs, drizzle of olive oil. French family atmosphere, wooden background. [STYLE block above]

### r30 — Galette de lentilles
> Three golden-brown lentil patties stacked on a cream plate, side of cooling yogurt-cucumber sauce, lemon wedge, fresh coriander leaves. Healthy vegetarian atmosphere, linen background. [STYLE block above]

### r31 — Crevettes ail-persil
> Pink shrimp tossed with chopped garlic and parsley over twirled spaghetti on a cream plate, glistening with butter and olive oil, lemon wedge. Italian seafood vibe, warm tones, wooden background. [STYLE block above]

### r32 — Dinde aux légumes rôtis
> Roasted turkey breast slices on a cream platter surrounded by colorful roasted vegetables (carrots, potatoes, onions, garlic cloves), thyme sprigs, glistening with cooking juices. Family Sunday lunch atmosphere, warm wooden background. [STYLE block above]

### r33 — Brochettes de bœuf
> Two beef skewers with marinated cubes alternating with red and green peppers and red onion, slightly charred from grilling, on a cream plate. Lemon wedges, sprinkle of cumin and paprika, fresh parsley. Mediterranean grill vibe, dark wooden background. [STYLE block above]

### r34 — Soupe minestrone
> Italian minestrone soup in a deep cream bowl: vibrant tomato broth with pasta, vegetables, chickpeas, fresh basil leaves on top, generous Parmesan shavings. Crusty bread on the side. Italian comfort atmosphere, linen background. [STYLE block above]

### r35 — Omelette aux champignons
> A folded golden French omelette filled with sautéed mushrooms in butter and garlic, slight oozing with melted cheese, sprinkled with fresh parsley. Cream plate, simple morning vibe, light wooden background. [STYLE block above]

---

## 6. Conseils pratiques pour la session de génération

- **Compte ~30 secondes par image** sur AI Studio = environ **15-20 minutes** pour les 35
- **Re-génère 2-3 fois** chaque image et garde la meilleure version
- **Si une image te déçoit**, ajoute des mots-clés de réalisme : *"hyperrealistic, professional food magazine, Bon Appétit style, shot on Hasselblad, depth of field"*
- **Évite les mains** : Nano Banana a tendance à faire des doigts bizarres — précise toujours `no hands, no people` dans le prompt
- **Pour la cohérence couleur** : génère d'abord les 5 plus importantes (r1, r4, r5, r12, r19), garde la meilleure comme ta "référence master", puis utilise-la comme image d'entrée pour les 30 autres

---

## 7. Une fois fini

1. Crée le dossier `img/recipes/` à côté du fichier HTML
2. Place tes 35 fichiers nommés `r1.jpg` à `r35.jpg`
3. Ajoute dans le fichier HTML, dans chaque objet recette du tableau `RECIPES`, le champ `img:'img/recipes/r1.jpg'` (et ainsi de suite)
4. Recharge l'app — les vraies photos remplacent automatiquement les placeholders

Ou si tu préfères, hors PWA : héberge les images sur un CDN (Cloudinary gratuit jusqu'à 25 Go/mois) et utilise les URLs directes — plus léger côté HTML mais nécessite la connexion au premier load.

---

**Bonne génération.** Si tu veux que je t'aide à intégrer une fournée précise de photos une fois prêtes, partage-les et je te branche le code.
