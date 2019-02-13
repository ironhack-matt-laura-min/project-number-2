const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  diaryTitle: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  timeSpent: Number,
  difficulty: { type: Number, max: 5, min: 1 },
  sourceType: { type: String, enum: ["video", "book", "article", "course", "other"] },
  sourceTitle: { type: String },
  sourceLink: { type: String }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Diary = mongoose.model('Diary', diarySchema);
module.exports = Diary;


