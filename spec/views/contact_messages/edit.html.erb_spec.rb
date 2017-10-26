require 'rails_helper'

RSpec.describe "contact_messages/edit", type: :view do
  before(:each) do
    @contact_message = assign(:contact_message, ContactMessage.create!())
  end

  it "renders the edit contact_message form" do
    render

    assert_select "form[action=?][method=?]", contact_message_path(@contact_message), "post" do
    end
  end
end
