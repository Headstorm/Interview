defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ServerWeb do
    pipe_through :api

    get "/data", DataController, :index
    post "/data", DataController, :create
    patch "/data", DataController, :update
  end
end
