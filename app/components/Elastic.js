const config = require('config');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client(config.alternateLogger.elasticClient);

module.exports = client;
