class PagesController < ApplicationController
  def root
    render html: "", layout: "application"
  end
end
