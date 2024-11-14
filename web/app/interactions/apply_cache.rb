class ApplyCache < ActiveInteraction::Base
  def run!
    ActiveRecord::Base.transaction(isolation: :repeatable_read) do
      ops = get_ops
      DbOrigin.new.apply(ops)
      ops.update_all(applied_to_db: true)
    end
  end

  private

  def get_ops
    Operation::Base.not_applied
  end
end
