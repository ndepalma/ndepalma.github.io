from PIL import Image
import sys
import numpy
import json

consthex = "0123456789ABCDEF"
def tohex(eightbit):
    highbit = eightbit >> 4
    lowbit = eightbit & 15
    return consthex[highbit]+consthex[lowbit]
def tohexc(color):
    return "#"+tohex(color[0])+tohex(color[1])+tohex(color[2])

if(len(sys.argv) < 2):
    print("Specify filename")

im = Image.open(sys.argv[1])
im = im.convert('RGB')
asnp = numpy.asarray(im)
aslst = asnp.tolist()

#print(tohexc((255, 255, 100)))
hexar = list(map(lambda row: list(map(lambda ele: tohexc(ele), row)), aslst))
jsonstr = json.dumps(hexar)
print("var " + sys.argv[1].split('.')[0] + " = " + str(jsonstr))
#im.show()
