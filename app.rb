# encoding: utf-8
require 'rubygems'
require 'sinatra'

configure do
  set :public_folder, Proc.new { File.join(root, "_site") }
  # Last modification time for browser cache
  @last_mod_time = Time.now
end

configure :production do
  require 'newrelic_rpm'
end

before do
  headers "X-UA-Compatible" => "IE=Edge,chrome=1"
  expires 300, :public, :must_revalidate
  last_modified(@last_mod_time)
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
