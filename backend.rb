require 'sinatra'
require 'json'

$data = {}
$values = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

before do
	content_type 'application/json'
end

get '/numbers/:token' do |token|
		if $data.key?(token)
			$data[token].to_json
		else
			halt 400, {:error => "unkown id token"}.to_json
		end
end

post '/numbers' do
	# we accept json data only
	halt 415 unless request.env['CONTENT_TYPE'] == 'application/json'

	# parse POST vars, put them in tmp array, catch json errors
	begin
		post_vars = JSON.parse(request.body.read)
	rescue JSON::ParserError => e
		halt 400, { error: e.to_s }.to_json
	end

	# Numbers should be sent in a hash form with a key of 'numbers'
	if post_vars.key?('numbers') == false
		halt 400, { error: "Use hash with the key of 'numbers' to send the 500 numbers ({'numbers': [10,3,55,...]})"}.to_json
	end

	tmp = []
	
	for num in post_vars["numbers"] do
		tmp.push(num)
	end

	# must be exactly 500 numbers
	if tmp.length != 500
		halt 400, {error: "Must be exactly 500 numbers, you sent #{tmp.length}, #{tmp}"}.to_json
	end

	tmp = tmp.sort

	# create the unique token to identify this list in the future
	shuffle_values
	token = uid

	while $data.key?(token)
		token = uid
	end

	# store numbers under this token
	$data[token] = tmp

	# tell them where to find the newly created list
	url = "http://localhost:4567/numbers/#{token}"
	response.headers['Location'] = url

	status 201
end

patch '/numbers/:token' do |token|
	# we accept json data only
	halt 415 unless request.env['CONTENT_TYPE'] == 'application/json'

	# check existence of token
	if $data.key?(token) == false
		halt 400, {:error => "unkown id token"}.to_json
	end

	# must have 'number' and 'replacement' data
	begin
		post_vars = JSON.parse(request.body.read)
	rescue JSON::ParserError => e
		halt 400, { error: e.to_s }.to_json
	end

	if post_vars.key?('number') == false or post_vars.key?('replacement') == false
		halt 400, {error: "You must send a 'number' and it's 'replacement' value"}.to_json
	end

	# replace number
	index = binary_search post_vars['number'], $data[token]
	if index > -1
		$data[token][index] = post_vars['replacement']
		$data[token] = $data[token].sort
		{replaced: "#{post_vars['number']}", with: "#{post_vars['replacement']}"}.to_json
	else
		halt 500, {error: "#{post_vars['number']} not found"}.to_json
	end
end

#------------------------------------ functions ----------------------------------
def binary_search target, data
	left = 0
	right = data.length - 1
	target = target.to_i

	while left <= right do
		mid = (right + left) / 2

		if target < data[mid].to_i
			right = mid-1
		
		elsif target > data[mid].to_i
			left = mid+1
		
		else
			return mid

		end

	end

	-1
end

def shuffle_values
	last = $values.length
	while last > 1
		pick = rand(last)
		tmp = $values[last-1]
		$values[last-1] = $values[pick]
		$values[pick] = tmp
		last = last - 1
	end
end

def uid
	last = $values.length
	token = []
	while token.length < 15
		pick = rand(last)
		token.push($values[pick])
	end

	token.join("")
end
