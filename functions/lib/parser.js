const Busboy = require('busboy')
const concat = require('concat-stream')

exports.parseFile = (req, { target }) =>
  new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: req.headers })

    let file

    busboy.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      if (fieldname === target) {
        fileStream.pipe(
          concat({ encoding: 'buffer' }, buffer => {
            file = { fieldname, mimetype, buffer }
          })
        )
      } else {
        fileStream.resume()
      }
    })

    busboy.on('finish', () => resolve(file))

    busboy.end(req.rawBody)
  })
