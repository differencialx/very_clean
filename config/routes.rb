Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post '/sign_in', to: 'users#sign_in'
      post '/sign_up', to: 'users#sign_up'
      resources :projects, only: %i[index create update destroy] do
        resources :tasks, only: %i[index create update destroy], shallow: true do
          member do
            put 'move_higher'
            put 'move_lower'
          end
        end
      end
    end
  end
end
