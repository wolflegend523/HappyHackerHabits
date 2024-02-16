const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeToken } = require("../authToken");

// prisma client to interact with the database
const prisma = new PrismaClient();

// API endpoint to get a user's daily quote
const quotableAPIEndpoint = "https://api.quotable.io/random";
const technologyTag = "technology";


/**
 * get a user's daily quote
 */
router.get("/daily/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // check if there is a quote in the database for today
    const today = new Date();
    const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dbQuote = await prisma.quote.findFirst({
      select: {
        quote_id: true,
        quote_author: true,
        quote_text: true,
      },
      where: {
        generated_at: todayNoTime,
      },
    });

    // if there is a quote for today, send it back
    if (dbQuote) {
      res.json(dbQuote);
      return;
    } 

    // if there is not already a quote for today get a random quote from the quotable API
    const response = await fetch(quotableAPIEndpoint + "?tags=" + technologyTag);
    if (!response.ok) {
      res.status(500).json({error: "Failed to generate a quote"});
    }
    const newQuote = await response.json();

    // save the quote in the database
    const newDbQuote = await prisma.quote.create({
      data: {
        quote_author: newQuote.author,
        quote_text: newQuote.content,
        generated_at: todayNoTime,
      },
      select: {
        quote_id: true,
        quote_author: true,
        quote_text: true,
      },
    });

    // send the new quote 
    res.json(newDbQuote);
  } catch (err) {
    res.status(400).json(err); // Error when creating the quote
  }
});


/**
 * TODO: get a user's favorite quotes
 */
router.get("/favorites/", async (req, res) => {
});


/**
 * TODO: post to user's favorite quotes
 */
router.post("/favorites/", async (req, res) => {
});


/**
 * TODO: delete from the user's favorite quotes
 */
router.delete("/favorites/", async (req, res) => {
});


module.exports = router;