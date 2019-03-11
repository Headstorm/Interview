# Global storage used to store and update the array submitted by the user
defmodule Server.NumberStorage do
  use Agent

  def start_link() do
    Agent.start(fn -> [] end, name: NumberStorage)
  end

  def add_list(new_list) do
    Agent.update(NumberStorage, fn list -> new_list end)
  end

  def get_list() do
    Agent.get(NumberStorage, fn list -> list end)
  end
end
