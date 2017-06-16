require 'spec_helper'
require 'awesome_print'
require 'rspec_api_documentation/dsl'
require 'acceptance_helper'

resource 'Sessions' do
  header "Accept", "application/json"
  header "Content-Type", "application/json"

  post '/api/v1/users/sign_in' do
    parameter :email, 'Email of the new user', 'Type': 'String'
    parameter :password, 'Password of at least 8 characters', 'Type': 'String'

    response_field :id, 'Id of the new created user', scope: :data,'Type': 'Number'
    response_field :email, 'Email of the new user', scope: :data,'Type': 'String'


    #request
    let(:email) { 'testing@forestguardian.org' }
    let(:password) { '12341234' }


    User.create!(email:'testing@forestguardian.org', name:'testing',password:'12341234', provider: 'email')

    let(:raw_post) { params.to_json }

    example_request 'Sign in succesfully with an HTTP 200' do

      #response
      user = JSON.parse(response_body)

      expect(status).to eq(200)
      expect(user['data']['email']).to eq(email)

    end

  end

end
