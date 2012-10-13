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