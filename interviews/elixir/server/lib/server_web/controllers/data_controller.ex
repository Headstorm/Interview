defmodule ServerWeb.DataController do
  use ServerWeb, :controller

  def index(conn, %{"data" => data}) do
    { status, list } = Poison.decode(data)

     res = list
      |> Map.to_list
      |> Enum.sort()

    conn
      |> render(ServerWeb.DataView, "show.json", %{ "list" => res })
  end

  def create(conn, %{ "data" => data }) do

  end

  def update(res, req) do

  end
end
