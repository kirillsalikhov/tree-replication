require 'rails_helper'

RSpec.describe "Api::CachedItems", type: :request do
  describe "GET /api/cached_items" do
    let!(:cached_items) { create_list(:cached_item, 5) }

    subject(:request) { get api_cached_items_path, as: :json }

    before { request }

    it "returns list" do
      expect(json_body.size).to eq(5)
    end

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end
  end

  describe "POST /api/cached_items" do
    let(:parent_cached_item) { create(:cached_item) }
    let(:valid_params) {
      {
        parent_id: parent_cached_item.id,
        value: "New node"
      }
    }

    subject(:request) { post api_cached_items_path, params: valid_params, as: :json }

    before { request }

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end

    it "creates CachedItem" do
      cached_item = CachedItem.find(json_body[:id])
      expect(cached_item).to be_present
      expect(cached_item.slice(:value, :parent_id)).to include(valid_params)
    end

    it "creates Create operation" do
      op = Operation::Create.last
      expect(op).to be_present
      expect(op.item_id).to eq(json_body[:id])
      expect(op.data).to include(valid_params)
    end
  end

  describe "POST /api/cached_items/load" do
    # TODO make factory with parent
    let(:item) { create(:item) }
    let(:valid_params) { { item_id: item.id } }

    subject(:request) { post load_api_cached_items_path, params: valid_params, as: :json }

    before { request }

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end

    it "creates CachedItem identical to passed Item" do
      cached_item = CachedItem.find(json_body[:id])
      expect(cached_item).to be_present
      expect(cached_item.slice(:id, :parent_id, :value))
        .to eq(item.slice(:id, :parent_id, :value))
    end

    it "creates Load operation" do
      op = Operation::Load.last
      expect(op).to be_present
      expect(op.item_id).to eq(json_body[:id])
      expect(op.data).to eq(item.slice(:id, :parent_id, :value))
    end
  end

  describe "PATCH /api/cached_item" do
    let(:cached_item) { create(:cached_item) }
    let(:valid_params) { { value: "Changed name" } }

    subject(:request) { patch api_cached_item_path(cached_item), params: valid_params, as: :json }

    before { request }

    it "valid schema response" do
      assert_api_conform(status: 200)
    end

    it "create Update operation" do
      op = Operation::Update.last
      expect(op.value).to eq(json_body[:value])
      expect(op.item_id).to eq(json_body[:id])
    end

    it "changes CachedItem's value" do
      expect { cached_item.reload }
        .to change(cached_item, :value).to(valid_params[:value])
    end
  end

  describe "DELETE /api/cached_item" do
    let(:cached_item) { create(:cached_item) }

    subject(:request) { delete api_cached_item_path(cached_item), as: :json }

    before { request }

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end

    it "marks CachedItem deleted" do
      expect { cached_item.reload }
        .to change(cached_item, :is_deleted).from(false).to(true)
    end

    it "creates valid Remove operation" do
      op = Operation::Remove.last
      expect(op).to be_present
      expect(op.item_id).to eq(json_body[:id])
    end
  end

  describe "DELETE /api/cached_items/reset-cache" do
    let!(:cached_items) { create_list(:cached_item, 5) }
    let!(:operation_update) { create_list(:operation_update, 4, item: cached_items[0]) }

    subject(:request) { delete reset_cache_api_cached_items_path, as: :json }

    it "has valid schema response" do
      request
      assert_api_conform(status: 200)
    end

    it "wipes all CachedItems" do
      expect { request }.to change { CachedItem.count }.from(5).to(0)
        .and change { Operation::Base.count }.from(4).to(0)
    end
  end
end
