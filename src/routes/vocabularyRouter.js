import express from "express";
import vocabularyController from "../controllers/vocabularyController.js";

const vocabularyRouter = express.Router();

//create vocabulare
vocabularyRouter.post("/create", vocabularyController.createVocabulary);

//get topic
vocabularyRouter.get("/get-topics", vocabularyController.getTopics);

//turn remembered
vocabularyRouter.post("/turn-remembered", vocabularyController.turnRemembered);

//delete vocabulary
vocabularyRouter.get(
  "/delete-vocabulary/:vocId",
  vocabularyController.deleteVocabulary
);

//update vocabulary
vocabularyRouter.post(
  "/update-vocabulary",
  vocabularyController.updateVocabulary
);

//get vocabulary
vocabularyRouter.post("/", vocabularyController.getVocabulary);

export default vocabularyRouter;
