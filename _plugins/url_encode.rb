# encoding: utf-8
require 'rubygems'
require 'open-uri'

module Liquid
  module StandardFilters
    def url_encode(input)
      URI::encode(input)
    end
  end
end
