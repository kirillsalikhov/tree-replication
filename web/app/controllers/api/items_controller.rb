class Api::ItemsController < Api::ApplicationController
  def index
    render json: Item.ordered
  end

  def apply_cache
    ApplyCache.run!
    # workaround for Orval + fetch + no_content
    render json: { ok: true }
  end

  def reset_to_preset
    ResetToPreset.run!(params)
    render json: { ok: true }
  end
end
