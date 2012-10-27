---
date: '2012-10-27 16:55:00'
layout: post
slug: serveur-fichiers-statiques-golang
status: publish
title: Un simple serveur de ﬁchiers ﬆatiques sous Golang
desc: Mes premiers ‘ébats’ avec ce langage.
pk: j.mp/TmkdgL
wordpress_id: '3984'
ogp_image: 'http://static.phollow.fr/2012/10/golang.jpg'
categories:
- golang
- web
tags:
- golang
- jekyll
- web
---

Depuis quelques semaines, je me suis mis à l’apprentissage de Go. Et pour accélérer cet apprentissage je me suis mis en tête de refaire mon serveur de fichiers statiques (celui qui sert les pages de ce blog). Il était fait en Ruby avec Sinatra, j’en parlais [ici](http://phollow.fr/2012/05/jekyll-heroku-et-mon-blog/).

### Première version

Go possède déjà pas mal de bibliothèques pour tout ce qui est _networking_ et _serveurs_. Le module `http` possède une méthode `FileServer` qui peut-être utilisée en tant que serveur de fichiers statiques.

{% highlight go %}
{% raw %}
package main

import "net/http"

func main() {
    http.Handle("/", http.FileServer(http.Dir("_site")))
    err := http.ListenAndServe(":8000", nil)
    if err != nil {
        panic(err)
    }
}
{% endraw %}
{% endhighlight %}


### Seconde version

La première version, aussi simple soit-elle, ne me suffisait pas. Le problème étant lié aux pages 404, Go servant la sienne. Je voulais pouvoir mettre une page customisée. La solution consiste à créer ses propres types et à les _wrapper_ autour des natifs. (Ce n’est pas de l’héritage, Go n’étant pas un langage orienté objet. Ce qui est **bien**.)

Mon type `errorHandle` contient juste le type habituel, mais grâce à lui je peux faire ma propre méthode `ServeHTTP` qui elle utilisera mon type `errorWriter`. Il contient le type de base `ResponseWriter` avec en plus un boolean. Je set ce boolean à `true` quand je détecte un header 404 et je sers ma page customisée à la place.


{% highlight go %}
{% raw %}
package main

import (
    "os"
    "net/http"
    "html/template"
)

type errorWriter struct {
    http.ResponseWriter
    ignore bool
}

type errorHandle struct {
    http.Handler
}

func (h *errorHandle) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    h.Handler.ServeHTTP(&errorWriter{w, false}, r)
}

func (w *errorWriter) Header() (http.Header) {
    return w.ResponseWriter.Header()
}

func (w *errorWriter) Write(p []byte) (int, error) {
    if w.ignore {
        return len(p), nil
    }

    return w.ResponseWriter.Write(p)
}

func (w *errorWriter) WriteHeader(status int) {
   if status == 404 {
      w.ignore = true
      w.ResponseWriter.Header().Set("Content-Type", "text/html; charset=utf-8")
      w.ResponseWriter.WriteHeader(404)
      t, _ := template.ParseFiles("_site/404.html")
      t.Execute(w.ResponseWriter, nil)
   } else {
      w.ResponseWriter.WriteHeader(status)
   }
}

func main() {
    fs := http.FileServer(http.Dir("_site"))
    http.Handle("/", &errorHandle{fs})
    err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
    if err != nil {
        panic(err)
    }
}
{% endraw %}
{% endhighlight %}

Ce bout de code est capable de tourner sous Heroku (et peut-être App Engine). J’ai 2, 3 autres articles sous le feu sur ce langage qui me plaît bien.