// here we will create the ROutes for the BOoks
import { Request, Response } from "express";
const express = require("express");

const bodyParser = require("body-parser");
const {logger} = require("../Logger/apiLogger.ts")
const bookRouter = express.Router();
bookRouter.use(bodyParser.json());
const { booksModel } = require("../model/Books.model.ts");
const { UserModel } = require("./user.Routes");
bookRouter.post("/books", async (req: Request, res: Response) => {
  const { title, author, userID, roles } = req.body;
  try {
    if (!userID || !title || !author || !roles) {
        logger.warn(
            `Method : ${req.method} - StatusCode: 404 - Route: ${req.route}`
          );
      return res.status(404).send("Please fill all the details");
    }
    const book = new booksModel({ title, author, userID });
    await book.save();
    res.status(201).send(book);
    logger.info(
        `Method : ${req.method} - StatusCode: 201 - Route: ${req.route}`
      );
  } catch (error) {
    res.json(error.message);
  }
});
// get all the books from the database
bookRouter.get("/books", async (req: Request, res: Response) => {
  const userID = req.body.userID;
  const roles = req.body.roles;
  const OLD = req.query.old;
  const NEW = req.query.new;
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  try {
    if (roles.includes("VIEWER")) {
      if (OLD == "1") {
        const booksdata = await booksModel.find({
          userID,
          createdAt: { $lte: tenMinutesAgo },
        });
        logger.info(
            `Method : ${req.method}  - Route: ${req.url}`
          );
        return res.send(booksdata);
      } else if (NEW == "1") {
        const booksdata = await booksModel.find({
          userID,
          createdAt: { $gte: tenMinutesAgo },
        });
        logger.info(
            `Method : ${req.method}  - Route: ${req.url}`
          );
        return res.send(booksdata);
      }
      const booksdata = await booksModel.find({ userID });
      logger.info(
        `Method : ${req.method}  - Route: ${req.url}`
      );
      res.send(booksdata);
    } else if (roles.includes("VIEWER_ALL")) {
      if (OLD == "1") {
        const booksdata = await booksModel.find({
          userID,
          createdAt: { $lte: tenMinutesAgo },
        });
        logger.info(
            `Method : ${req.method} - StatusCode: 200 - Route: ${req.url}`
          );
        return res.send(booksdata);
      } else if (NEW == "1") {
        const booksdata = await booksModel.find({
          userID,
          createdAt: { $gte: tenMinutesAgo },
        });
        logger.info(
            `Method : ${req.method} - StatusCode: 200 - Route: ${req.url}`
          );
        return res.send(booksdata);
      }
      const alldata = await booksModel.find();
      res.send(alldata);
      logger.info(
        `Method : ${req.method} - StatusCode:200 - Route: ${req.url}`
      );
    }
  } catch (error) {
    logger.error(
        `Method : ${req.method} - StatusCode: 500 - Route: ${req.url}`
      );
    res.json(error.message);
  }
});

// querry to get the book from last 10 mins

module.exports = {
  bookRouter,
};
