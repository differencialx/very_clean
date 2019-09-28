source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 6.0.0'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'sass-rails', '~> 6.0'
gem 'uglifier', '>= 1.3.0'
gem 'rake', '< 11.0'

gem 'coffee-rails', '~> 5.0.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.4.4', require: false
gem "nokogiri", ">= 1.10.4"

gem 'trailblazer-rails'
gem 'reform-rails'
gem 'dry-validation', '0.11.1'
gem 'jsonapi-rails'
gem 'simple_endpoint', '~> 0.1.2'

gem 'sidekiq'

gem 'jwt_sessions'
gem 'redis'
gem 'rack-cors'

# gem 'jwt'

gem 'pundit'
gem 'acts_as_list'

gem 'webpacker', '~> 3.6'

gem "aws-sdk-s3", require: false

group :development, :test do
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'ffaker'
  gem 'rspec-rails', '~> 3.8.1', require: false
  gem 'factory_bot_rails'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'database_cleaner'
  gem 'airborne', '0.2.13'
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'webdrivers', '~> 3.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
