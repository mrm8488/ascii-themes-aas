"use strict";

const express = require("express");

const { Router } = express;

const router = Router();

const asciiThemeGen = require("./AsciiThemeGenerator");

router.use(require("helmet")());
router.use(require("compression")());
router.use(require("cors")());
router.use(require("morgan")("tiny"));

router.get("/:text?", async (req, res) => {
  const text =
    req.params.text &&
    (typeof req.params.text === "string" || req.params.text instanceof String)
      ? req.params.text
      : undefined;
  try {
    const data = await asciiThemeGen(text);

    res.setHeader("Content-type", "text/plain");
    res.attachment("your-ascii-theme.txt");
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/robots.txt", (req, res) => res.status(204).send());
router.get("/favicon.txt", (req, res) => res.status(204).send());

module.exports = express()
  .use(router)
  .disable("x-powered-by");
