import numpy as np
from PIL import Image
from skimage.io import imread
import sys
from keras.models import load_model
from keras.models import model_from_json
import json

from os import listdir
import os

img_width, img_height = 224, 224

with open("./dist/cnn/model.json",'r') as f:
    model_json = f.read()

model = model_from_json(model_json)
model.load_weights("./dist/cnn/model.h5")
model.compile(optimizer="adam",loss="categorical_crossentropy",metrics=["acc"])

with open("./dist/cnn/label_maps.json",'r') as f:
    label_maps = json.loads(f.read())
with open("./dist/cnn/label_maps_rev.json",'r') as f:
    label_maps_rev = json.loads(f.read())

from keras.applications.densenet import DenseNet121, preprocess_input
def predictBreed(filename):
    # download and save
    img = Image.open(filename)
    img = img.convert('RGB')
    img = img.resize((224, 224))
    img.save(filename)
    # predict#
    img = imread(filename)
    img = preprocess_input(img)
    probs = model.predict(np.expand_dims(img, axis=0))
    for idx in probs.argsort()[0][::-1][:1]:
        return label_maps_rev[str(idx)]

filename = sys.argv[1]
#print(filename)
print(predictBreed(filename))
sys.stdout.flush()