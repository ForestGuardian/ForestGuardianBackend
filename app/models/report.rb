class Report < ActiveRecord::Base

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  has_attached_file :picture, styles: {
      thumb: '100x100>',
      big: '1024x1024>'
  }

  # region validations
  validates_presence_of :title
  validates_presence_of :description
  validates_presence_of :comments
  validates_presence_of :geo_latitude
  validates_presence_of :geo_longitude
  # validates_presence_of :author
  validates_attachment_content_type :picture, :content_type => %w(image/jpg image/jpeg image/png image/gif)
  # endregion

  def picture_url
    picture.url(:thumb)
  end

end
