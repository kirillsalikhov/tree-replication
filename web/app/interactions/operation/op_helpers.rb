module Operation::OpHelpers
  def apply_op(operation)
    puts "!!!!"
    ActiveRecord::Base.transaction do
      operation.save!
      CacheOrigin.new.apply([ operation ])
      operation
    end
  end
end
