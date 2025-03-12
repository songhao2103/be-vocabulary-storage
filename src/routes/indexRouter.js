import vocabularyRouter from "./vocabularyRouter.js";

const route = (app) => {
  //vocabulary
  app.use("/vocabulary", vocabularyRouter);
};

export default route;
