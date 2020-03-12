from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class RNListAPI(Resource):

    def get(self):
        # provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.
        msg, code, sorted_list = self.read_from_file()
        if code == 200:
            msg = sorted_list
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
            if code == 200:
                json_list.sort()
                msg, code = self.write_to_file(json_list)
        except:
            msg = "ERROR: Submit JSON object with syntax { \"list:\" [ int, int, ... ] }"
            code = 400
        return {"message": msg}, code

    def patch(self):
        # allows insertion of a single number into the list which gets placed in the proper order.
        try:
            json_data = request.get_json(force=True)
            json_number = json_data["number"]
            if isinstance(json_number, int):
                msg, code, sorted_list = self.read_from_file()
                if code == 200:
                    try:
                        sorted_list = list(map(int, sorted_list))
                        sorted_list.append(json_number)
                        sorted_list.sort()
                        msg, code = self.write_to_file(sorted_list)
                    except:
                        msg = "ERROR: failed to convert str to int"
                        code = 500
            else:
                msg = "ERROR: number must be an int"
                code = 400
        except:
            msg = "ERROR: Submit JSON object with syntax {\"number\": int }"
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

    def write_to_file(self, rn_list):
        try:
            with open("resources/500_rn_sorted_list.txt", "w") as list_file:
                for item in rn_list:
                    list_file.write("%s\n" % item)
            msg = "SUCCESS"
            code = 200
        except:
            msg = "ERROR: There was an error writing list to file"
            code = 500
        return msg, code

    def read_from_file(self):
        try:
            sorted_list = []
            with open("resources/500_rn_sorted_list.txt", "r") as list_file:
                for line in list_file:
                    sorted_list.append(int(line[:-1]))
            msg = "SUCCESS"
            code = 200
        except:
            msg = "ERROR: Please submit list first with POST"
            code = 500
        return msg, code, sorted_list


api.add_resource(RNListAPI, '/data', endpoint='data')

if __name__ == '__main__':
    app.run(debug=True)
