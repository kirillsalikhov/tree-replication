class Api::CachedItemsController < Api::ApplicationController
  def index
    render json: CachedItem.ordered
  end

  def create
    render_op_item Operation::CreateOp.run!(params)
  end

  def load_from_db
    render_op_item Operation::LoadOp.run!(params)
  end

  def update
    render_op_item Operation::UpdateOp.run!(update_params)
  end

  def destroy
    render_op_item Operation::RemoveOp.run!(destroy_params)
  end

  def reset_cache
    ResetCache.run!
    # workaround for Orval + fetch + no_content
    render json: { ok: true }
  end

  private

  # @param op [Operation::Base]
  def render_op_item(op)
    render json: CachedItem.find(op.item_id)
  end

  def update_params = { item_id: params[:id] }.merge(params.permit(:value))
  def destroy_params = { item_id: params[:id] }
end
