class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # note that this include statement comes AFTER the devise block above
  include DeviseTokenAuth::Concerns::User

  validates_presence_of :name

  has_attached_file :avatar, styles: {
      thumb: '100x100>',
      big: '1024x1024>'
  }
  validates_attachment_content_type :avatar, :content_type => %w(image/jpg image/jpeg image/png image/gif)

  def token_validation_response
    self.as_json(except: [
        :tokens, :created_at, :updated_at
    ], methods: :avatar)
  end

  def is_device_registered?
    not self.firebase_registration_token.empty?
  end

end
