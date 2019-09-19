Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post '/sign_in', to: 'users#sign_in'
      post '/sign_up', to: 'users#sign_up'
      resources :projects, only: %i[index create update destroy] do
      end
    end
  end
end
