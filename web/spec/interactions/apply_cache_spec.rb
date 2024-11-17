require 'rails_helper'

RSpec.describe ApplyCache do
  describe "(basic behavior)" do
    let!(:root) { create(:item, :with_grandchildren) }
    let!(:first_child) { root.children[0] }
    let!(:ops) {
      [
        create(:operation_update, item: root, value: "root new value"),
        create(:operation_remove, item: first_child),
        create(:operation_create, parent_id: root.id, value: "new item")
      ]
    }

    subject(:execute) { described_class.new.run! }

    before do
      allow(ActiveRecord::Base).to receive(:transaction).and_yield
      execute
    end

    it "apply update ops" do
      expect { root.reload }.to change { root.value }.to("root new value")
    end

    it "applying remove ops and removes Item" do
      expect { first_child.reload }.to change { first_child.is_deleted }.from(false).to(true)
    end

    it "apply remove ops and remove Item descendants" do
      expect(first_child.children.pluck(:is_deleted)).to all(eq(true))
    end

    it "apply create ops" do
      expect { root.children.reload }.to change { root.children.size }.by(1)
      new_item = root.children.order(:id).last
      expect(new_item.value).to eq("new item")
    end

    it "mark ops as applied" do
      ops.each(&:reload)
      expect(ops.map(&:applied_to_db)).to all(eq(true))
    end
  end

  describe "(edge cases)" do
    let!(:root) { create(:item, :with_grandchildren, value: "root value") }
    let!(:first_child) { root.children[0] }

    subject(:execute) { described_class.new.run! }

    context "when several update ops for one item:" do
      let!(:ops) {
        [
          create(:operation_update, item: root, value: "root new value"),
          create(:operation_update, item: root, value: "last updated value")
        ]
      }

      before do
        allow(ActiveRecord::Base).to receive(:transaction).and_yield
        execute
      end

      it "apply last update op" do
        expect { root.reload }.to change { root.value }
          .from("root value").to("last updated value")
      end
    end

    context "when create op goes after remove op:" do
      let!(:ops) {
        [
          create(:operation_remove, item: first_child),
          create(:operation_create, parent_id: first_child.id, value: "new node")
        ]
      }

      before do
        allow(ActiveRecord::Base).to receive(:transaction).and_yield
        execute
      end

      it "mark newly created item deleted if one of ancestors is deleted" do
        new_item = first_child.children.order(:id).last
        expect(new_item.is_deleted).to eq(true)
      end
    end
  end
end
