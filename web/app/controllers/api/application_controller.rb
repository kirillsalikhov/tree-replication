class Api::ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActiveRecord::RecordInvalid,
              ActiveModel::StrictValidationFailed,
    with: :handle_unprocessable_entity

  rescue_from ActiveInteraction::InvalidInteractionError, with: :handle_interaction_error

  protected

  def handle_not_found(e)
    render_error "not_found",
                 e.message,
                 status: :not_found
  end

  def handle_unprocessable_entity(e)
    render_error "validation_error",
                 e.message,
                 detail: e.try(:record).try(:errors),
                 status: :unprocessable_entity
  end

  def handle_interaction_error(e)
    render_error "validation_error",
                 e.message,
                 detail: e.interaction.errors,
                 status: :unprocessable_entity
  end

  def render_error(type, message, detail: nil, status: 500)
    render json:  {
      type: type,
      message: message,
      detail: detail
    }, status: status
  end
end
