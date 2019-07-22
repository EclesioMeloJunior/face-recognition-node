const google = require("googleapis").google;
const customSearch = google.customsearch("v1");

const googleSearchCredentials = require("./.credentials/google-credentials.json");

async function imageSearch(content) {
	content.sentence = buildSentenceToSearch(content);
	content.imagesLinks = await SearchBySentenceAndReturnLinks(content.sentence);

	function buildSentenceToSearch(content) {
		return `${content.searchTerm} ${content.keywords.join(" ")}`;
	}

	async function SearchBySentenceAndReturnLinks(sentence) {
		const response = await customSearch.cse.list({
			auth: googleSearchCredentials.apiKey,
			cx: googleSearchCredentials.searchEngineID,
			q: sentence,
			searchType: "image",
			num: 10
		});

		const imagesUrl = response.data.items.map(item => item.link);
		return imagesUrl;
	}
}

module.exports = imageSearch;
