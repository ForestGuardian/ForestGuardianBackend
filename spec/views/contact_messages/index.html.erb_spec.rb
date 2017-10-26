require 'rails_helper'

RSpec.describe "contact_messages/index", type: :view do
  before(:each) do
    assign(:contact_messages, [
      ContactMessage.create!(),
      ContactMessage.create!()
    ])
  end

  it "renders a list of contact_messages" do
    render
  end
end
