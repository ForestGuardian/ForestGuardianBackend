Rails.application.routes.draw do
  resources :contact_messages
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  require 'sidekiq/web'

  devise_for :users

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'users', skip: [:omniauth_callbacks]
    end
  end

  resources :users, only: [:show]

  # map views
  get 'maps/windy' => 'maps#windy'
  get 'maps/web' => 'maps#web'
  get 'about' => 'static_pages#about'

  # modis data
  post 'modis_data/fires' => 'modis_data#fires'

  resources :reports
  resources :contact_messages, only: [:create, :new]

  require 'sidekiq/web'
  require 'sidekiq/cron/web'
  mount Sidekiq::Web => '/sidekiq'


  root 'maps#web'
end
