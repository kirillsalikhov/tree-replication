class BaseOrigin
  include OpRegisterable

  def apply(operations)
    operations.each do |op|
      method_name = op_handler(op)
      method(method_name).call(op) if method_name
    end
  end
end
