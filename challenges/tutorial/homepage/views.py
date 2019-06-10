from django.shortcuts import *
from django.conf import settings
from pdb import set_trace as bp
import requests
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import *
import numpy,pandas
from .models import *
from sqlalchemy import create_engine


def loadNosqlJsonInDB(request): #reads json file and loads data to record table in postgres db
    context={'status':'unknown'};print('loadNosqlJsonInDB')

    json=pandas.read_json('/home/aseem/Dropbox/job applications/Headstorm/Nosql.json') #read json
    json['cellphone']=json['cellphone'].str.replace("[^0-9]",'') #making sure phone only has numeric values
    json['workphone']=json['workphone'].str.replace("[^0-9]",'')
    json['recordId'].astype('int')
    json['basicWidgetOrder'].astype('int')
    json['advancedWidgetOrder'].astype('int')

    engine=create_engine('postgresql+psycopg2://user1:password@localhost/headstorm')
    json.to_sql('homepage_record', engine,if_exists='append',index=False) #keep structure of table intact, just insert new rows
    context={'status':'success'}

    return JsonResponse(context)

def dataArray(request):
    context={'status':'unknown'};
    if request.method == 'POST':
        data = JSONParser().parse(request) #converting json to dict
        serializer = fiveHundredNumbersListSerializer(data=data);
        if serializer.is_valid(): #automatically checks for all constraits set in DB model
            #check if data length = 500 . If its Int is being checked by serializer automatically based on DB IntegerField constraint
            if len(serializer.validated_data.get('intArray'))==500: #if len ==500
                serializer.save(); print('serializer validated & data saved') #saves to db
                context['status']='success';
            else:
                context['status']='Failed';
        else:
            context['status']='Failed';
    elif request.method=='GET': #return most recent array of 500 numbers from DB
        print('get method');
        obj = fiveHundredNumbersList.objects.latest('id')
        serializer = fiveHundredNumbersListSerializer(obj);print('serializer.data=',serializer.data);
        serializer.data.get('intArray').sort() #ascending ordered list
        context['getData']=serializer.data.get('intArray') ; print('context=',context)
        context['status']='success';
    elif request.method=='PATCH': #return most recent array of 500 numbers from DB
        data = JSONParser().parse(request) #converting json to dict
        print('Patch method. \nrandomNumber=',data['randomNumber'])
        obj = fiveHundredNumbersList.objects.latest('id') #get the latest 500 int array from db
        serializer = fiveHundredNumbersListSerializer(obj);print('serializer.data=',serializer.data);
        serializer.data.get('intArray').append(data['randomNumber']) #append the random number sent from frontend to out latest list
        serializer.data.get('intArray').sort() # order ascending
        context['patchData']=serializer.data.get('intArray') ; print('context=',context)
        context['status']='success';

    return JsonResponse(context)

def homepage(request):
    print('homepage view')
    context={'site_key': settings.RECAPTCHA_SITE_KEY,'status':''}
    context['formData']={'name':'','email':''
                        , 'message':''}

    if request.POST: #contact submit button was pressed
        token=request.POST.get('captchToken') #token send by google captcha
        print('captchToken=',token);

        # captcha verification
        data = {
            'response': token,
            'secret': settings.RECAPTCHA_SECRET_KEY
        }
        resp = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
        result_json = resp.json()

        print('result_json=',result_json)

        if result_json.get('success'):
            context['status']='success'
            context['formData']={'name':request.POST.get('name'),'email':request.POST.get('email')
                                , 'message':request.POST.get('message')}
        else:
            context['status']='failed' #captcha says user is robot


    return render(request,'homepage/homepage.html',context)
