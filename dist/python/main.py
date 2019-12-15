#!/usr/bin/python3

'''
generate a simple iteration scheme with matplot
'''

import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
figure(num=None, figsize=(8, 6), dpi=200, facecolor='w', edgecolor='k')

# data after making some user tests
resultat = [
    { 'name': 'F1', 'connaissance': 6, 'suggestions': 3, 'note_globale': 7 },
    { 'name': 'M1', 'connaissance': 8, 'suggestions': 4, 'note_globale': 8 },
    { 'name': 'A1', 'connaissance': 6, 'suggestions': 1, 'note_globale': 7 },
    { 'name': 'S1', 'connaissance': 3, 'suggestions': 1, 'note_globale': 9 },
    { 'name': 'M2', 'connaissance': 4, 'suggestions': 0, 'note_globale': 10  }
]

# intialize the lists
y1 = []
y2 = []
lenght_of_result = (len(resultat)+1)

# x1 = is the version
x1 = list(range(1, lenght_of_result))

for x in range(lenght_of_result-1):
    y1.append(resultat[x]['suggestions'])
    y2.append(resultat[x]['note_globale'])

plt.plot(x1, y1, 'o-', color='blue', linewidth=2, label="Nombre de suggestions")
plt.plot(x1, y2, 'o-', color='green', linewidth=2, label="Note globale")
plt.xticks(range(1, len(x1)) ,x1)

plt.title('Schéma d\'itération')
plt.ylabel('Nombre de suggestions & Note globale')
plt.xlabel('Version')
plt.legend()

# plt.show()

plt.savefig("./dist/python/Figure_1.png")
