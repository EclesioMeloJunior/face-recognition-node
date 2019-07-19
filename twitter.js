const Twit = require("twit");
const twitterCredentials = require("./.credentials/twitter-credentials.json");

const twitter = new Twit({
	strictSSL: true,
	timeout_ms: 60 * 1000,
	consumer_key: twitterCredentials.apiKey,
	access_token: twitterCredentials.accessToken,
	consumer_secret: twitterCredentials.apiSecretKey,
	access_token_secret: twitterCredentials.accessTokenSecret
});

function twitter() {}

twitter();
