require 'rails_helper'

RSpec.describe "contact_messages/new", type: :view do
  before(:each) do
    assign(:contact_message, ContactMessage.new())
  end

  it "renders new contact_message form" do
    render

    assert_select "form[action=?][method=?]", contact_messages_path, "post" do
    end
  end
end
