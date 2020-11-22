# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, QueryDict
from django.views.decorators.csrf import csrf_exempt

import json, re

@csrf_exempt
def index(request):

    # Check if the request type
    if request.method == 'POST':
        
        # Retrieve the data from the json file 
        raw_data = request.FILES['jsondata'].chunks()
        data = ''
        for rd in raw_data:
            data = rd
        # Check if the data is formed correctly 
        try:
            str_data = list(data.decode('utf-8')[2:-2].split(','))
        except Exception as e:
            return JsonResponse({"response":"Malformed Data"})

        flag = 0
        data = []
        # Check if the values in the file are numbers
        for val in str_data:
            if val.strip().isdigit():                
                data.append(int(val.strip()))
            else:
                flag = 1
                break
    
        if flag == 1:
            return JsonResponse({"response":"Data format not a list of numbers"})

        # Check if the length of data is 500
        if len(data) != 500:
            if len(data) < 500:
                return JsonResponse({"response":"Length of data less than 500"})
            return JsonResponse({"response":"Length of Data greater than 500"})
        
        # Add data and sort it
        if 'sorted_data' in request.session:
            request.session['sorted_data'] = sorted(request.session['sorted_data'].extend(data))
        else:
            request.session['sorted_data'] = sorted(data) 

        return JsonResponse({"response":"Success"})

    elif request.method == 'GET':
        # Check if the data exists
        if 'sorted_data' in request.session:
            return JsonResponse({"response":request.session['sorted_data']})
        else:
            return JsonResponse({"response": "No Data Found"})
    
    elif request.method == 'PATCH':
        data = QueryDict(request.body)
        number = data['num']
        # Check if the data sent is a number
        if number.isdigit():
            # Add the number and sort the data
            if 'sorted_data' in request.session:
                request.session['sorted_data'].append(int(number))
                request.session['sorted_data'] = sorted(request.session['sorted_data'])
            else:
                request.session['sorted_data'] = [number]
                
            return JsonResponse({"response":"Success"})
        return JsonResponse({"response":"Invalid input"})