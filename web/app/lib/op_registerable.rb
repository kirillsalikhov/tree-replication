module OpRegisterable
  def self.included(base)
    base.extend ClassMethods
  end

  module ClassMethods
    def register_op(op_class, handler)
      raise ArgumentError, "#{op_class} should be class" unless op_class.is_a?(Class)
      raise ArgumentError, "#{op_class} should be subclass of Operation::Base" unless op_class <= Operation::Base
      op_handlers[op_class] = handler
    end

    def op_handlers
      return @handlers if @handlers
      if superclass.respond_to?(:op_handlers)
        @handlers ||= superclass.send(:op_handlers).dup
      end
      @handlers ||= {}
    end
  end

  def op_handler(op)
    self.class.op_handlers[op.class]
  end
end
