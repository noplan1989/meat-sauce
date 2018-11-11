const functions = require('firebase-functions')
const automl = require('@google-cloud/automl')
const client = new automl.PredictionServiceClient({
  credentials: functions.config().service_account
})

const VISION_PROJECT = functions.config().vision.projet
const VISION_REGION = functions.config().vision.region
const VISION_MODEL = functions.config().vision.model

exports.getPrediction = imageBytes =>
  new Promise((resolve, reject) => {
    const params = {
      name: client.modelPath(VISION_PROJECT, VISION_REGION, VISION_MODEL),
      payload: {
        image: { imageBytes }
      }
    }

    client
      .predict(params)
      .then(([data]) => resolve(data.payload))
      .catch(err => reject(err))
  })
