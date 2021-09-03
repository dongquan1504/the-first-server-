const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "1db330cbe0ca437ba06880f192c7a63c",
});
const handleClarifai = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then((data)=>res.json(data))
  .catch((err)=> res.status(400).json('unable to work with api'))
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json("no such userID like that."));
};

module.exports = {
  handleImage: handleImage,
  handleClarifai: handleClarifai,
};
