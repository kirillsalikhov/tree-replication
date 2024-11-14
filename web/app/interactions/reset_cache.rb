class ResetCache < ActiveInteraction::Base
  def run!
    CachedItem.destroy_all
    Operation::Base.destroy_all
  end
end
