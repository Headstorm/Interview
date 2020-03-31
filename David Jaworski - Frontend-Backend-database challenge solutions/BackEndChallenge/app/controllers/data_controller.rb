class DataController < ApplicationController

  def create
    numbers = Number.find(1)
    numbers.update(data: params[:data])
    if numbers.data.length == 500 && numbers.data.all? {|num| num.is_a? Integer}
      render json: numbers.data
    elsif params[:data].length !=500
      render json: "You're list must be 500 in length, no more no less"
    else
      render json: "Every element in the list must be a number"
    end
    
  end

  def index
    numbers = Number.find(1)
    render json: numbers.data.length> 0 ? numbers.data.sort : "You need to send a list of 500 numbers first"
  end

  def update
    numbers = Number.find(1)
    new_num = params[:newNum]
      if numbers.data.length > 0 
        numbers.update({data: numbers.data.insert(0, new_num)})
      end
      render json: numbers.data.length > 0 ? numbers.data.sort : "You need to send a list of 500 numbers first"

  end
end