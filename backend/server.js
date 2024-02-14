const express = require("express");
const cors = require("cors");

const app = express();

// CORS to allow requests from any origin
app.use(cors());

const port = 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));