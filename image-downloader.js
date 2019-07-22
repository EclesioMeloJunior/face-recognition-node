const fs = require("fs");
const path = require("path");
const downloader = require("image-downloader");

async function imageDownloader(content) {
	clearImagesFolder();

	await downloadImages(content);

	function clearImagesFolder() {
		const dir = "./images";
		const files = fs.readdirSync(dir);

		for (const file of files) {
			const ableToDelete = file.endsWith(".png") || file.endsWith(".jpg");

			if (ableToDelete) {
				const filedir = path.join(dir, file);
				fs.unlinkSync(filedir);
			}
		}
	}

	async function downloadImages(content) {
		const imagesLinks = content.imagesLinks;
		content.images = [];

		for (let linkIndex = 0; linkIndex < imagesLinks.length; linkIndex++) {
			const filename = `${content.searchTerm}-${linkIndex}.png`;
			const destination = `./images/${filename}`;

			await downloader.image({
				url: imagesLinks[linkIndex],
				dest: destination
			});

			console.log(`> ${imagesLinks[linkIndex]} - Donwloaded`);
			content.images.push(destination);
		}
	}
}

module.exports = imageDownloader;
