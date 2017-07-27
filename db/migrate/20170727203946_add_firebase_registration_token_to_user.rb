class AddFirebaseRegistrationTokenToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :firebase_registration_token, :string
  end
end
