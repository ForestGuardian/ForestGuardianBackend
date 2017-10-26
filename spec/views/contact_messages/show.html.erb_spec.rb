require 'rails_helper'

RSpec.describe "contact_messages/show", type: :view do
  before(:each) do
    @contact_message = assign(:contact_message, ContactMessage.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
