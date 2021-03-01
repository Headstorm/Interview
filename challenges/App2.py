import pandas as pd
import importlib
useful = importlib.import_module("useful")

df_input = pd.read_csv("data/full_processed_data.csv")

print(df_input["SeasonRegressionEncoding"].value_counts())
