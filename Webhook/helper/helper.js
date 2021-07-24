const _ = require('lodash');
const sampleImgLinks = [
	'https://firebasestorage.googleapis.com/v0/b/bajaj-cfbm.appspot.com/o/chatbot_images%2FHealth%20Insurance%20Policy%20in%20India%201.png?alt=media&token=3e808dd4-b317-4abc-9fbd-32e710c1eb7f',
	'https://firebasestorage.googleapis.com/v0/b/bajaj-cfbm.appspot.com/o/chatbot_images%2Fdoctor_consult_1.jpg?alt=media&token=6fb69539-bd6b-4c23-ba6d-263325b01b34',
	'https://firebasestorage.googleapis.com/v0/b/bajaj-cfbm.appspot.com/o/chatbot_images%2Fhealth%20insaurance.jpg?alt=media&token=4a5d1727-cc99-48ab-a0be-5486f964d671',
	'https://firebasestorage.googleapis.com/v0/b/bajaj-cfbm.appspot.com/o/chatbot_images%2Fhealth_checkup.jpg?alt=media&token=396980a4-c7b0-4c38-94bf-2a34d97520ce',
	'https://firebasestorage.googleapis.com/v0/b/bajaj-cfbm.appspot.com/o/chatbot_images%2Finsaurance_2.jpg?alt=media&token=f7ae8cc1-6a4d-4113-b879-8255c2a2cc44',
];

// Helper functions
const getUserDetailsFromAgent = (agent) => {
	if (agent.originalRequest && agent.originalRequest.payload)
		return agent.originalRequest.payload.userDetails;

	return null;
};

const getSiteDetailsFromAgent = (agent) => {
	if (agent.originalRequest && agent.originalRequest.payload)
		return agent.originalRequest.payload.siteDetails;

	return null;
};

const getHealthPackgeListTemplate = (
	healthPackageData,
	featuresData,
	message
) => {
	const elements = [];

	featuresData.forEach((feature) => {
		const temp = {
			imgSrc: _.sample(sampleImgLinks),
			title: feature.title,
			description: feature.description,
			action: {
				url: 'https://www.google.com',
				type: 'link',
			},
		};

		elements.push(temp);
	});

	return {
		message: message,
		platform: 'kommunicate',
		metadata: {
			contentType: '300',
			templateId: '7',
			payload: {
				headerImgSrc: _.sample(sampleImgLinks),
				headerText: healthPackageData.title,
				elements: elements,
				buttons: [
					{
						name: 'Get the package',
						action: {
							type: 'link',
							url: healthPackageData.url,
						},
					},
				],
			},
		},
	};
};

const getHealthPackageCardTemplate = (healthPackageData, message) => {
	const cards = [];
	healthPackageData.forEach((healthPackage) => {
		const template = {
			title: healthPackage.title,
			// subtitle: "",
			header: {
				// overlayText: 'Overlay Text',
				imgSrc: _.sample(sampleImgLinks),
			},
			description: healthPackage.description,
			// titleExt: 'Title extension',
			buttons: [
				{
					name: 'Get the details',
					action: {
						type: 'link',
						payload: {
							url: healthPackage.url,
						},
					},
				},
			],
		};
		cards.push(template);
	});

	return {
		message: message,
		platform: 'kommunicate',
		metadata: {
			contentType: '300',
			templateId: '10',
			payload: cards,
		},
	};
};

const getPropertiesString = (feature) => {
	let str = '';
	for (const prop in feature) {
		if (
			prop !== '_id' &&
			prop !== 'title' &&
			prop !== '__v' &&
			prop !== 'description'
		) {
			str += '✔️' + prop + ' : ';
			if (feature[prop] === true) str += 'allowed';
			else if (feature[prop] === false) str += 'No';
			else str += feature[prop];

			str += '\n';
		}
	}

	return str;
};

const getFeaturesCardTemplate = (featuresData, message) => {
	const cards = [];
	featuresData.forEach((feature) => {
		const template = {
			title: feature.title,
			subtitle: feature.description,
			header: {
				// overlayText: 'Overlay Text',
				imgSrc: _.sample(sampleImgLinks),
			},
			description: getPropertiesString(feature),
			// titleExt: 'Title extension',
			buttons: [
				{
					name: 'Select',
					action: {
						type: 'quickReply',
						payload: {
							title: 'Select',
							message: feature.title,
						},
					},
				},
			],
		};
		cards.push(template);
	});

	return {
		message: message,
		platform: 'kommunicate',
		metadata: {
			contentType: '300',
			templateId: '10',
			payload: cards,
		},
	};
};

const getQuickRepliesTemplate = (data, message) => {
	const quickReplies = [];
	data.forEach((unit) => {
		const temp = {
			title: unit.title,
			message: unit.message,
		};
		quickReplies.push(temp);
	});

	return {
		message: message,
		platform: 'kommunicate',
		metadata: {
			contentType: '300',
			templateId: '6',
			payload: quickReplies,
		},
	};
};

module.exports = {
	getUserDetailsFromAgent,
	getSiteDetailsFromAgent,
	getHealthPackgeListTemplate,
	getFeaturesCardTemplate,
	getQuickRepliesTemplate,
	getHealthPackageCardTemplate,
};
