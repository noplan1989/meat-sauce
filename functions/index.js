const functions = require('firebase-functions')
const { parseFile } = require('./lib/parser')
const { getPrediction } = require('./lib/automl')

const VALID_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']

const validateRequest = file => file && VALID_MIME_TYPES.includes(file.mimetype)

exports.predict = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send()
  }

  const file = await parseFile(req, { target: 'image' })

  if (!validateRequest(file)) {
    return res.status(400).send()
  }

  const imageBytes = file.buffer.toString('base64')

  try {
    const scores = await getPrediction(imageBytes)

    res.status(200).json(scores)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})
