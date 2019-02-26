module.exports = {
  port: process.env.PORT || 5002,
  mongoURI: process.env.MONGO_URI,
  pgURI: process.env.PG_URI,
  resultsCounts: process.env.RESULTS_COUNTS || 300,
  fduURL: process.env.FDU_URL
};
