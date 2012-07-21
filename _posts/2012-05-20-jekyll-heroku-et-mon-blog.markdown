---
date: '2012-05-20 01:30:22'
layout: post
slug: jekyll-heroku-et-mon-blog
status: publish
title: Jekyll, Heroku et mon blog
desc: Comment héberger son site Jekyll gratuitement avec Heroku.
wordpress_id: '3980'
categories:
- blog
- web
tags:
- jekyll
- heroku
- blog
---

<div>
<figure>
<figcaption><img style="margin-top: 0;" src="http://static.phollow.fr/2012/05/heroku.jpeg" title="heroku" class="alignnone size-full">
</figcaption>
</figure>
</div>

La migration du blog vers Jekyll était une première étape nécessaire pour une migration complète vers une solution gratuite – _ou presque_. Quand le site web n’est plus qu’une collection de fichiers statiques, l’hébergement devient vraiment simple.

### Heroku

Heroku est une plate-forme _cloud_ qui peut faire tourner des applications Python, Ruby, Scala etc. Le déploiement d’une app n’est pas plus compliqué qu’un `git push heroku master`. J’utilise la solution gratuite qui est amplement suffisante pour ce blog. Et si un jour ce blog devient extraordinairement populaire, je pourrai _scaler_ simplement avec `ps:scale web=x`.

### Amazon S3

J’en avais déjà parlé sur l’article précédent, les images et les uploads divers des articles sont tous stockés sur Amazon S3. C’était pour préparer la migration sur Heroku, car on est limité à 100Mo pour une application donné. Une application dont le code source fait 100Mo, c’est déjà énorme je trouve. Et généralement personne ne stocke les uploads d’une app. web dans un sous-dossier de l’application elle-même.

Du coup ça peut me permettre de stocker des trucs vraiment énormes sans avoir de limite (sauf les limites de mon porte-monnaie évidemment). D’un point de vue argent justement, S3 est la seule chose que je paie pour héberger ce blog, et pour info j’en suis à $0.03 depuis le début du mois.

### Sinatra

Heroku ne permet pas de déployer juste un tas de fichiers statiques, par contre rien ne nous empêche de développer une application proxy, ici Sinatra, servant seulement à servir ces fichiers. Le code de l’application est simple&thinsp;:

{% highlight ruby %}
# encoding: utf-8
require 'rubygems'
require 'sinatra'

configure do
  set :public_folder, Proc.new { File.join(root, "_site") }
  # Last modification time for browser cache
  @last_mod_time = Time.now
end

before do
  headers "X-UA-Compatible" => "IE=Edge,chrome=1"
  expires 300, :public, :must_revalidate
  last_modified(@last_mod_time)
end

get '/' do
  send_file('_site/index.html')
end

get '/*' do
  file_path = '_site/' + params[:splat].join('/') + '/index.html'
  if FileTest.exist?(file_path)
    send_file(file_path)
  end
  halt 404
end

not_found do
  send_file('_site/404.html')
end
{% endhighlight %}

Le code de l’application a été mise à jour sur le [dépôt Github du blog](https://github.com/Rydgel/phollow).

### Autres solutions

Heroku n’est pas la seule manière d’héberger votre blog à moindre coût. On peut utiliser entre autre :

* Les pages Github [http://pages.github.com/](http://pages.github.com/)
* Mettre le site en entier dans Amazon S3
* Dropbox