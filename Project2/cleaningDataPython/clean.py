import pandas as pd
import numpy as np

merged = pd.read_csv('merged.csv')

continentsAverage = pd.DataFrame(columns = ['continent', 'averageCorruption', 'averageFreedom', 'averageGDP', 'averageHappiness',
'averageSafeness', 'averageTemperature'])

europeCorruptionAverage = round(merged.query("continent == 'Europe'")['corruption'].mean(), 2)
asiaCorruptionAverage = round(merged.query("continent == 'Asia'")['corruption'].mean(), 2)
NACorruptionAverage = round(merged.query("continent == 'North America'")['corruption'].mean(), 2)
SACorruptionAverage = round(merged.query("continent == 'South America'")['corruption'].mean(), 2)
africaCorruptionAverage = round(merged.query("continent == 'Africa'")['corruption'].mean(), 2)
oceaniaCorruptionAverage = round(merged.query("continent == 'Oceania'")['corruption'].mean(), 2)

europeFreedomAverage = round(merged.query("continent == 'Europe'")['humanFreedom'].mean(), 2)
asiaFreedomAverage = round(merged.query("continent == 'Asia'")['humanFreedom'].mean(), 2)
NAFreedomAverage = round(merged.query("continent == 'North America'")['humanFreedom'].mean(), 2)
SAFreedomAverage = round(merged.query("continent == 'South America'")['humanFreedom'].mean(), 2)
africaFreedomAverage = round(merged.query("continent == 'Africa'")['humanFreedom'].mean(), 2)
oceaniaFreedomAverage = round(merged.query("continent == 'Oceania'")['humanFreedom'].mean(), 2)

europeGDPAverage = round(merged.query("continent == 'Europe'")['gdppc'].mean(), 2)
asiaGDPAverage = round(merged.query("continent == 'Asia'")['gdppc'].mean(), 2)
NAGDPAverage = round(merged.query("continent == 'North America'")['gdppc'].mean(), 2)
SAGDPAverage = round(merged.query("continent == 'South America'")['gdppc'].mean(), 2)
africaGDPAverage = round(merged.query("continent == 'Africa'")['gdppc'].mean(), 2)
oceaniaGDPAverage = round(merged.query("continent == 'Oceania'")['gdppc'].mean(), 2)

europeHappinessAverage = round(merged.query("continent == 'Europe'")['happiness'].mean(), 2)
asiaHappinessAverage = round(merged.query("continent == 'Asia'")['happiness'].mean(), 2)
NAHappinessAverage = round(merged.query("continent == 'North America'")['happiness'].mean(), 2)
SAHappinessAverage = round(merged.query("continent == 'South America'")['happiness'].mean(), 2)
africaHappinessAverage = round(merged.query("continent == 'Africa'")['happiness'].mean(), 2)
oceaniaHappinessAverage = round(merged.query("continent == 'Oceania'")['happiness'].mean(), 2)

europeHealthCareAverage = round(merged.query("continent == 'Europe'")['healthcareRank'].mean(), 2)
asiaHealthCareAverage = round(merged.query("continent == 'Asia'")['healthcareRank'].mean(), 2)
NAHealthCareAverage = round(merged.query("continent == 'North America'")['healthcareRank'].mean(), 2)
SAHealthCareAverage = round(merged.query("continent == 'South America'")['healthcareRank'].mean(), 2)
africaHealthCareAverage = round(merged.query("continent == 'Africa'")['healthcareRank'].mean(), 2)
oceaniaHealthCareAverage = round(merged.query("continent == 'Oceania'")['healthcareRank'].mean(), 2)

europeSafenessAverage = round(merged.query("continent == 'Europe'")['safeness'].mean(), 2)
asiaSafenessAverage = round(merged.query("continent == 'Asia'")['safeness'].mean(), 2)
NASafenessAverage = round(merged.query("continent == 'North America'")['safeness'].mean(), 2)
SASafenessAverage = round(merged.query("continent == 'South America'")['safeness'].mean(), 2)
africaSafenessAverage = round(merged.query("continent == 'Africa'")['safeness'].mean(), 2)
oceaniaSafenessAverage = round(merged.query("continent == 'Oceania'")['safeness'].mean(), 2)

europeTemperatureAverage = round(merged.query("continent == 'Europe'")['averageTemperature'].mean(), 2)
asiaTemperatureAverage = round(merged.query("continent == 'Asia'")['averageTemperature'].mean(), 2)
NATemperatureAverage = round(merged.query("continent == 'North America'")['averageTemperature'].mean(), 2)
SATemperatureAverage = round(merged.query("continent == 'South America'")['averageTemperature'].mean(), 2)
africaTemperatureAverage = round(merged.query("continent == 'Africa'")['averageTemperature'].mean(), 2)
oceaniaTemperatureAverage = round(merged.query("continent == 'Oceania'")['averageTemperature'].mean(), 2)

continentsAverage['continent'] = ['Europe', 'Asia', 'Africa', 'NorthAmerica', 'SouthAmerica', 'Oceania']
continentsAverage['averageCorruption'] = [europeCorruptionAverage, asiaCorruptionAverage, africaCorruptionAverage, NACorruptionAverage, SACorruptionAverage, oceaniaCorruptionAverage]
continentsAverage['averageFreedom'] = [europeFreedomAverage, asiaFreedomAverage, africaFreedomAverage, NAFreedomAverage, SAFreedomAverage, oceaniaFreedomAverage]
continentsAverage['averageGDP'] = [europeGDPAverage, asiaGDPAverage, africaGDPAverage, NAGDPAverage, SAGDPAverage, oceaniaGDPAverage]
continentsAverage['averageHappiness'] = [europeHappinessAverage, asiaHappinessAverage, africaHappinessAverage, NAHappinessAverage, SAHappinessAverage, oceaniaHappinessAverage]
continentsAverage['averageHealthCare'] = [europeHealthCareAverage, asiaHealthCareAverage, africaHealthCareAverage, NAHealthCareAverage, SAHealthCareAverage, oceaniaHealthCareAverage]
continentsAverage['averageSafeness'] = [europeSafenessAverage, asiaSafenessAverage, africaSafenessAverage, NASafenessAverage, SASafenessAverage, oceaniaSafenessAverage]
continentsAverage['averageTemperature'] = [europeTemperatureAverage, asiaTemperatureAverage, africaTemperatureAverage, NATemperatureAverage, SATemperatureAverage, oceaniaTemperatureAverage]


continentsAverage.to_csv('averages2.csv')
# print(continentsAverage)

# merged['safeness'] = merged['safeness'].apply(lambda x: round(x, 2))
# merged['happiness'] = merged['happiness'].apply(lambda x: round(x, 2))
# # merged['corruption'] = merged['corruption'].astype('int')
# # merged['healthcareRank'] = merged['healthcareRank'].fillna(0).astype('int')
# # merged['gdppc'] = merged['gdppc'].astype('int')
# merged.drop('Unnamed: 0', axis=1, inplace=True)
#
# merged['worldCorruptionRank'] = merged['corruption'].rank(ascending=False, method='first')
# merged['worldFreedomRank'] = merged['humanFreedom'].rank(ascending=False, method='first')
# merged['worldGDPRank'] = merged['gdppc'].rank(ascending=False, method='first')
# merged['worldHappinessRank'] = merged['happiness'].rank(ascending=False, method='first')
# merged['worldSafenessRank'] = merged['safeness'].rank(ascending=True, method='first')
# merged['worldTemperatureRank'] = merged['averageTemperature'].rank(ascending=False, method='first')
#
# aux = merged.sort_values(by=['country'])
#
# aux['continentCorruptionRank'] = aux.groupby('continent')['corruption'].rank(ascending=False, method='first')
# aux['continentFreedomRank'] = aux.groupby('continent')['humanFreedom'].rank(ascending=False, method='first')
# aux['continentGDPRank'] = aux.groupby('continent')['gdppc'].rank(ascending=False, method='first')
# aux['continentHappinessRank'] = aux.groupby('continent')['happiness'].rank(ascending=False, method='first')
# aux['continentHealthcareRank'] = aux.groupby('continent')['healthcareRank'].rank(ascending=True, method='first')
# aux['continentSafenessRank'] = aux.groupby('continent')['safeness'].rank(ascending=True, method='first')
# aux['continentTemperatureRank'] = aux.groupby('continent')['averageTemperature'].rank(ascending=False, method='first')
#
# aux.to_csv('big2.csv')
# print(aux)
