class Api::OperationsController < Api::ApplicationController
  def create
    render_op Operation::CreateOp.run!(parent_id: "bar", value: "new node")
  end

  def update
    render_op Operation::UpdateOp.run!(item_id: "01931212-02ab-7cae-9233-b14c215dffcb", value: "foo")
  end

  def remove
    render_op Operation::RemoveOp.run!(item_id: "01931212-02ab-7cae-9233-b14c215dffcb")
  end

  def load_action
  end

  private

  # @param op [Operation::Base]
  def render_op(op)
    render json: op
  end
end
