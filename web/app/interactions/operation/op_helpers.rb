module Operation::OpHelpers
  def apply_op(operation)
    ActiveRecord::Base.transaction do
      operation.save!
      CacheOrigin.new.apply([ operation ])
      operation
    end
  end
end
