module Misc
  def self.dump_db_tree
    dump_tree(Item.hash_tree)
  end

  def self.dump_cache_tree
    idx = CachedItem
      .all
      .reduce(ActiveSupport::OrderedHash.new) { |acc, v|
        acc[v.id] = { item: v, children: {} } ; acc
      }

    tree = idx.reduce(ActiveSupport::OrderedHash.new) { |acc, (_, r)|
      item = r[:item]
      parent_id = item[:parent_id]
      if idx[parent_id]
        idx[parent_id][:children][item] = r[:children]
      else
        acc[item] = r[:children]
      end

      acc
    }

    dump_tree(tree)
  end

  protected

  def self.dump_tree(tree)
    walk = ->(roots, depth = 0, &block) {
      roots.each do |node, sub_tree|
        block.call(node, depth)
        walk.call(sub_tree, depth + 1, &block)
      end
    }

    walk.call(tree) { |node, depth|
      pad = "  " * depth
      puts "#{pad} #{node.value} (#{depth}), del: #{node.is_deleted} -- #{node.id}"
    }
  end
end
