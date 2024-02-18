const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeToken } = require("../../middleware/authentication");

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
    const tomorrowNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const dbQuote = await prisma.quote.findFirst({
      select: {
        quote_id: true,
        quote_author: true,
        quote_text: true,
      },
      where: {
        generated_at: {gte: todayNoTime, lt: tomorrowNoTime},
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
        generated_at: today,
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
 * get a user's favorite quotes
 */
router.get("/favorites/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // get the user's favorite quotes
    const favoriteQuotes = await prisma.quote.findMany({
      select: {
        quote_id: true,
        quote_author: true,
        quote_text: true,
      },
      where: {
        users_who_saved: {
          some: {
            user_id: req.userId,
          },
        },
      },
    });

    res.json(favoriteQuotes);
  } catch (err) {
    res.status(400).json(err); // Error when getting the favorite quotes
  }
});


/**
 * post to user's favorite quotes
 */
router.post("/favorites/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  // If the request does not have a quote id
  if (!req.body.quoteId) {
    res.status(400).json({ error: "Missing Quote ID" });
    return;
  }

  // TODO: check if they have already saved a quote with the same text and author
  // if they have just update the saved date? 

  try {
    // Create a new favorite quote
    const favoriteQuote = await prisma.savedQuote.create({
      data: {
        quote: {
          connect: { quote_id: req.body.quoteId },
        },
        user: {
          connect: { user_id: req.userId },
        },
      },
    });

    res.sendStatus(201)
  } catch (err) {
    res.status(400).json(err); // Error when creating the favorite quote
  }
});


/**
 * delete from the user's favorite quotes
 */
router.delete("/favorites/:quoteId/", async (req, res) => {
  // Check if the user has a valid token
  if (!authorizeToken(req, res)) {
    return;
  }

  try {
    // Delete the favorite quote
    const deletedFavoriteQuote = await prisma.savedQuote.delete({
      where: {
        user_id_quote_id: {
          user_id: req.userId,
          quote_id: parseInt(req.params.quoteId),
        },
      },
    });

    res.sendStatus(204);
  } catch (err) {
    if (err.code === "P2025") { // if the favorite quote does not exist
      res.status(404).json({ error: "Favorite quote not found" });
      return;
    }
    res.status(400).json(err); // Error when deleting the favorite quote
  }
});


module.exports = router;