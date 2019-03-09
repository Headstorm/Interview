defmodule DataController do
  use ServerWeb, :controller

  def index(conn, %{ "data" => data }) do
     res = data
      |> Map.to_list
      |> Enum.sort()

    conn
      |> render(ServerWeb.DataView, "data.json", %{ "data" => res })
  end

  def create(conn, %{ "data" => data }) do

  end

  def update(res, req) do

  end
end
