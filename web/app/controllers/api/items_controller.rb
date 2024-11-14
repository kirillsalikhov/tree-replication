class Api::ItemsController < Api::ApplicationController
  def index
    render json: Item.ordered
  end

  def apply_cache
    ApplyCache.run!
    head :no_content
  end
end
