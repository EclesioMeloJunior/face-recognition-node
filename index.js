var readlineSync = require("readline-sync");
const components = {
	imageSearch: require("./image-search")
};

async function start() {
	const content = {};

	content.searchTerm = askSearchTerm();
	content.keywords = askKeywordsAndParseToArray();

	await components.imageSearch(content);

	console.log(content);

	function askSearchTerm() {
		return readlineSync.question("Type your search: ");
	}

	function askKeywordsAndParseToArray() {
		const keywordsSeparatedByComma = askKeywords();
		const keywordArray = fromCSKeywordsToArray(keywordsSeparatedByComma);

		return keywordArray;

		function fromCSKeywordsToArray(keywords) {
			const keywordArray = [];

			for (const keyword of keywords.split(",")) {
				keywordArray.push(keyword.trim());
			}

			return keywordArray;
		}
	}

	function askKeywords() {
		return readlineSync.question("Type some keywords separated by comma: ");
	}
}

start();
