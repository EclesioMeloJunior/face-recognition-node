const fs = require("fs");
const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");

const visualRecognition = new VisualRecognitionV3({
	version: "2018-03-19",
	iam_apikey: "vm6Pd8FAcyRTX4q4EGDIF_CQ4-mIE9oWf9TGSBzyt8vY"
});

async function faceRecognition(content) {
	await detectFacesOnImage(content);

	async function detectFacesOnImage(content) {
		for (const imageLink of content.imagesLinks) {
			const recogntionParams = {
				url: imageLink
			};

			try {
				const recognitionResponse = await visualRecognition.detectFaces(
					recogntionParams
				);

				content.face = recognitionResponse.images[0].faces[0];
				content.face.imageLink = imageLink;
				break;
			} catch (err) {
				console.log(`> Errro ao processar a imagem: ${imageLink}`);
				continue;
			}
		}
	}
}

module.exports = faceRecognition;
