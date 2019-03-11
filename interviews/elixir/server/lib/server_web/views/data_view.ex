defmodule ServerWeb.DataView do
  use ServerWeb, :view

  def render("show.json", %{"list" => data}) do
    %{list: data}
  end
end
