# amount of unicorn workers to spin up
worker_processes 4
# restarts workers that hang for 30 seconds
timeout 30
preload_app true
# http://unicorn.bogomips.org/ for more.