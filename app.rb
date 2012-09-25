# encoding: utf-8
require 'rubygems'
require 'sinatra'
require 'digest/md5'

configure do
  set :public_folder, Proc.new { File.join(root, "_site") }
  # Last modification time for browser cache
  @last_mod_time = Time.now
end

configure :production do
  require 'newrelic_rpm'
end

before do
  # www.phollow.fr -> phollow.fr
  redirect request.url.sub(/www\./, ''), 301 if request.host =~ /^www/
  # cache headers
  headers "X-UA-Compatible" => "IE=Edge,chrome=1"
  cache_control :public, :must_revalidate, :max_age => 86400
  last_modified @last_mod_time
  etag Digest::MD5.hexdigest("#{request.url};#{@last_mod_time}")
end

get '/' do
  send_file('_site/index.html')
end

get '/feed' do
  redirect '/atom.xml', 301
end

get '/*' do
  file_path = '_site/' + params[:splat].join('/') + '/index.html'
  if FileTest.exist?(file_path)
    send_file(file_path)
  end
  not_found
end

not_found do
  #"404 - Not found"
  #send_file('_site/404.html', :status => 404)
  file = File.open("_site/404.html", "rb")
  contents = file.read
  file.close
  return contents
end
