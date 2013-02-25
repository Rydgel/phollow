require 'rubygems'
require 'rake'

task :default => :server
 
desc 'Build site with Jekyll'
task :build do
  jekyll "--no-auto"
  sh "java -jar ./htmlcompressor.jar -r --type html -o _site _site"
end
 
desc 'Build and start server with --auto'
task :server do
  jekyll '--server --auto'
end

def jekyll(opts = '')
  sh 'rm -rf _site'
  sh 'jekyll ' + opts
end
