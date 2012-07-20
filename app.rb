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
  # phollow.fr -> www.phollow.fr
  puts request
  redirect "www.#{request.url}", 301 unless request.host =~ /^www/
  # cache headers
  headers "X-UA-Compatible" => "IE=Edge,chrome=1"
  cache_control :public, :must_revalidate, :max_age => 86400
  last_modified @last_mod_time
  etag Digest::MD5.hexdigest("#{request.url};#{@last_mod_time}")
end

get '/' do
  send_file('_site/index.html')
end

get '/*' do
  file_path = '_site/' + params[:splat].join('/') + '/index.html'
  if FileTest.exist?(file_path)
    send_file(file_path)
  end
  halt 404
end

not_found do
  send_file('_site/404.html')
end
