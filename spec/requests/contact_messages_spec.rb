require 'rails_helper'

RSpec.describe "ContactMessages", type: :request do
  describe "GET /contact_messages" do
    it "works! (now write some real specs)" do
      get contact_messages_path
      expect(response).to have_http_status(200)
    end
  end
end
