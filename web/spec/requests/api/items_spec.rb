require 'rails_helper'

RSpec.describe "Api::Items", type: :request do
  describe "GET /api/items" do
    let!(:cached_items) { create_list(:item, 5) }

    subject(:request) { get api_items_path, as: :json }

    before { request }

    it "returns list" do
      expect(json_body.size).to eq(5)
    end

    it "has valid schema response" do
      assert_api_conform(status: 200)
    end
  end
end
