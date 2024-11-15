class ResetToPreset < ActiveInteraction::Base
  string :name

  PRESETS_DIR = Rails.root.join("app", "lib", "presets")

  def execute
    load_preset
    validate_preset
    root = create_tree

    ActiveRecord::Base.transaction do
      Item.destroy_all
      ResetCache.run!
      root.save!
    end
  end

  private

  def load_preset
    @preset = YAML.load_file PRESETS_DIR.join("#{name}.yml")
  rescue Errno::ENOENT
    errors.add(:preset, "not found", strict: true)
  end

  def validate_preset
    errors.add(:preset, "no roots", strict: true) if @preset.size == 0
    errors.add(:preset, "more than one root", strict: true) if @preset.size > 1
  end

  def create_tree
    to_item = ->(node) {
      label, children = node.is_a?(Hash) ? node.first : [ node, nil ]

      item = Item.new(value: label)
      item.children = children.map(&to_item) if children
      item
    }

    to_item.call(@preset)
  end
end
