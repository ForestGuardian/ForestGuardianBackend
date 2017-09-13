class ApplicationController < ActionController::Base

  # Check ActiveAdmin and DeviseAuthToken incompatibilities.
  ::Rails.logger.warn(self.controller_path)
  unless self.controller_path.include? 'admin'
    include DeviseTokenAuth::Concerns::SetUserByToken
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    # protect_from_forgery with: :exception
    include ApplicationHelper

    before_action :configure_permitted_parameters, if: :devise_controller?

    protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

    respond_to :html,:json

    def redirect_to(options = {}, response_status = {})
      ::Rails.logger.error("Redirected by #{caller(1).first rescue "unknown"}")
      super(options, response_status)
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name,:avatar, :firebase_registration_token])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :avatar, :firebase_registration_token])
    end

  end

end
