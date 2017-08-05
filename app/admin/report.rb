ActiveAdmin.register Report do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

  index do
    selectable_column
    id_column
    column :title
    column :author
    column :geo_latitude
    column :geo_longitude
    column :location_name
    column 'Picture', sortable: :picture_file_name do |report| link_to report.picture.name, report.picture.url end
    column :created_at
    actions
  end

  form do |f|
    f.inputs "Upload" do
      f.input :title
      f.input :author
      f.input :geo_latitude
      f.input :geo_longitude
      f.input :location_name
      f.input :picture, required: true, as: :file
    end
    f.actions
  end

end
