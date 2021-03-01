import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import requests
import time

sns.set()


def convert_datetime_to_season_regression_encoding(datetime):
    winter = (12, 1, 2)
    spring = (3, 4, 5)
    summer = (6, 7, 8)
    fall = (9, 10, 11)

    if datetime.month in winter:
        return 0
    elif datetime.month in spring:
        return 1
    elif datetime.month in summer:
        return 2
    elif datetime.month in fall:
        return 3
    else:
        return -1


def target_preprocessing(dataframe):
    dataframe['BirthDateTime'] = pd.to_datetime(dataframe['BirthDate'], unit='s')

    #     label encoding
    dataframe['SeasonRegressionEncoding'] = 0
    dataframe['SeasonRegressionEncoding'] = dataframe['BirthDateTime'].apply(
        lambda datetime: convert_datetime_to_season_regression_encoding(datetime))

    #     Frank-Hal encoding
    dataframe['SeasonFrankHalEncodingSpring'] = 0
    dataframe['SeasonFrankHalEncodingSummer'] = 0
    dataframe['SeasonFrankHalEncodingFall'] = 0

    for ind in range(len(dataframe.index)):
        if dataframe.loc[ind, 'SeasonRegressionEncoding'] == 1:
            dataframe.loc[ind, 'SeasonFrankHalEncodingSpring'] = 1
        elif dataframe.loc[ind, 'SeasonRegressionEncoding'] == 2:
            dataframe.loc[ind, 'SeasonFrankHalEncodingSpring'] = 1
            dataframe.loc[ind, 'SeasonFrankHalEncodingSummer'] = 1
        elif dataframe.loc[ind, 'SeasonRegressionEncoding'] == 3:
            dataframe.loc[ind, 'SeasonFrankHalEncodingSpring'] = 1
            dataframe.loc[ind, 'SeasonFrankHalEncodingSummer'] = 1
            dataframe.loc[ind, 'SeasonFrankHalEncodingFall'] = 1
    return dataframe


def get_weather_condition(latitude, longitude, date):
    # These are left blank, in order to run them, you will have to use your own client_id and client_secret
    APP_KEY = ""  # DarkSky APP_KEY

    print(str(latitude) + "|" + str(longitude) + "|" + str(date))

    # create the API request URL
    url = "https://dark-sky.p.rapidapi.com/{},{},{}".format(latitude, longitude, date)
    headers = {"x-rapidapi-key": APP_KEY,
               "x-rapidapi-host": "dark-sky.p.rapidapi.com",
               "useQueryString": "true"}

    # make the GET request
    results = requests.get(url, headers=headers).json()

    return results


def grab_raw_data_from_api(dataframe):
    #     init the feature columns with NaN
    dataframe["sunriseTimeRaw"] = np.nan
    dataframe["sunsetTimeRaw"] = np.nan
    dataframe["moonPhase"] = np.nan
    dataframe["precipIntensityMax"] = np.nan
    dataframe["precipProbability"] = np.nan
    dataframe["precipTypeRaw"] = np.nan
    dataframe["temperatureHigh"] = np.nan
    dataframe["temperatureLow"] = np.nan
    dataframe["dewPoint"] = np.nan
    dataframe["humidity"] = np.nan
    dataframe["windSpeed"] = np.nan
    dataframe["cloudCover"] = np.nan
    dataframe["uvIndex"] = np.nan
    dataframe["visibility"] = np.nan

    #     make api calls to get raw data for each lat, long, date combo, store data in the proper columns
    for ind in dataframe.index:
        result_work_with = get_weather_condition(dataframe.loc[ind, 'Latitude'], dataframe.loc[ind, 'Longitude'],
                                               dataframe.loc[ind, 'BirthDate'])
        daily = result_work_with.get('daily', None)

        if daily != None:
            dataframe.loc[ind, 'sunriseTimeRaw'] = result_work_with['daily']['data'][0].get('sunriseTime', np.nan)
            dataframe.loc[ind, 'sunsetTimeRaw'] = result_work_with['daily']['data'][0].get('sunsetTime', np.nan)
            dataframe.loc[ind, 'moonPhase'] = result_work_with['daily']['data'][0].get('moonPhase', np.nan)
            dataframe.loc[ind, 'precipIntensityMax'] = result_work_with['daily']['data'][0].get('precipIntensityMax',
                                                                                                np.nan)
            dataframe.loc[ind, 'precipProbability'] = result_work_with['daily']['data'][0].get('precipProbability',
                                                                                               np.nan)
            dataframe.loc[ind, 'precipTypeRaw'] = result_work_with['daily']['data'][0].get('precipType', np.nan)
            dataframe.loc[ind, 'temperatureHigh'] = result_work_with['daily']['data'][0].get('temperatureHigh', np.nan)
            dataframe.loc[ind, 'temperatureLow'] = result_work_with['daily']['data'][0].get('temperatureLow', np.nan)
            dataframe.loc[ind, 'dewPoint'] = result_work_with['daily']['data'][0].get('dewPoint', np.nan)
            dataframe.loc[ind, 'humidity'] = result_work_with['daily']['data'][0].get('humidity', np.nan)
            dataframe.loc[ind, 'windSpeed'] = result_work_with['daily']['data'][0].get('windSpeed', np.nan)
            dataframe.loc[ind, 'cloudCover'] = result_work_with['daily']['data'][0].get('cloudCover', np.nan)
            dataframe.loc[ind, 'uvIndex'] = result_work_with['daily']['data'][0].get('uvIndex', np.nan)
            dataframe.loc[ind, 'visibility'] = result_work_with['daily']['data'][0].get('visibility', np.nan)

        #    Being nice and polite when calling external api with a small time delay.
        time.sleep(0.25)

    return dataframe


def sunrise_sunset_clean_up(dataframe):
    #     if dayDuration is nan, then sunrise and/or sunset are nan, which means the triple should all be nan
    dataframe.loc[dataframe["dayDuration"].isna(), "sunriseTimeMinute"] = np.nan
    dataframe.loc[dataframe["dayDuration"].isna(), "sunsetTimeMinute"] = np.nan

    return dataframe


def sunrise_sunset(dataframe):
    #     These are defined from the 0 of the sunrise in minutes, if sunrise is 1/1 23:10 and sunset is 1/2 8:20, then sunriseTimeMinute is 1390, sunsetTimeMinute is 1940 and dayDuration is 550
    dataframe["sunriseTimeMinute"] = np.nan
    dataframe["sunsetTimeMinute"] = np.nan
    dataframe["dayDuration"] = np.nan

    sunrise = pd.to_datetime(dataframe['sunriseTimeRaw'], unit='s')
    sunset = pd.to_datetime(dataframe['sunsetTimeRaw'], unit='s')

    dataframe["sunriseTimeMinute"] = (sunrise.dt.hour * 60) + (sunrise.dt.minute)
    dataframe["dayDuration"] = (sunset - sunrise) / np.timedelta64(1, 'm')
    dataframe["sunsetTimeMinute"] = dataframe["sunriseTimeMinute"] + dataframe["dayDuration"]

    dataframe = sunrise_sunset_clean_up(dataframe)

    return dataframe


def temperature_clean_up(dataframe):
    #     if temperatureChange is nan, then temperaturehigh and/or temperaturelow are nan, which means the triple should be nan
    dataframe.loc[dataframe["temperatureChange"].isna(), "temperatureHigh"] = np.nan
    dataframe.loc[dataframe["temperatureChange"].isna(), "temperatureLow"] = np.nan

    return dataframe


def temperature_change(dataframe):
    dataframe["temperatureChange"] = np.nan
    dataframe["temperatureChange"] = dataframe["temperatureHigh"] - dataframe["temperatureLow"]
    dataframe = temperature_clean_up(dataframe)

    return dataframe


def precip_type_clean_up(dataframe):
    #     From what I can tell, if either intensitymax or probability is 0, the other will be 0 as well. If both of them are 0, that means it's not raining or snowing
    dataframe.loc[
        (dataframe['precipIntensityMax'] == 0) & (dataframe['precipProbability'] == 0), 'precipTypeRaw'] = "None"

    return dataframe


def precip_type_one_hot(dataframe):
    dataframe = precip_type_clean_up(dataframe)

    precipTypeOnehot = pd.get_dummies(dataframe['precipTypeRaw'], prefix="PrecipType", prefix_sep="_")
    dataframe = pd.merge(dataframe, precipTypeOnehot, left_index=True, right_index=True)

    return dataframe


def clean_up_cloud_cover_uvindex_visibility(dataframe):
    dataframe.loc[(dataframe["cloudCover"].isna()) | (dataframe["visibility"].isna()), "uvIndex"] = np.nan
    dataframe.loc[dataframe["uvIndex"].isna(), "cloudCover"] = np.nan
    dataframe.loc[dataframe["uvIndex"].isna(), "visibility"] = np.nan

    return dataframe


def clean_up_all_nan(dataframe):
    #     sunrise and sunset, in my opinion, is the most important feature in determining the season, so if either is missing, the record is usually completely missing; even if it wasn't I consider it to be completely
    #     missing, thus I delete those records from the dataset. If either sunrise or sunset is nan, then dayDuration would be nan.
    #     upon further data exploration, I need to delete records where precipIntensityMax, precipProbability, precipTypeRaw, temperatureChange, cloudCover, uvIndex, visibility, dayDuration have nan, see explanation below

    featureTup = (
    "precipIntensityMax", "precipProbability", "precipTypeRaw", "temperatureChange", "cloudCover", "uvIndex",
    "visibility", "dayDuration")

    for feature in featureTup:
        dataframe = dataframe.loc[dataframe[feature].notna()]

    return dataframe


def impute_nan(dataframe):
    #     the following features are not related to other features: moonPhase, dewPoint, humidity, windSpeed. They are all numerical features, so if there are any nan, they should be replaced with the average

    featureTup = ("moonPhase", "dewPoint", "humidity", "windSpeed")

    for feature in featureTup:
        average = dataframe[feature].mean()
        dataframe.loc[dataframe[feature].isna(), feature] = average

    return dataframe


def feature_preprocessing_raw_data(dataframe):
    dataframe = sunrise_sunset(dataframe)
    dataframe = temperature_change(dataframe)
    dataframe = precip_type_one_hot(dataframe)
    dataframe = clean_up_cloud_cover_uvindex_visibility(dataframe)
    dataframe = clean_up_all_nan(dataframe)
    dataframe = impute_nan(dataframe)

    return dataframe


def show_correlation_heatmap_matrix(dataframe, featureList):
    features = dataframe[featureList]
    plt.figure(figsize=(20, 20))
    cor = features.corr()
    sns.heatmap(cor, annot=True, cmap=plt.cm.Reds)
    plt.show()

    return
