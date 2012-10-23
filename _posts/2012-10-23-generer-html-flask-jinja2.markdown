---
date: '2012-10-23 20:40:00'
layout: post
slug: generer-html-flask-jinja2
status: publish
title: Générer son HTML sous Flask avec Jinja2
desc: Création de templates sous Python.
pk: j.mp/RdUmp0
wordpress_id: '3983'
ogp_image: 'http://static.phollow.fr/2012/08/flask.png'
categories:
- python
- web
tags:
- python
- flask
- web
- frontend
- jinja2
---

Suite du [précédent article](http://phollow.fr/2012/08/demarrer-la-creation-site-python-flask/) sur le développement web avec Python & Flask, nous allons voir comment afficher nos différentes pages. Assembler du HTML tend à être fait avec un moteur de templates. Il en existe plusieurs sous Python, mais nous allons nous intéresser uniquement à **Jinja2** étant donné qu’il est fourni de base avec Flask. _Bien sûr Flask ne vous force pas non plus à l’utiliser et rien ne vous empêche d’en prendre un autre._

### Logique du code dans les templates

Si vous avez déjà utilisé des templates dans d’autres langages, vous
savez qu’il faut limiter la complexité du code à l’intérieur de ceux-ci.
Les templates proposent des opérateurs de base pour gérer des boucles ou
des conditions, et des modules pour transformer l’affichage de
certaines variables. Quand vous devez faire quelque chose de complexe,
la bonne pratique est de lire déjà la documentation pour voir s’il
n’existe pas déjà une fonction pour ça. Ensuite il est toujours possible
d’augmenter les capacités de Jinja2 avec un module fait maison. Plus
d’infos sur ça plus tard dans l’article.

Toujours est-il que les templates doivent rester **simple**, de telle
manière à ce qu’un designer puisse intégrer vos pages sans trop se poser de
questions (no troll).

### Usage bas niveau

{% highlight python %}
{% raw %}
>>> from jinja2 import Template
>>> template = Template('umad {{ name }}?')
>>> template.render(name='Jérôme')
u'umad Jérôme?'
{% endraw %}
{% endhighlight %}

Voilà en gros le principe. Dans l'utilisation courante on utilisera pas ces méthodes, car on chargera plutôt un fichier .html. Mais c’est ce qui se passe, _à peu près_, en arrière-plan.

### Exemple concret avec Flask

Il faut créer un dossier `templates/` à la racine du projet, c’est ici que Jinja2 ira chercher par défaut vos fichiers.

{% highlight html+jinja %}
{% raw %}
{# projet/templates/layout.html: #}
<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>{% block title %}{% endblock %}</title>
    </head>
    <body>
        <section id="content">
            {% block content %}
            {% endblock %}
        </section>
        <footer id="footer">
            Copyright 2012 etc.
        </footer>
    </body>
</html>
{% endraw %}
{% endhighlight %}

{% highlight html+jinja %}
{% raw %}
{# projet/templates/index.html: #}
{% extends "layout.html" %}

{% block title %}Le titre de ma page{% endblock %}

{% block content %}
    <h1>Hello World</h1>

    <ul>
        {% for user in users %}
        <li>{{ user }}</li>
        {% endfor %}
    </ul>
{% endblock %}
{% endraw %}
{% endhighlight %}

Et maintenant côté Python:

{% highlight python %}
{% raw %}
# projet/app.py:
from flask import render_template

@app.route("/")
def index():
    users = [u"Jérôme", u"Rick Astley", u"Tony Stark"]
    return render_template('index.html', users=users)
{% endraw %}
{% endhighlight %}

Commençons par la fin. On a une route qui pointe sur la racine du site, on crée une liste appelée `users` contenant le nom de 3 personnes. On demande ensuite à Flask de nous retourner le template index.html en lui passant le contexte (notre liste). Le template index [hérite](http://jinja.pocoo.org/docs/templates/#template-inheritance) du template layout. L’objet users étant une liste, on peut utiliser une boucle {% raw %}`{% for %}{% endfor %}`{% endraw %} pour itérer. La liste des opérateurs (boucles, conditions…) peut se trouver [ici](http://jinja.pocoo.org/docs/templates/#list-of-control-structures).

**Note:** Les variables sont par défaut échappées dans Flask. (XSS, tout ça).

### Les filtres

Un filtre permet de transformer une variable en la passant dans une fonction. Par exemple couper un texte au bout de X caractères, désactiver l’échappement pour cette variable en particulier, etc.

{% highlight jinja %}
{% raw %}
{# Par exemple mon_titre="mon super titre" #}
{{ mon_titre|title }}
  -> "Mon Super Titre"
{% endraw %}
{% endhighlight %}

Liste des filtres disponibles de base dans Jinja2, [ici](http://jinja.pocoo.org/docs/templates/#builtin-filters).

### Création d’un filtre custom pour Jinja2

C’est plutôt facile d’augmenter les capacités de Jinja2. Par exemple:

{% highlight python %}
{% raw %}
@app.template_filter('cut')
def cut(s, arg="foo"):
    """Enlève certains caractères d’une chaîne de caractères"""
    return s.replace(arg, '')
{% endraw %}
{% endhighlight %}

{% highlight jinja %}
{% raw %}
{# name="foobar" dans cet exemple #}
{{ name|cut }}
  -> "bar"
{{ name|cut("f") }}
  -> "oobar"
{% endraw %}
{% endhighlight %}

Plus d’infos sur [cette page](http://jinja.pocoo.org/docs/api/#custom-filters) et [celle-ci](http://flask.pocoo.org/docs/templating/#registering-filters).

### Documentation

Sur cette [page](http://flask.pocoo.org/docs/templating/) on explique comment Jinja2 est intégré à Flask, avec les variables présentes par défaut et certains filtres ajoutés pour l’occasion. Et voici la [documentation officielle](http://jinja.pocoo.org/docs/) du moteur de templates lui-même. Et avec ça, vous devriez pouvoir tout faire :)
