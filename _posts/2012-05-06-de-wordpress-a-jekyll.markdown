---
date: '2012-05-06 23:00:00'
layout: post
slug: de-wordpress-a-jekyll
status: publish
title: De Wordpress à Jekyll
wordpress_id: '3978'
categories:
- web
- blog
tags:
- jekyll
---

<div>
<figure><figcaption><img style="margin-top: 0;" src="http://static.phollow.fr/2012/05/dr_jekyll_mr_hyde_low.jpg" title="jekyll" class="alignnone size-full"></figcaption>
</figure>
</div>

<p class="lettrine">Cela fait plusieurs mois que j’en avait envie, je l’ai finalement fait ce week-end : une migration <em>complète</em> de mon blog Wordpress vers Jekyll. Vous ne devriez pas voir énormément de différences… Non, la différence est surtout pour moi, l’écriture et la gestion du site.</p>

Je n’étais pas vraiment malheureux avec Wordpress, non. Seulement embêté par certaines _fonctionnalités_. Par exemple l’édition d’articles est juste infâme, je finissais souvent par utiliser l’éditeur HTML en fait. La performance de Wordpress est minable sans plugin externe (cache), car il fait les mêmes requêtes SQL à chaque pages vues. _On ne sait jamais, peut-être que l’article change toutes les 5 minutes ?_

Bref, je m’égare en trollant, parlons un peu de cette migration.


### Jekyll

[Jekyll](http://jekyllrb.com/) est un “générateur de sites statiques”, écrit en Ruby. Il y en a d’autres comme [Hyde](http://ringce.com/hyde) ou Blatter en Python. J’ai essayé Jekyll et Hyde, j’ai trouvé le premier plus flexible, notamment au niveau de la gestion des filtres Liquid customisé et des permalinks.

### Pourquoi avoir migré sur un système statique ?

Plusieurs raisons à cela mon bon monsieur.

#### Gain de mémoire et performances

Ce blog est hébergé sur un petit serveur virtuel. PHP et MySQL étant assez gourmand au niveau mémoire, me passer d’eux est non négligeable avec mes 512mb de RAM.

N’ayant pas énormément de visites, on ne peut pas dire que mes instances PHP travaillaient beaucoup. Mais on ne peut pas battre la performance de pages .html directement servies par Nginx.

#### Plus simple pour écrire

Sur Wordpress quand tu veux écrire un article, tu dois t’identifier dans l’interface d’administration, chercher le lien pour ajouter un article dans **le bordel ambiant**, cliquer dessus, et là tu peux commencer à t’amuser. Ah et tu dois être connecté aussi.

Avec Jekyll, mes articles sont de simples fichiers textes en Markdown ou HTML. Je peux écrire et tester le rendu de l’article localement sans avoir besoin d’être connecté aux internets.

#### Backup

Le site n’est qu’un ensemble de fichiers, donc **Git**.

### Utilisation

Généralement un site basique sous Jekyll ressemble à ça :

{% highlight sh %}
.
|-- _config.yml
|-- _includes
|-- _layouts
|   |-- default.html
|   `-- post.html
|-- _posts
|   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   `-- 2009-04-26-barcamp-boston-4-roundup.textile
|-- _site
`-- index.html

{% endhighlight %}

#### _config.yml

Diverses variables utilisées pour la configuration, comme les permalinks, le moteur de rendu Markdown et d’autres choses.

#### _includes

Généralement des _partials_ que vous pouvez utiliser dans vos templates. Si vous avez plusieurs bouts de HTML qui se répète un peu partout dans vos pages, c’est bon de les factoriser ici.

#### _layouts

Les templates de vos pages web.

#### _posts

Vos articles écrits en .html, .markdown ou .textile. Jekyll se basera sur l’extension lors de la compilation.

#### _site

Après compilation, toutes les pages iront dans ce dossier. C’est sur ce dossier que vous devez faire pointer votre serveur web.

#### Lancer Jekyll en local

<pre><code>jekyll --server</code></pre>

### Migrations

J’avais vraiment envie de garder l’existant, et donc il a fallut trouver des astuces pour la migration. Rentrons dans le vif du sujet.

#### Bouger le contenu

Pour rapatrier les articles, j’ai utilisé un utilitaire appelé [exitwp](https://github.com/thomasf/exitwp). Je n’ai pas converti les anciens articles en Markdown pour garder au maximum le rendu qu’avaient les anciens articles (oui parce que Wordpress te rajoute plein de merdes en HTML, qui aurait été viré avec la conversion). Heureusement rien ne m’empêche d’écrire les nouveaux billets autrement.

Wordpress met généralement tout ce que tu uploads dans un dossier. J’ai voulu les mettre sur Amazon pour gagner de l’espace disque. J’ai utilisé cette commande :

<pre><code>s3cmd put --acl-public --recursive --guess-mime-type * s3://phollow</code></pre>

#### Note sur les commentaires

Avec un site statique tu ne peux plus utiliser un système de commentaires _server-side_. Du coup on peut se rabattre sur un système comme Disqus ou Livefyre. __Important__ : pour importer les anciens commentaires, il suffit d’installer un de ces systèmes sur Wordpress __avant__ la migration.

### Code source

Je mets à disposition le code source de la nouvelle version du site sur Github à cette [adresse](https://github.com/Rydgel/phollow). Il y a quelques trucs sympas, dont un Rakefile qui permet le déploiement des articles au travers de rsync.

<pre><code>rake deploy</code></pre>