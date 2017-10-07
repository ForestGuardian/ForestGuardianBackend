class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  # note that this include statement comes AFTER the devise block above
  include DeviseTokenAuth::Concerns::User

  validates_presence_of :name

  has_attached_file :avatar, styles: {
      thumb: '100x100>',
      big: '1024x1024>'
  }
  validates_attachment_content_type :avatar, :content_type => %w(image/jpg image/jpeg image/png image/gif)

  def avatar_url
    avatar.url(:thumb)
  end

  def as_json(options = { })
    super((options || { }).merge({
         :methods => [:avatar_url]
     }))
  end

  def is_device_registered?
    not self.firebase_registration_token.nil?
  end

  # ActiveAdmin display name
  # http://github-docs.activeadmin.info/3-index-pages/index-as-table.html
  def display_name
    "#{name} (#{email})"
  end

end
