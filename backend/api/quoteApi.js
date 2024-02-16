const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const { authorizeToken } = require("../authToken");

// prisma client to interact with the database
const prisma = new PrismaClient();


/**
 * TODO: get a user's daily quote
 */


/**
 * TODO: get a user's favorite quotes
 */


/**
 * TODO: post to user's favorite quotes
 */


/**
 * TODO: delete from the user's favorite quotes
 */