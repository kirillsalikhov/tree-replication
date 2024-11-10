class Api::OperationsController < Api::ApplicationController
  def create
    render_op Operation::CreateOp.run!(params)
  end

  def update
    render_op Operation::UpdateOp.run!(params)
  end

  def remove
    render_op Operation::RemoveOp.run!(params)
  end

  def load_action
    render_op Operation::LoadOp.run!(params)
  end

  private

  # @param op [Operation::Base]
  def render_op(op)
    render json: op
  end
end
