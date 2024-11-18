def set_default_preset
  return if Item.any?
  ResetToPreset.run!(name: "4-level")
end

set_default_preset
