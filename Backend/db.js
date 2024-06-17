const mongoose = require("mongoose");
const Url =
  "mongodb+srv://coder8513:QRpDJg8E7zzyZU1E@socialmedia.f9c2k8v.mongodb.net/socialMediaWebsite?retryWrites=true&w=majority&appName=SocialMedia";

const ConnectToMongo = async () => {
  await mongoose.connect(Url);
};
ConnectToMongo()
  .then(() => console.log("Successfully Connected To MongoDB"))
  .catch((err) => {
    console.log(err);
  });

module.exports = ConnectToMongo;
