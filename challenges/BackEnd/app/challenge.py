from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class RNListAPI(Resource):

    def get(self):
        # provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.
        expected_len = 500
        expected_type = int
        try:
            json_data = request.get_json(force=True)
            json_list = json_data["list"]
            msg, code = self.validate_list(
                json_list, expected_len, expected_type)
            if code == 200:
                msg = sorted(json_list)
        except:
            msg = "ERROR: Submit JSON object with syntax { \"list:\" [ int, int, ... ] }"
            code = 400
        return {"message": msg}, code

    def post(self):
        # JSON formatted list of 500 random numbers. The list has to be exactly 500 numbers, if there are more or less than 500 an error must be returned.
        # Similarly, if something other than a list of numbers is submitted, an error must be returned.
        expected_len = 500
        expected_type = int
        try:
            json_data = request.get_json(force=True)
            json_list = json_data["list"]
            msg, code = self.validate_list(
                json_list, expected_len, expected_type)
        except:
            msg = "ERROR: Submit JSON object with syntax { \"list:\" [ int, int, ... ] }"
            code = 400
        return {"message": msg}, code

    def patch(self):
        # allows insertion of a single number into the list which gets placed in the proper order.
        expected_len = 500
        expected_type = int
        try:
            json_data = request.get_json(force=True)
            json_list = json_data["list"]
            json_number = json_data["number"]
            msg, code = self.validate_list(
                json_list, expected_len, expected_type)
            if(code == 200):
                json_list.append(json_number)
                json_list.sort()
                msg = json_list
        except:
            msg = "ERROR: Submit JSON object with syntax { \"list\": [ int, int, ... ], \"number\": int }"
            code = 400
        return {"message": msg}, code

    def validate_list(self, list, expected_len, type):
        msg = None
        code = None
        try:
            actual_len = len(list)
            int_only = all(isinstance(x, type) for x in list)
            if((actual_len == expected_len) and int_only):
                msg = "SUCCESS"
                code = 200
            else:
                msg = "ERROR: The list has to be exactly 500 numbers"
                code = 400
        except:
            msg = "ERROR: Submit JSON object with syntax { \"list:\" [ int, int, ... ] }"
            code = 400
        return msg, code


api.add_resource(RNListAPI, '/data', endpoint='data')

if __name__ == '__main__':
    app.run(debug=True)
