import pandas as pd

fullPerf = pd.read_csv('./data/fullPerf.csv')
fullPerf.sort_values('country', inplace=True)
fullPerf.reset_index(drop=True, inplace=True)

temperature = pd.read_csv('./data/temperature.csv')
temperature.drop(columns=['averageTemperatureF'], inplace=True)

continents = pd.read_csv('./data/continents.csv')

merged = pd.merge(fullPerf, temperature, how="outer")
merged = pd.merge(merged, continents, how="outer")

merged.to_csv('merged.csv')
merged.drop(columns=['Unnamed: 0'], inplace = True)

print(merged)
