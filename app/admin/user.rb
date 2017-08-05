ActiveAdmin.register User do
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
  permit_params :email, :name, :avatar, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :provider
    column :last_sign_in_at
    column :last_sign_in_ip
    column :email
    column :name
    column 'Avatar', sortable: :avatar_file_name do |user| link_to user.avatar.name, user.avatar.url end
    column :created_at
    actions
  end

  form do |f|
    f.inputs "User" do
      f.input :email, required: true
      f.input :name, required: true
      f.input :avatar, required: true, as: :file
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
