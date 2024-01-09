import express from "express";
const categoryRouter = express.Router();

import {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  getCategory,
} from "../controllers/category/Category.js";
import { createCategorySchema } from "../controllers/category/CategorySchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";



categoryRouter
  .route("/")
  .get(verifyUser, getCategories)
  .post(
    validationMiddleware(createCategorySchema),
    verifyUser,
    authorizeUser(["regular", "admin"]),
    createCategory
  );

categoryRouter
  .route("/:id")
  .get(verifyUser, getCategory)
  .patch(updateCategory)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteCategory);

export default categoryRouter;
