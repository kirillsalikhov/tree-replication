require 'rails_helper'

RSpec.describe "Api::Items", type: :request do
  describe "GET /api/items" do
    let!(:cached_items) { create_list(:item, 5) }

    subject(:request) { get api_items_path, as: :json }

    before { request }

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end

    it "returns list" do
      expect(json_body.size).to eq(5)
    end
  end

  describe "POST /api/items/apply-cache" do
    let!(:root) { create(:item, :with_grandchildren) }
    let!(:ops) {
      [
        create(:operation_update, item: root),
        create(:operation_update, item: root, value: "latest_upd"),
        create(:operation_remove, item: root.children[0]),
        create(:operation_create, parent_id: root.id)
      ]
    }
    subject(:request) { post apply_cache_api_items_path, as: :json }

    before {
      allow(ActiveRecord::Base).to receive(:transaction).and_yield
      request
    }

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end

    it "apply update ops" do
      expect { root.reload }.to change { root.value }.to("latest_upd")
    end

    it "apply remove ops" do
      first_child = root.children[0]
      expect { first_child.reload }.to change { first_child.is_deleted }.from(false).to(true)
      expect(first_child.children.pluck(:is_deleted)).to all(eq(true))
    end

    it "apply create ops" do
      expect { root.children.reload }.to change { root.children.size }.by(1)
    end

    it "mark ops as applied" do
      ops.each(&:reload)
      expect(ops.map(&:applied_to_db)).to all(eq(true))
    end
  end

  describe "POST /api/items/reset-to-preset" do
    let!(:cached_item) { create(:cached_item) }
    let!(:operation) { create(:operation_update, item: cached_item) }
    let!(:old_item) { create(:item) }

    let(:valid_params) { { name: 'root-only' } }

    subject(:request) { post reset_to_preset_api_items_path, params: valid_params, as: :json }

    before { subject }

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end

    it "wipes CacheItems and Ops" do
      expect(CachedItem.count).to eq(0)
      expect(Operation::Base.count).to eq(0)
    end

    it "wipes old items" do
      expect(Item.exists?(old_item.id)).to eq(false)
    end

    it "it creates new items for preset 'root-only'" do
      expect(Item.count).to eq(1)
      expect(Item.first.value).to eq("Root Node")
    end
  end
end
