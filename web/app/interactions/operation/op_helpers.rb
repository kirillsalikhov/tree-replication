module Operation::OpHelpers
  def apply_to_cache_origin(operation)
    ActiveRecord::Base.transaction do
      operation.save!
      CacheOrigin.new.apply([ operation ])
      operation
    end
  end
end
