require 'rubygems'
require 'rake'

task :default => :server
 
desc 'Build site with Jekyll'
task :build do
  jekyll "--no-auto"
end

desc "Compile CoffeeScript, SCSS, and all of the above."
task :compile do
  sh "coffee -o js/compiled -c js/coffeescript/*.coffee"
  sh "sass css/scss/base.scss css/compiled/base.css --scss"
  sh "sass css/scss/iphone.scss css/compiled/iphone.css --scss"
end
 
desc 'Build and start server with --auto'
task :server do
  jekyll '--server --auto'
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rtzh --progress --delete _site/ root@direct.phollow.fr:/srv/http/phollow/'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end
