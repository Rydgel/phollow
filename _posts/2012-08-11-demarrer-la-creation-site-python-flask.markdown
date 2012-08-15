---
date: '2012-08-15 01:00:00'
layout: post
slug: demarrer-la-creation-site-python-flask
status: publish
title: Démarrer la création d’un site avec Python & Flask
desc: Préparer le projet de la bonne façon.
pk: j.mp/NAd5uQ
wordpress_id: '3982'
categories:
- python
- web
tags:
- python
- flask
- web
- backend
---

<p class="fullsizestuff" style="margin-bottom: 60px;">
<img src="http://static.phollow.fr/2012/08/flask.png" alt="Flask">
</p>

J’avais envie depuis quelques jours de faire une série d’articles sur **Python** et le développement d’applications web. D’une part pour montrer que ce n’est pas plus compliqué qu’un projet PHP et d’un autre côté pour montrer qu’on perd moins de temps pour faire quelque chose de propre (pas besoin de palier aux [bizarreries](http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/) du langage).

Si vous n’avez jamais rien testé d’autre que PHP comme _langage de programmation_ (back-end), faites-vous une faveur et sortez de votre zone de comfort. Il n’en sortira que du bon, c’est promis. 

On va débuter, dans cet article, par mettre en place son projet de la meilleure façon qui soit. Et d’autres articles viendront par la suite pour montrer certains aspects du web-dev (base de données, sessions, templates, tests unitaires, <abbr>AJAX</abbr>, cache et optimisations, déploiement…). Le tout surement sur le thème d’une petite application. _Je n’ai pas encore trouvé le sujet._

![Python](http://imgs.xkcd.com/comics/python.png "Python")

### Python

Python existe en ce moment sous 2 versions majeures : 2.X et 3.X. Je vous conseille de dévélopper avec la branche 2.X sauf si vous avez une bonne raison de faire le contraire. La version 3 est en plein développement et beaucoup de bibliothèques Python n’ont pas fait encore le grand saut. La dernière version à l’heure où j’écris ces lignes est la **2.7.3**

### Installer Python

Python est pré-installé sur Ubuntu, et OS X. Même si ces versions sont suffisantes pour faire tourner les examples de codes que je vais donner, il est préférable d’utiliser une version à jour pour un développement plus sérieux.

* [Installation sous OS X](http://docs.python-guide.org/en/latest/starting/install/osx/)
* [Installation sous GNU/Linux, *BSD](http://docs.python-guide.org/en/latest/starting/install/linux/)
* [Installation sous Windows](http://docs.python-guide.org/en/latest/starting/install/win/)

### Virtualenv

Python possède une quantité incroyable d’extensions/bibliothèques que vous pouvez installer et utiliser dans vos projets. Mais quand on travaille sur plusieurs projets à la fois (et pas forcément que sur du web), on peut arriver à des problèmes de dépendances. _Mon projet A nécessite truc en version 1, mon projet B truc en version 2…_

Une bonne pratique consiste à créer un environnement virtuel pour nos packages, avec un outil comme [virtualenv](http://pypi.python.org/pypi/virtualenv), de cette manière cet environnement sera complétement indépendant du reste du système.

{% highlight bash %}
easy_install virtualenv
virtualenv mon_projet
cd mon_projet
source bin/activate # pour l'activer
{% endhighlight %}

Le répertoire **mon_projet** sera crée avec tout le nécessaire. Si votre prompt change légèrement, c’est que la manipulation a fonctionné. Virtualenv est très puissant, vous pouvez même lui passer la version de Python en paramètre.

    virtualenv -p /usr/local/bin/python3.3 mon_projet
    virtualenv -p /usr/local/bin/pypy mon_projet

C’est équivalent à ce que l‘on peut trouver chez Ruby avec Bundler. Pour désactiver un virtualenv il suffit de lancer la commande `deactivate` dans le terminal.

### Flask

Flask est un micro-framework et je pense qu’il est du coup beaucoup plus approprié dans l’apprentissage du langage Python. Contrairement à Django qui fait beaucoup de choses tout seul (ORM, validations formulaires, back-end admin…), Flask reste simple et c’est à vous de lui coder/rajouter ces composants à la main (BYOB). On en sort avec un framework flexible où je ne ressens, _personnellement_, pas de contrainte à travailler avec.

Parmis les avantages de Flask, on retrouve :

* Base code minimale, environ 800 lignes.
* Très bien testé, environ 1 500 lignes.
* Très bonne documentation (plus de 200 pages).
* Possède un système de template (Jinja2).
* Pousse à coder son application sous forme de services, ce qui est une bonne chose.

Installons Flask avec **pip** :

    pip install Flask

Une fois installé, on va écrire notre premier script. Pour cela on va créer un dossier `mon_projet/app` et à la racine de ce dossier un fichier `mon_projet/app/app.py`, comme par exemple :

{% highlight python %}
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
{% endhighlight %}

Pour tester ce code, il suffit juste de lancer la commande suivante. Et d’ouvrir le navigateur sur l’URL qui sera affichée dans la console.

{% highlight bash %}
$ python app.py
 * Running on http://127.0.0.1:5000/
{% endhighlight %}

### GIT

Et pour faire les choses bien, on va se créer un dépôt GIT et _commiter_ tout ça. Mais avant on rajoute le `.gitgnore` qui va bien.

    venv
    *.pyc
    .env
    .DS_Store

On crée le dépôt, on rajoute les fichiers et on commit avec un message _explicite_. On peut même rajouter des supers emojis sur [Github](http://www.emoji-cheat-sheet.com/). 

    git init
    git add .
    git commit -m ":sparkle: First commit :sparkle:"
                                                                 

### Next step

La documentation de Flask est vraiment bien foutue, à partir de là, si vous êtes intéressé, [le quickstart](http://flask.pocoo.org/docs/quickstart/) peut vous permettre de débuter rapidement avec le framework. En attendant je réfléchis à la suite de cet article.

<p style="text-align:center;font-size: 2em;">❧</p>