import mongoose from "mongoose";

//deploy lại

const vocabularySchema = mongoose.Schema(
  {
    headword: { type: String, unique: true, required: true },

    meaning: {
      type: String,
      required: true,
    },

    partOfSpeech: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    remembered: {
      type: Boolean,
      default: false,
    },

    capitalize: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);

export default Vocabulary;
