const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '62ce0340ee1e4b38ae28fc9e65212fa3'
  });


  const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API.'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1) // Instead of 'update'
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries.'));
}

module.exports = {
    handleImage, // same as handleImage : handleImage
    handleApiCall
}