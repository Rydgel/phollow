package main

import (
    "os"
    "net/http"
    "github.com/gorilla/mux"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "_site/index.html")
}

func PageHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    path := vars["path"]

    filePath := "_site/" + path + "index.html"
    // check if file exists, otherwise 404 
    _, err := os.Stat(filePath)
    if err != nil {
        http.ServeFile(w, r, "_site/404.html")
    } else {
        http.ServeFile(w, r, filePath)
    }
}

func FeedHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "_site/atom.xml")
}

func NotFound(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "_site/404.html")
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/", HomeHandler)
    r.HandleFunc("/{path}", PageHandler)
    r.HandleFunc("/feed/", FeedHandler)
    r.PathPrefix("/").Handler(http.FileServer(http.Dir("_site")))
    r.NotFoundHandler = http.HandlerFunc(NotFound)
    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}
