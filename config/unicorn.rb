# amount of unicorn workers to spin up
worker_processes 16
# restarts workers that hang for 30 seconds
timeout 2
preload_app true

# http://unicorn.bogomips.org/ for more.