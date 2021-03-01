import pandas as pd
import importlib
useful = importlib.import_module("useful")

df_input = pd.read_csv("data/birthdays.csv")
df_input.columns = ["Latitude", "Longitude", "BirthDate"]

df_input = useful.target_preprocessing(df_input)

df_input_with_raw_data = useful.grab_raw_data_from_api(df_input)

df_input_with_clean_data = useful.feature_preprocessing_raw_data(df_input_with_raw_data)

df_input_with_clean_data.to_csv("data/full_processed_data.csv")
