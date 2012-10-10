package main

import (
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
    http.ServeFile(w, r, filePath)
}

func NotFound(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "_site/404.html")
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/", HomeHandler)
    r.HandleFunc("/{path}", PageHandler)
    r.PathPrefix("/").Handler(http.FileServer(http.Dir("_site")))
    r.NotFoundHandler = http.HandlerFunc(NotFound)
    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}
