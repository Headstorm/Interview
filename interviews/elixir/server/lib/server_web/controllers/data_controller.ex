defmodule ServerWeb.DataController do
  use ServerWeb, :controller

  def index(conn, _) do
    { _, list } = Server.NumberStorage.get_list() |> Poison.encode()

    conn
      |> send_resp(200, list)
  end

  def create(conn, %{ "data" => data }) do
    { _, list } = Poison.decode(data)

    { status, body } = insert_list(list)

    IO.inspect body
    conn
      |> send_resp(status, body)
  end

  # Adds list to storage iff the list is 500 ints long and is a valid list
  def insert_list(list) when is_list(list) and length(list) == 500 do
    list
      |> Enum.sort()
      |> Server.NumberStorage.add_list()

    { :ok, "List updated"}
  end

  # Returns error and the list iff the posted list is invalid
  def insert_list(list) do
    { _, encoded_list } = list |> Poison.encode()

    { :bad_request, encoded_list }
  end

  def update(conn, %{ "num" => num }) do
    num
      |> String.to_integer()
      |> Server.NumberStorage.add_num()

    conn
      |> send_resp(:ok, "Number added")
  end
end
