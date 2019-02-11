const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
  category: { type: String, required: true },
  description: String,
  timeSpent: Number,
  difficulty: { type: String, enum: ["1", "2", "3", "4", "5"] },
  sourceType: { type: String, enum: ["video", "book", "article", "course", "other"] },
  sourceTitle: { type: String, required: true },
  sourceLink: { type: String }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Diary = mongoose.model('Diary', diarySchema);
module.exports = Diary;


