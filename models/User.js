const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  imgPath: {
    type: String,
    default: 'https://res.cloudinary.com/dvaul5gwx/image/upload/v1550141779/folder-name/default-profile-icon-24.jpg'
  },
  imgName: String,
  aboutMe: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
