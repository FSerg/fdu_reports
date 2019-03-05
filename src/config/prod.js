module.exports = {
  port: process.env.PORT || 5002,
  pgURI: process.env.PG_URI,
  resultsCounts: process.env.RESULTS_COUNTS || 100,
  fduURL: process.env.FDU_URL
};
