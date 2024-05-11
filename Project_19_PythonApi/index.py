from flask import Flask, request, jsonify, render_template, session, url_for, redirect
# Code for deployment
#import sklearn.external.joblib as joblib
import joblib
import numpy as np
from tensorflow import keras
import tensorflow as tf
from tensorflow.python.keras.layers import Dense
from tensorflow.python.keras.models import load_model
from wtforms import SubmitField
from flask_wtf import FlaskForm
from wtforms import StringField

def return_prediction(model, scaler, sample_json):
    s_len = sample_json["sepal_length"]
    s_wid = sample_json["sepal_width"]
    p_len = sample_json["petal_length"]
    p_wid = sample_json["petal_length"]    

    flower = [[s_len, s_wid, p_len, p_wid]]
    classes = np.array(['setosa', 'versicolor', 'virginica'])
    
    flower = scaler.transform(flower)
    #class_ind = model.predict(flower)
    class_ind_2 = (np.argmax(model.predict(flower), axis=-1))[0]
    
    return classes[class_ind_2]




app = Flask(__name__)
# forms safety
app.config['SECRET_KEY'] = 'mysecretkey'

class FlowerForm(FlaskForm):
    sep_len = StringField("Sepal Length")
    sep_wid = StringField("Sepal Width")
    pet_len = StringField("Petal Length")
    pet_wid = StringField("Petal Width")
    submit = SubmitField("Predict")



@app.route("/", methods=['GET', 'POST'])
def index():
    # create instance of flower form class
    form = FlowerForm()
    if form.validate_on_submit():
        session['sep_len'] = form.sep_len.data
        session['sep_wid'] = form.sep_wid.data
        session['pet_len'] = form.pet_len.data
        session['pet_wid'] = form.pet_wid.data
        return redirect(url_for("prediction"))
    return render_template('home.html', form=form)


flower_scaler = joblib.load('iris_scaler.pkl')
flower_scaler.clip=False
flower_model = tf.keras.models.load_model('final_iris_model.h5')



@app.route('/prediction', methods=['POST', 'GET'])
def prediction():
    #content = request.json
    #results = return_prediction(flower_model, flower_scaler, content)
    #return jsonify(results)
    content = {}
    content['sepal_length'] = float(session['sep_len'])
    content['sepal_width'] = float(session['sep_wid'])
    content['petal_length'] = float(session['pet_len'])
    content['petpal_width'] = float(session['pet_wid'])
    results = return_prediction(flower_model, flower_scaler, content)
    return render_template('prediction.html', results=results)

if __name__=='__main__':
    app.run()




