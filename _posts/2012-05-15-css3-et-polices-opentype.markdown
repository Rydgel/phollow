---
date: '2012-05-15 00:00:32'
layout: post
slug: css3-et-polices-opentype
status: publish
title: CSS3 et polices OpenType
wordpress_id: '3979'
categories:
- typographie
- web
tags:
- police
- typographie
- web
---

Les polices au format OpenType ont pour avantage de prendre en charge un jeu de caractères étendus et offrent plus d’options au niveau de la présentation. Par exemple on peut gérer les _ligatures discrètes_, les _fractions_, les _petites capitales_… Les graphistes ont longtemps été seuls à pouvoir jouer avec ces fonctionnalités, mais savez-vous que vous pouvez faire la même chose avec un peu de CSS3 ?

### Exemple des ligatures

Prenons par exemple les ligatures. C’est une des choses que je voulais depuis longtemps et qui est maintenant possible sur une page web. Le but d’une ligature est de rendre le texte plus lisible et plus beau aussi, comme en évitant une transition grossière entre un _f_ et un _i_. Les ligatures fusionnent deux caractères et le résultat est vraiment considéré comme un seul.

<p class="fullsizestuff" style='font-size: 135px; text-rendering: optimizelegibility; -moz-font-feature-settings:"liga=1, dlig=1"; -ms-font-feature-settings:"liga", "dlig"; -o-font-feature-settings:"liga", "dlig"; -webkit-font-feature-settings:"liga", "dlig"; font-feature-settings:"liga", "dlig";'>
fleurs, fille, off.
</p>

Vous devriez voir trois ligatures ci-dessus si votre navigateur supporte ces réglages, sinon vous pouvez toujours allez voir sur cette [image](https://s3-eu-west-1.amazonaws.com/phollow/2012/05/ligatures.png "ligatures-phollow").

### font-feature-settings

Alors, comment en profiter à l’aide du CSS3 ? Il y a une nouvelle propriété utilisée pour ça qui s’appelle `font-feature-settings`. Voici le code utilisé pour l’exemple de ce billet.

	p {
		-moz-font-feature-settings:"liga=1, dlig=1"; 
    	-ms-font-feature-settings:"liga", "dlig"; 
    	-o-font-feature-settings:"liga", "dlig"; 
    	-webkit-font-feature-settings:"liga", "dlig"; 
    	font-feature-settings:"liga", "dlig";
    }

Vous avez sûrement remarqué les mots-clefs `liga` et `dlig`. Chacun possède une signification propre et active une spécificité OpenType, voici la liste complète :

* `liga` ligatures communes
* `dlig` ligatures discrètes
* `smcp` small-caps, petites capitales
* `lnum` lining-numeral, c’est ce que j’appelle les _chiffres minuscules_.
* `onum` old-style numeral, les chiffres en mode _old-school_, par exemple le _1_ ressemble un peu à un I.
* `swsh n` les swashs, _n_ étant le numéro de l’index voulu, certaines polices en ayant plusieurs. Ce sont des décorations pour certaines lettres, généralement sur des polices de type _script_
* `ss01–20` styleset (01—20)

Plus d’infos : [font-feature-settings sur MDN](https://developer.mozilla.org/en/CSS/-moz-font-feature-settings "font-feature-settings")

### Support navigateurs

Le support des navigateurs n’est pas encore parfait, néanmoins rien ne vous empêche de l’utiliser à présent. Rien ne changera pour les navigateurs ne supportant pas cette norme, ils verront le texte… comme d’habitude. Les navigateurs supportant cette règle CSS3 sont Chrome, Safari et Firefox sur Mac. Sur Windows, il y a seulement Chrome et Safari d’après mes tests rapides. J’ai pu voir que cela marchait aussi sur Chrome Linux, je n’ai pas testé les autres. Je parle bien-sûr des **dernières** versions en date de chaque navigateur.

### Où trouver des webfonts compatibles ?

C'est là que le bât blesse. Après quelques recherches je me suis rendu compte que le service que j’utilise, [Typekit](http://typekit.com "typekit") ne prend pas encore en compte cette fonctionnalité. _Du moins sur les polices que j’ai essayé._ Par contre FontDeck commence à répertorier ce genre de police sous le label [Opentype](http://fontdeck.com/typefaces/all/tags/opentype "FontDeck OpenType"). En allant sur le détail d‘une police, on peut voir les options OpenType gérées. Certaine comme [Magenta](http://fontdeck.com/typeface/magneta "Magenta") en possède pas mal !