import pandas as pd

big = pd.read_csv('big.csv')

big['healthcareRank'] = big['healthcareRank'].rank(ascending=True, method='first')
big.drop('Unnamed: 0.1', axis=1, inplace=True)
big.drop('Unnamed: 0', axis=1, inplace=True)

big.to_csv('big.csv')
print(big)
