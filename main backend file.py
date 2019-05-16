
from bottle import Bottle, run, request, template


app = Bottle()

@app.route('/', method = 'POST')
def post_redirect():
    global data
    data = request.json
    data = data['vals']
    allints = True
    for item in data:
        if not item.isnumeric():
            allints = False
    if allints:
        if len(data) == 500:
            data.sort()
            return "success"
        else:
            
            if len(data) < 500:
                data = ["less than 500 integers - zach"]
                return "length is less than 500 integers - zach"
            
            else:
                data = ["greater than 500 integers - zach"]
                return "length is more than 500 integers - zach"
    else:
        data = ["not all of the data consists of integers -zach"]
        return "not all of the data consists of integers -zach"
@app.route('/', method = 'Get')
def get_redirect():
    ret_str = ""
    for i in data:
        ret_str += i + " "
    return ret_str

run(app, host = 'localhost', port = 8080)