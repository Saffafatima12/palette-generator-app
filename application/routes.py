# -*- coding: utf-8 -*-

from application import app
from flask import request
from flask import jsonify
from flask import render_template

import base64
import io


from k_means import get_colors



@app.route("/")
def index():
    return render_template("index.html", index=True )




@app.route("/", methods=['GET','POST'])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = io.BytesIO(decoded)
    
    k = int(message['name'])

    prediction = get_colors(image, k)
    
    
    keys = ['1', '2', '3', '4', '5', '6' ,'7', '8', '9']
   

    response = {}
    for i in range(len(prediction)):
        response[keys[i]] = prediction[i]
    
    return jsonify(response)


# image = Image.open(io.BytesIO('static/work-remote.jpg'))
