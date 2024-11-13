class Api::ItemsController < Api::ApplicationController
  def index
    render json: Item.ordered
  end
end
