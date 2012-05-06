# encoding: utf-8

module Liquid
  module StandardFilters
    def render_category(input)
      html = []
      input.each do |category|
        html << "<a href=\"/category/#{category}\" rel=\"category tag\">#{category}</a>"
      end
      html.flatten.join(', ')
    end
  end
end