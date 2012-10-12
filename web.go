package main

import (
    "os"
    "net/http"
    "html/template"
)

type errorWriter struct {
	w http.ResponseWriter
    ignore bool
}

type errorHandle struct {
    h http.Handler
}

func (h *errorHandle) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    h.h.ServeHTTP(&errorWriter{w, false}, r)
}

func (w *errorWriter) Header() (http.Header) {
    return w.w.Header()
}

func (w *errorWriter) Write(p []byte) (int, error) {
    if w.ignore {
        return len(p), nil
    }
    
    return w.w.Write(p)
}

func (w *errorWriter) WriteHeader(status int) {
   if status == 404 {
      w.ignore = true
      w.w.Header().Set("Content-Type", "text/html; charset=utf-8")
      w.w.WriteHeader(404)
      t, _ := template.ParseFiles("_site/404.html")
      t.Execute(w.w, nil)
   } else {
      w.w.WriteHeader(status)
   }
}

func main() {
    http.Handle("/", &errorHandle{http.FileServer(http.Dir("_site"))})
    err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
    if err != nil {
        panic(err)
    }
}