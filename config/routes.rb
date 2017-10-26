Rails.application.routes.draw do
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
  #get 'modis_data/fires' => 'modis_data#fires'
  post 'modis_data/fires' => 'modis_data#fires'

  resources :reports

  require 'sidekiq/web'
  require 'sidekiq/cron/web'
  mount Sidekiq::Web => '/sidekiq'


  root 'maps#web'
end
