Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/form", to: 'form#index'
  get "/data", to: 'data#index'
  post "/data", to: 'data#create'
  patch "/data", to: 'data#update'
end
