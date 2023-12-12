from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
model = pickle.load(open("predict_attrition.pkl", "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/predict", methods=["POST"])
def predict():
    print(request.form)
    # Buat DataFrame dari data yang diterima
    feature_names = ['totalbusinessvalue', 'age', 'gender', 'city', 'education', 'salary', 'joiningdesignation', 'designation', 'qrating']
    float_features = [float(x) for x in request.form.values()]
    features_df = pd.DataFrame([float_features], columns=feature_names)

    # Prediksi menggunakan DataFrame
    prediction = model.predict(features_df)
    print(prediction)
    # Convert NumPy array to a Python list
    prediction_list = prediction.tolist()

    return jsonify({   
        "prediksi": prediction_list
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
