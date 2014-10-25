import pandas as pd
import matplotlib.pyplot as plt
import re
set = pd.read_csv('file.csv')
filtered = []
for idx, record in set['userid'].iteritems():
    print idx
    m = re.match(r".+03.+",record)
    if not m:
        filtered.append(idx)
newset = set.drop(filtered)
plt.figure(1)
l0, = plt.plot(newset['survey0-answer4'],label='l0')
l1, = plt.plot(newset['survey1-answer4'],label='l1')
l2, = plt.plot(newset['survey2-answer4'],label='l2')
l3, = plt.plot(newset['survey3-answer4'],label='l3')
plt.legend([l0,l1,l2,l3])
plt.show()

