from flask import jsonify, request
from werkzeug import exceptions
import random
import json


class Storage(object):
	def __init__(self):
		self._data = []
		self._seq = []
		self.is_dict = False

	@property
	def data(self):
		return self._data

	@data.setter
	def data(self, values):
		self._data = values
		if isinstance(values, dict):
			self.is_dict = True
		else:
			self.is_dict = False

	@property
	def seq(self):
		if self.is_dict:
			# todo: fix this call, change to as_list
			return list(self.data.values())[0]
		else:
			return self.data

	def __str__(self):
		return str(self._data)

	def __repr__(self):
		return self._data


class Data(object):
	"""
	object managing the data found at the '/data' endpoint.
	includes test, get, set, validate, and patch functions.
	"""
	# data is initially empty
	values = Storage()

	@classmethod
	def get_data(cls):
		"""
		called by a GET request. gets the json object data if it exists. otherwise raises an error.
		:return: the data found at the endpoint if it exists and a 200 response code
		"""
		if not cls.values.data or cls.values.data == [[]]:
			raise exceptions.NotFound("There's no data here yet!")
		else:
			return jsonify(cls.values.data), 200

	@classmethod
	def set_data(cls, new_request: request):
		"""
		takes data passed from a pPOST request, calls validation functions, and sets the data if it's valid
		:param new_request: a flask request called by the POST function
		:return: if the data is valid, returns the sorted, valid data and a 201 response code
		"""
		# does the post have a json param:
		if new_request.is_json is False:
			raise exceptions.BadRequest("Data must be a JSON formatted object.")
		# get the JSON from the request
		new_data, is_dict = cls.validate_type(new_request)

		if is_dict:
			for key, numbers in new_data.items():
				new_data[key] = cls.validate_numbers(numbers)
			cls.values.data = new_data
		else:
			cls.values.data = cls.validate_numbers(new_data)

		# return to flask response object, type json
		return jsonify(cls.values.data), 201

	@classmethod
	def validate_type(cls, new_request):
		# does the post have a json param:
		if new_request.is_json is False:
			raise exceptions.BadRequest("Data must be a JSON formatted object.")
		# get the JSON from the request
		new_data = new_request.get_json()

		# check type: dict
		if isinstance(new_data, dict):
			if len(new_data.keys()) == 1:
				is_dict = True
			else:
				raise exceptions.BadRequest(
					"JSON is in incorrect format. Object must have either 0 or 1 keys and a 500-length array.")
		# check type: list
		elif isinstance(new_data, list):
			is_dict = False
		# raise for unaccounted-for formatting
		else:
			raise exceptions.BadRequest(
				"Something is wrong with the data."
				"Please reformat the data as a JSON object with 0 or 1 keys, and a 500-length array of numbers.")

		return new_data, is_dict

	@staticmethod
	def validate_numbers(numbers):
		"""
		checks if the array sent contains 500 numbers amd raises an error if the data is invalid
		:param numbers: a list of data that should be numbers
		:returns: if there are no errors, returns a list of numbers sorted by value
		"""
		if len(numbers) != 500:
			raise exceptions.BadRequest("Wrong length.")
		# validate: list content
		else:
			flag_good = True
			for i in range(len(numbers)):
				if not isinstance(numbers[i], (int, float)):
					flag_good = False
					raise exceptions.BadRequest("Values must be numbers.")
			# set data if valid
			# todo: deal with data_key
			if flag_good is True:
				return sorted(numbers)

	@classmethod
	def patch_data(cls, patch: request):
		"""
		patches the array in values.data with a random number,
		and removes the largest number from the list.
		there is likely a cleaner way to make this function,
		but this prevents assignment of data via values.seq.
		:param patch:
		:return: a json object of the new data and response code 204
		"""
		# raises an error if there's no data present
		if not cls.values.data or cls.values.data == [[]]:
			raise exceptions.NotFound("There's no data here yet!")
		# gets the array, removes the highest value, and appends a new random int
		else:
			new_data = cls.values.seq
			del new_data[499]
			new_data.append(random.randint(-1000, 1000))
			# reassigns the data if dict
			if cls.values.is_dict:
				for key, val in cls.values.data.items():
					cls.values.data[key] = sorted(new_data)
			# reassigns the data if list
			else:
				cls.values.data = sorted(new_data)
		return jsonify(cls.values.data), 204

	@classmethod
	def delete_data(cls):
		"""
		a function to delete the data at the endpoint. used in testing
		:return: the empty data in json format and a 204 response code
		"""
		cls.values.data = [[]]
		return jsonify(cls.values.data), 204
