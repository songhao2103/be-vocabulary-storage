import Vocabulary from "../models/vocabularyModel.js";

const vocabularyController = {
  //[POST] /vocabulary/create
  createVocabulary: async (req, res) => {
    const { headword, meaning, partOfSpeech, topic } = req.body;
    try {
      if (!headword || !meaning || !partOfSpeech || !topic) {
        throw new Error("Missing data!!");
      }

      const isDuplicate = await Vocabulary.findOne({ headword: headword });

      if (isDuplicate) {
        throw new Error("Vocabulary already exists in database!!");
      }

      const newVocabulary = await Vocabulary.create({
        headword,
        meaning,
        partOfSpeech,
        topic,
      });

      res.status(200).json({ success: true, vocabulary: newVocabulary });
    } catch (error) {
      console.log("Server error when adding new vocablary!! " + error.message);
      res.status(500).send(error.message);
    }
  },

  //[GET] /vocabulary/get-topics
  getTopics: async (req, res) => {
    try {
      const vocabularyList = await Vocabulary.find().lean();
      const topicsList = new Set(
        vocabularyList.map((vocabulary) => vocabulary.topic)
      );

      res.status(200).send([...topicsList]);
    } catch (error) {
      console.log("Server error when get topics!! error: " + error.message);
      res
        .status(500)
        .send("Server error when get topics!! error: " + error.message);
    }
  },

  //[POST] /vocabulary
  getVocabulary: async (req, res) => {
    const { limit, page, sortValue, topic, remembered, capitalize, search } =
      req.body;
    try {
      if (
        !limit ||
        !page ||
        !sortValue ||
        !topic ||
        !remembered ||
        !capitalize
      ) {
        throw new Error("Missing data!!");
      }

      const objectFilter = {};
      if (capitalize.toLowerCase() !== "all") {
        objectFilter.capitalize = capitalize.toLowerCase() === "common";
      }
      if (topic.toLowerCase() !== "all") {
        objectFilter.topic = topic.toLowerCase();
      }

      if (remembered.toLowerCase() !== "all") {
        objectFilter.remembered =
          remembered.toLowerCase() === "remembered" ? true : false;
      }

      if (search) {
        objectFilter["$or"] = [
          { headword: { ["$regex"]: search, ["$options"]: "i" } },
          { meaning: { ["$regex"]: search, ["$options"]: "i" } },
        ];
      }

      const objectSort = {};
      if (sortValue.toLowerCase() === "latest") {
        objectSort.updatedAt = -1;
      } else if (sortValue.toLowerCase() === "oldest") {
        objectSort.updatedAt = 1;
      } else if (sortValue.toLowerCase() === "a - z") {
        objectSort.headword = 1;
      } else {
        objectSort.headword = -1;
      }

      const vocablaryList = await Vocabulary.find(objectFilter)
        .sort(objectSort)
        .limit(Number(limit))
        .skip(Number(limit) * (Number(page) - 1));

      res.status(200).send(vocablaryList);
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).send("Error: " + error.message);
    }
  },

  //[POST] /vocabulary/turn-remembered
  turnRemembered: async (req, res) => {
    const { vocId, value, field } = req.body;
    try {
      if (!vocId || !value instanceof Boolean || !field) {
        throw new Error("Missing data!!");
      }

      await Vocabulary.findByIdAndUpdate(vocId, {
        $set: { [field]: value },
      });

      res.status(200).send("OK");
    } catch (error) {
      console.log(`Server error when turn ${field}!!` + error.message);
      res.status(500).send(`Server error when turn ${field}!!` + error.message);
    }
  },

  //[GET] /vocabulary/delete-vocabulary/:vocId
  deleteVocabulary: async (req, res) => {
    const { vocId } = req.params;
    try {
      if (!vocId) {
        throw new Error("Missing data!!");
      }

      await Vocabulary.findByIdAndDelete(vocId);

      res.status(200).send("OK");
    } catch (error) {
      console.log("Error: " + error);
      res
        .status(500)
        .send("Server error when delete vocabulary!! error: " + error.message);
    }
  },

  //[POST] /vocabulary/update-vocabulary
  updateVocabulary: async (req, res) => {
    const { headword, meaning, partOfSpeech, topic, _id } = req.body;
    try {
      if ((!headword || !meaning || !partOfSpeech || !topic, !_id)) {
        throw new Error("Missing data!!");
      }

      await Vocabulary.findByIdAndUpdate(_id, {
        $set: {
          headword,
          partOfSpeech,
          meaning,
          topic,
        },
      });

      res.status(200).send("Ok");
    } catch (error) {
      console.log(
        "Server error when update vocabulary! error: " + error.message
      );

      res
        .status(500)
        .send("Server error when update vocabulary! error: " + error.message);
    }
  },
};

export default vocabularyController;
