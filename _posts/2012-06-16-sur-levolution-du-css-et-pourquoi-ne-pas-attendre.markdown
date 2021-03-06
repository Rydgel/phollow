---
date: '2012-06-17 00:36:00'
layout: post
slug: sur-levolution-du-css-et-pourquoi-ne-pas-attendre
status: publish
title: Sur l’évolution du CSS et pourquoi ne pas attendre
desc: Haters gonna hate ma pwetty CSS.
pk: j.mp/MxGEwy
wordpress_id: '3981'
categories:
- frontend
- web
tags:
- css3
- sass
- less
- stylus
---

Les variables CSS sont apparues il y a quelques jours dans le dépôt [Webkit](http://trac.webkit.org/changeset/120154) et devraient être utilisables dans les dernières _nightlies_ de Safari. La norme CSS continue de se doter de fonctionnalités permettant d’avoir un code plus facilement maintenable. 

### Don’t repeat yourself they said

À l’heure actuelle, sans variables, la duplication de code est inévitable sur des projets de taille moyenne ou plus. Imaginons une palette de 5 couleurs sur un site, si on vous demande d’en changer une sur les 5, vous devez faire un rechercher/remplacer sur les fichiers .css. Alors qu’avec les variables vous n’avez qu’une ligne à éditer.

### Syntaxe de la spécification

    -webkit-var-foreground: red;
    -webkit-var-background: rgb(255, 255, 255);
    -webkit-var-fontsize: 1.5em;

    color: -webkit-var(foreground);
    background-color: -webkit-var(background);
    font-size: -webkit-var(fontsize);

La syntaxe est encore trop verbeuse à mon goût—et les préfixes webkit n’aidant pas non plus—on est loin de ce que propose un pré-processeur type __Sass__ :

    $foreground: red;
    $background: rgb(255,255,255);
    $fontsize: 1.5em;

    color: $foreground;
    background-color: $background;
    font-size: $fontsize;


### D’autres améliorations sur les sélecteurs

Les sélecteurs CSS v4 sont en cours de [draft](http://www.w3.org/TR/selectors4/) et devraient permettre eux aussi des choses assez sympathiques. Notamment pouvoir [styler le parent](http://www.w3.org/TR/selectors4/#subject) d’un sélecteur bien précis.

### Ne pas attendre

Le problème c’est qu’il va falloir attendre plusieurs années afin de pouvoir utiliser les spécifications natives sur nos navigateurs courants. Personnellement j’en ai un peu marre de coder du CSS _comme dans les années 2000_, et si je peux profiter d’ores et déjà d’une aide non négligeable, alors pourquoi pas ?

Je parle bien-sûr des pré-processeurs du type [Sass](http://sass-lang.com), [Less](http://lesscss.org) ou [Stylus](http://learnboost.github.com/stylus/) parmi d’autres. Je ne vais pas faire un billet sur leur fonctionnement, j’en ai déjà fait un [ici](http://phollow.fr/2012/03/sass-css-on-fire-that-sucks-less), mais plutôt vous faire part de ce que j’en pense, après avoir utilisé Sass & Compass sur un [projet perso](http://fakeimg.pl).

### With great power comes great responsibility

Le reproche que l’on fait souvent à ce type d’outils est la qualité du code produit. Les pré-processeurs ne sont seulement __que__ des outils et ne produisent que ce qu’on leur demande de produire. Si vous lui demandez effectivement de produire de la merde, c’est ce qu’il fera. Il y a deux choses importantes à retenir :

* Je ne conseille pas ces outils à des débutants ou à de mauvais intégrateurs. Ou aux psycho-rigides.
* Il faut avoir une idée de ce que telle fonction est susceptible de produire, pour ça il suffit de lire la documentation. **RTFM**.

Si vous êtes plutôt mauvais côté intégration, ces outils ne vous aideront pas, au contraire. Par contre je pense que ça peut rendre quelqu’un beaucoup plus efficace, s’il l’est déjà.

### Fausses idées et ignorance

* _“ J’ai pas envie de rajouter du JS pour interpréter LESS sur mes pages et les alourdir. Hurr durr derp. ”_ ← Aucun script .js n’est nécessaire en prod, tu compiles un .css et tu utilises le .css, point barre. Le .js est utile (dans le cas de Less) lors du développement pour ne pas avoir à compiler à la main à chaque changements. Et uniquement en développement.
* _“ J’ai parfois envie de modifier le code .css en live en production ”_ ← Sérieusement ?
* _“ En équipe les autres doivent être aussi formés ”_ ← Je suis d’accord. Il n’y a pas grand chose à apprendre non plus, il suffit de jouer une petite après-midi avec.

Il faut savoir que la plupart de ces fausses idées proviennent de personnes qui n’ont jamais testé l’outil. Un [billet](http://blog.kaelig.fr/post/24877648508/preprocesseurs-css-renoncer-par-choix-ou-par) intéressant sur ça justement.

### Retour sur mon utilisation

J’ai décidé d’intégrer [Fake Images Please?](http://fakeimg.pl) en utilisant justement Sass+Compass pour me faire une opinion dessus.

* J’ai changé plusieurs fois de palettes de couleurs, de largeur de colonnes pour la grille, de familles de polices… Les variables sont vraiment un gain de temps.
* Échelle typographique avec Compass super simple. On définit une taille de base en pixel, avec le line-height associé. Tout est recalculé en ems (taille relative des headings, margin, padding, etc.). Ça c’est ce que je faisais à la main en CSS.
* Utilisation d’une grille CSS simplifiée aussi. Dans le sens où au lieu de prendre un framework CSS existant où le nombre et la largeur des colonnes sont souvent pré-définies, ici j’ai utilisé [Susy](http://susy.oddbird.net/tutorial/). Tu définis le nombre de colonnes, la taille et cette grid s’adapte à ton DOM (et pas l’inverse qui t’oblige à utiliser leurs classes).
* Compilation automatique à chaque changement dans le fichier, donc pas de perte de temps à ce niveau là. Mon fichier .html lui link uniquement le fichier .css compilé final.

### TL;DR

Je dirais juste à essayer (essayer concrètement) avant de dire que l’on aime pas. Ces fonctionnalités arriveront tôt ou tard dans la norme CSS. Et il y a beaucoup de temps à gagner si on sait utiliser les pré-processeurs.