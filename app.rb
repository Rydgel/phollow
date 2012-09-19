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

get(/.+/) do
  send_sinatra_file(request.path) {404}
end

not_found do
  send_sinatra_file('404.html', {:status => 404}) do
    "Sorry, I cannot find #{request.path}"
  end
end

def send_sinatra_file(path, &missing_file_block)
  file_path = File.join(File.dirname(__FILE__), '_site',  path)
  file_path = File.join(file_path, 'index.html') unless file_path =~ /\.[a-z]+$/i  
  File.exist?(file_path) ? send_file(file_path) : missing_file_block.call
end
