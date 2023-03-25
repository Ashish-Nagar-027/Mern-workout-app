const mongooese = require("mongoose");

const userSchema = new mongooese.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongooese.model("User", userSchema);
