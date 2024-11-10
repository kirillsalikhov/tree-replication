require 'rails_helper'

RSpec.describe "Api::Operations", type: :request do
  describe "POST /api/operations/create" do
    let(:parent_cached_item) { create(:cached_item) }
    let(:valid_params) {
      {
        parent_id: parent_cached_item.id,
        value: "New node"
      }
    }

    # TODO change to path helper
    subject(:request) { post "/api/operations/create", params: valid_params }

    it "creates valid Create operation" do
      request
      expect(response).to have_http_status(200)

      # # TODO split to operation and schema check
      op = Operation::Create.find(json_body[:id])
      expect(op).to be_present
      expect(op.data[:id]).to be_truthy
      expect(op.data).to include(valid_params)
    end

    it "creates CachedItem" do
      request

      cached_item = CachedItem.find(json_body[:data][:id])
      expect(cached_item).to be_present
      expect(cached_item.slice(:value, :parent_id)).to include(valid_params)
    end
  end

  describe "POST /api/operations/update" do
    let(:cached_item) { create(:cached_item) }
    let(:valid_params) { { item_id: cached_item.id, value: "Changed name" } }

    subject(:request) { post "/api/operations/update", params: valid_params }

    it "create valid Update operation" do
      request
      expect(response).to have_http_status(:ok)

      expect(json_body[:data][:value]).to eq(valid_params[:value])
      expect(json_body[:data][:id]).to be_truthy
    end

    it "changes CachedItem value" do
      expect { request; cached_item.reload }
        .to change(cached_item, :value).to(valid_params[:value])
    end
  end

  describe "POST /api/operations/remove" do
    let(:cached_item) { create(:cached_item) }
    let(:valid_params) { { item_id: cached_item.id } }

    subject(:request) { post "/api/operations/remove", params: valid_params }

    it "create valid Remove operation" do
      request
      expect(response).to have_http_status(:ok)

      op = Operation::Remove.find(json_body[:id])
      expect(op).to be_present
      expect(op.data[:id]).to eq(valid_params[:item_id])
    end

    it "mark CachedItem deleted" do
      expect { request; cached_item.reload }
        .to change(cached_item, :is_deleted).from(false).to(true)
    end
  end

  describe "POST /api/operations/load" do
    # TODO make factory with parent
    let(:item) { create(:item) }
    let(:valid_params) { { item_id: item.id } }

    subject(:request) { post "/api/operations/load", params: valid_params }

    it "create valid Load operation" do
      request
      expect(response).to have_http_status(:ok)

      op = Operation::Load.find(json_body[:id])
      expect(op).to be_present
      expect(op.data).to eq(item.slice(:id, :parent_id, :value))
    end

    it "creates CachedItem identical to passed Item" do
      request

      cached_item = CachedItem.find(json_body[:data][:id])
      expect(cached_item).to be_present
      expect(cached_item.slice(:id, :parent_id, :value))
        .to eq(item.slice(:id, :parent_id, :value))
    end
  end
end
