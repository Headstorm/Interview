import pandas as pd
import datetime
Winter=[12,1,2]
Summer=[6,7,8]
Spring=[3,4,5]
Fall=[9,10,11]
colNames = ["Latitude", "Longitude", "Birth_Date"]
data=pd.read_csv('challenges/data/birthdays.csv', names=colNames, header=0)
df=pd.DataFrame()
for row in data.itertuples():
    date=datetime.datetime.fromtimestamp(row.Birth_Date)
    mnth=date.month
    dt=date.day
    if mnth in Summer:
      df=df.append({'Latitude':row.Latitude,'Longitude':row.Longitude,'Birth_Date':row.Birth_Date, 'Season':'Summer'}, ignore_index=True)
    elif mnth in Winter:
      df=df.append({'Latitude':row.Latitude,'Longitude':row.Longitude,'Birth_Date':row.Birth_Date, 'Season':'Winter'}, ignore_index=True)
    elif mnth in Spring:
      df=df.append({'Latitude':row.Latitude,'Longitude':row.Longitude,'Birth_Date':row.Birth_Date, 'Season':'Spring'}, ignore_index=True)
    elif mnth in Fall:
      df=df.append({'Latitude':row.Latitude,'Longitude':row.Longitude,'Birth_Date':row.Birth_Date, 'Season':'Fall'}, ignore_index=True)
#print(df)
df.to_csv("challenges/data/result_birthday_season.csv",index = False)
