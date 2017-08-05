source 'https://rubygems.org'


### CORE ###

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', group: :doc


### FRONTEND - CORE ###

# Other template engine
gem 'slim'

### FRONTEND - JS ###

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Embed the V8 JavaScript interpreter into Ruby.
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'


### FRONTEND - CSS ###

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails'

gem 'sass-rails'
### DATABASE ###

#Use of postgresql
gem 'pg'



### DEPLOYMENT ###

group :development do
  gem 'capistrano'
  gem 'capistrano-rails'
end

# Use Unicorn as the app server
gem 'unicorn'


### SECURITY ###

# User authentication
gem 'devise'
gem 'devise_token_auth'

# User authorization
gem 'cancan'

# Use ActiveModel has_secure_password
gem 'bcrypt'


### THIRD-PARTY ###

#Mapbox-Rails
# gem 'mapbox-rails'

# Access an IRB console on exception pages or by using <%= console %> in views
gem 'web-console', group: :development


### TESTING ###

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'


  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'

  # BDD
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'guard-rspec'
  gem 'spring-commands-rspec'
  gem 'vcr'
  gem 'rails-controller-testing'

end

### DOCUMENTATION ###

# Automatic documentation based on RSpec specs examples.
gem 'rspec_api_documentation'
# Documentation Viewer
# gem 'apitome'


# Logging
gem 'awesome_print'

# Coverage
gem 'simplecov', :require => false, :group => :test

# http://blog.zeit.io/use-a-fake-db-adapter-to-play-nice-with-rails-assets-precompilation/
gem 'activerecord-nulldb-adapter'

# Use bower repository.
source 'https://rails-assets.org' do
  gem 'rails-assets-leaflet', '~> 0.7.7'
  gem 'rails-assets-leaflet-ajax'
  gem 'rails-assets-leaflet-routing-machine'
  gem 'rails-assets-lrm-graphhopper'
end

# PostGis
gem 'activerecord-postgis-adapter'
gem 'rgeo'
gem 'rgeo-shapefile'
gem 'rgeo-geojson'

# Sidekiq
gem 'sidekiq'
gem 'sidekiq-cron'

# Zip
gem 'zipruby'

# Paperclip
gem 'paperclip'

# AWS
gem 'aws-sdk-v1'


#### ADMIN #####

gem 'activeadmin'