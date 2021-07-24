const cuid = require('cuid');
const { Payload } = require('dialogflow-fulfillment');
const moongoDB = require('../api/mongoDB');
const {
	getUserDetailsFromAgent,
	getSiteDetailsFromAgent,
	getHealthPackgeListTemplate,
	getFeaturesCardTemplate,
	getQuickRepliesTemplate,
	getHealthPackageCardTemplate,
} = require('../helper/helper');

const {
	givePackageRecommendation,
	giveArticleRecommendationBasedHealthPackage,
	giveArticleRecommendationBasedOnUserDetails,
} = require('../recommendationFunctions/recommendationSystem');

const health_packageID_Map = {
	'cardiac care basic': '60fa9c36834e7b37d0101db3',
	'cardiac care plus': '60fa9baf834e7b37d0101db1',
	'complete health solution': '60fa81a8834e7b37d0101da3',
	'complete health solution platinum': '60fa826f834e7b37d0101da5',
	'complete health solution silver': '60fa82d7834e7b37d0101da7',
	'diabetes care basic': '60fa9a19834e7b37d0101dad',
	'diabetes care plus': '60fa9ae9834e7b37d0101daf',
	'health plus solution': '60f92eb8d4a05a2c842f0018',
	'health preventive package essential': '60fa97bb834e7b37d0101dab',
	'healthy body package classic': '60faa011834e7b37d0101db9',
	'healthy body package essential': '60fa9f59834e7b37d0101db7',
	hospicare: '60fa3c47834e7b37d0101d9c',
	'pro health solution': '60f92d6dd4a05a2c842f0014',
	'super health solution': '60f92e34d4a05a2c842f0016',
	'super top up': '60fa9e34834e7b37d0101db5',
	'swasthya care': '60fa8867834e7b37d0101da9',
	'health prime': '60face3fcc9be3001541e382',
};

const showPackageRecommendationAccordingToUser = async (agent) => {
	// Recommendations according to user
	const userDetails = getUserDetailsFromAgent(agent);
	if (userDetails.email) {
		if (userDetails.name)
			agent.add(`Hi ${userDetails.name} 😄. I am here to help you.`);

		const healthPackage = await givePackageRecommendation(userDetails);
		if (healthPackage) {
			agent.add(
				'Hey! Our dear customer, We know you and we care about you 🤗. So please look at this product, It will help you in your need'
			);
			let payload_data3 = getHealthPackgeListTemplate(
				healthPackage.healthPackageData,
				healthPackage.featuresData,
				''
			);
			agent.add(
				new Payload(cuid(), payload_data3, {
					rawPayload: true,
					sendAsMessage: true,
				})
			);
		}
	}
};

// Intent handling functions
const handleWelcomeIntent = async (agent) => {
	// Recommendations accroding to webpage
	const siteDetails = getSiteDetailsFromAgent(agent);
	const { currentPage } = siteDetails;
	switch (currentPage) {
		case 'Home':
			await showPackageRecommendationAccordingToUser(agent);
			agent.add(
				'Welcome to Bajaj Finserv Health. I am nexus, a virtual assistant designed to answer your queries about Bajaj Health care services.'
			);
			const data = [
				{ title: 'Just Browsing!', message: 'Just Browsing!' },
				{
					title: 'Show me the available arogya plans',
					message: 'Show me the available arogya plans',
				},
				{ title: 'I have a question', message: 'I have a question' },
			];
			let payload_data = getQuickRepliesTemplate(
				data,
				'How can I assist you today ?'
			);
			agent.add(
				new Payload(agent.UNSPECIFIED, payload_data, {
					rawPayload: true,
					sendAsMessage: true,
				})
			);
			break;

		case 'Diabetes Care Basic':
			agent.add(
				'Are you facing some diabetic problems ? Do not worry we got you! Check these diabetic health packages which surely will ease your pain'
			);

			// let ids = ['60fa9a19834e7b37d0101dad', '60fa9ae9834e7b37d0101daf'];

			// Call health package api
			// let res2 = await moongoDB.post('/healthPackage/find/', {
			// 	_id: '60fa9a19834e7b37d0101dad',
			// });
			// let payload_data2 = getHealthPackgeListTemplate(
			// 	res2.data.healthPackageData,
			// 	res2.data.featuresData,
			// 	''
			// );
			// agent.add(
			// 	new Payload(agent.UNSPECIFIED, payload_data2, {
			// 		rawPayload: true,
			// 		sendAsMessage: true,
			// 	})
			// );

			let res4 = await moongoDB.post('/healthPackage/find/', {
				_id: '60fa9a19834e7b37d0101dad',
			});
			let payload_data4 = getHealthPackgeListTemplate(
				res4.data.healthPackageData,
				res4.data.featuresData,
				''
			);
			agent.add(
				new Payload(agent.UNSPECIFIED + '2', payload_data4, {
					rawPayload: true,
					sendAsMessage: true,
				})
			);

			agent.add(
				'If you have any queries reagrding this product you an check our FAQ section in upright corner'
			);
			break;

		case 'Health Prime':
			agent.add(
				'Hello, Seems you are interested in our health prime product. This product is especially designed for the short term benefits'
			);
			agent.add('Here are the complete details');

			// Call the health package api according to fields
			let res = await moongoDB.post('/healthPackage/find/', {
				_id: '60face3fcc9be3001541e382',
			});
			let payload_data3 = getHealthPackgeListTemplate(
				res.data.healthPackageData,
				res.data.featuresData,
				''
			);
			agent.add(
				new Payload(agent.UNSPECIFIED, payload_data3, {
					rawPayload: true,
					sendAsMessage: true,
				})
			);

			agent.add(
				'If you have any queries reagrding this product you an check our FAQ section in upright corner'
			);
			break;
		default:
			break;
	}
};

const handleHealthPackagesIntent = async (agent) => {
	const { Title } = agent.parameters;
	if (Title !== 'health package' && Title !== '') {
		const title = Title.toLowerCase();
		const id = health_packageID_Map[title];
		// Call the health package api according to fields
		let res = await moongoDB.post('/healthPackage/find/', {
			_id: id,
		});
		const payload_data = getHealthPackgeListTemplate(
			res.data.healthPackageData,
			res.data.featuresData,
			'Here is the best match for you query'
		);
		agent.add(
			new Payload(agent.UNSPECIFIED, payload_data, {
				rawPayload: true,
				sendAsMessage: true,
			})
		);
	} else {
		// Call the health package api for all
		let response = await moongoDB.post('/healthPackage/find/all');
		let packages = await response.data;
		agent.add('Here are the best matches for you query');
		const healthPackages = [];

		packages.forEach((res) => {
			healthPackages.push(res.healthPackageData);
		});
		const payload_data2 = getHealthPackageCardTemplate(
			healthPackages,
			'These are all the packages available in arrogya care'
		);
		console.log(healthPackages);
		agent.add(
			new Payload(cuid(), payload_data2, {
				rawPayload: true,
				sendAsMessage: true,
			})
		);
	}
};

const handleInsurancePoliciesIntent = async (agent) => {
	const { Amount_Covered, No_Adults_Covered, No_Children_Covered } =
		agent.parameters;

	const filterData = {};
	if (Amount_Covered !== '') filterData.amountCovered = Amount_Covered;
	if (No_Adults_Covered !== '')
		filterData.numberOfAdultsCovered = Number(No_Adults_Covered[0]);
	if (No_Children_Covered !== '')
		filterData.numberOfChildrenCovered = Number(No_Children_Covered[0]);
	// Call the insurance field api according to fields
	let res = await moongoDB.post('/healthInsurance/find', filterData);
	let policies = await res.data;
	const payload_data = getFeaturesCardTemplate(
		policies,
		'Here are some insurance polcies matching your criteria'
	);
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
	agent.add(
		'This coverage we include in our health packages, Please select any one of the insurance policies above to know in which health package this insurance includes!!'
	);
};

const handleInsurancePoliciesToHealthPackage = async (agent) => {
	const { health_insurance_title } = agent.parameters;
	// Call the reference populate api for insurance policy
	let res = await moongoDB.post('/healthInsurance/hp/find', {
		title: health_insurance_title,
	});
	let healthPackagesData = await res.data;
	const payload_data = getHealthPackageCardTemplate(healthPackagesData, '');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

const handleDoctorConsultationIntent = async (agent) => {
	const { Max_Benefits } = agent.parameters;

	const filterData = {};
	if (Max_Benefits !== '') filterData.maxBenefits = Max_Benefits;

	// Call the insurance field api according to fields
	let res = await moongoDB.post('/doctorConsultation/find', filterData);
	let doctorConsultations = await res.data;
	const payload_data = getFeaturesCardTemplate(
		doctorConsultations,
		'Here are some Doctor Consultations matching your criteria'
	);
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
	agent.add(
		'This coverage we include in our health packages, Please select any one of the Doctor Consultation above to know in which health package this insurance includes!!'
	);
};

const handleDoctorConsultationToHealthPackage = async (agent) => {
	const { doctor_consultation_title } = agent.parameters;
	// Call the reference populate api for insurance policy
	let res = await moongoDB.post('/doctorConsultation/hp/find', {
		title: doctor_consultation_title,
	});
	let healthPackagesData = await res.data;
	const payload_data = getHealthPackageCardTemplate(healthPackagesData, '');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

const handleHealthCheckupIntent = async (agent) => {
	const { Max_Benefits, Max_Test } = agent.parameters;

	const filterData = {};
	if (Max_Benefits !== '') filterData.maxBenefits = Max_Benefits;
	if (Max_Test !== '') filterData.numberOfDiagnosticTests = Max_Test;

	// Call the insurance field api according to fields
	let res = await moongoDB.post('/healthcheckup/find', filterData);
	let healthcheckups = await res.data;
	const payload_data = getFeaturesCardTemplate(
		healthcheckups,
		'Here are some Health Checkups matching your criteria'
	);
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
	agent.add(
		'This coverage we include in our health packages, Please select any one of the Health Checkup above to know in which health package this insurance includes!!'
	);
};

const handleHealthCheckupToHealthPackage = async (agent) => {
	const { HealthCheckups_title } = agent.parameters;
	// Call the reference populate api for insurance policy
	let res = await moongoDB.post('/healthcheckup/hp/find', {
		title: HealthCheckups_title,
	});
	let healthPackagesData = await res.data;
	const payload_data = getHealthPackageCardTemplate(healthPackagesData, '');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

const handleLabPackageIntent = async (agent) => {
	const { Max_Benefits } = agent.parameters;

	const filterData = {};
	if (Max_Benefits !== '') filterData.maxBenefits = Max_Benefits;

	// Call the insurance field api according to fields
	let res = await moongoDB.post('/labpackages/find', filterData);
	let labBenefits = await res.data;
	const payload_data = getFeaturesCardTemplate(
		labBenefits,
		'Here are some Lab Benefits matching your criteria'
	);
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
	agent.add(
		'This coverage we include in our health packages, Please select any one of the Lab Package above to know in which health package this insurance includes!!'
	);
};

const handleLabPackageToHealthPackage = async (agent) => {
	const { LabBenefits_title } = agent.parameters;
	// Call the reference populate api for insurance policy
	let res = await moongoDB.post('/labpackages/hp/find', {
		title: LabBenefits_title,
	});
	let healthPackagesData = await res.data;
	const payload_data = getHealthPackageCardTemplate(healthPackagesData, '');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

const handleNetworkDiscountsIntent = async (agent) => {
	const { Discount } = agent.parameters;

	const filterData = {};
	if (Discount !== '') filterData.doctorConsultationDiscount = Discount;

	// Call the insurance field api according to fields
	let res = await moongoDB.post('/networkdiscounts/find', filterData);
	let networkdiscounts = await res.data;
	const payload_data = getFeaturesCardTemplate(
		networkdiscounts,
		'Here are some Network Discounts matching your criteria'
	);
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
	agent.add(
		'This coverage we include in our health packages, Please select any one of the Network Discounts above to know in which health package this insurance includes!!'
	);
};

const handleNetworkDiscountToHealthPackage = async (agent) => {
	const { teleconsultations_title } = agent.parameters;
	// Call the reference populate api for insurance policy
	let res = await moongoDB.post('/teleconsultations/hp/find', {
		title: teleconsultations_title,
	});
	let healthPackagesData = await res.data;
	const payload_data = getHealthPackageCardTemplate(healthPackagesData, '');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

const handleTeleconsultationIntent = async (agent) => {
	const { No_of_doctor, Types_of_Physician } = agent.parameters;

	const filterData = {};
	try {
		if (No_of_doctor !== '') filterData.numberOfDoctors = No_of_doctor;
		if (Types_of_Physician !== '')
			filterData.typesOfPhysicians = { physician: Types_of_Physician };

		// Call the insurance field api according to fields
		let res = await moongoDB.post('/teleconsultations/find', filterData);
		let teleconsultations = await res.data;
		const payload_data = getFeaturesCardTemplate(
			teleconsultations,
			'Here are some teleconsultations matching your criteria'
		);
		agent.add(
			new Payload(agent.UNSPECIFIED, payload_data, {
				rawPayload: true,
				sendAsMessage: true,
			})
		);
		agent.add(
			'This coverage we include in our health packages, Please select any one of the teleconsultation above to know in which health package this insurance includes!!'
		);
	} catch (error) {}
};

const handleTeleconsultationToHealthPackage = async (agent) => {
	const { teleconsultations_title } = agent.parameters;
	// Call the reference populate api for insurance policy
	let res = await moongoDB.post('/teleconsultations/hp/find', {
		title: teleconsultations_title,
	});
	let healthPackagesData = await res.data;
	const payload_data = getHealthPackageCardTemplate(healthPackagesData, '');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

const handleWebHookIntent = (agent) => {
	const payload_data = {
		message: 'This is the sample json for card template',
		platform: 'kommunicate',
		metadata: {
			contentType: '300',
			templateId: '10',
			payload: [
				{
					title: 'Card Title',
					subtitle: 'Card Subtitle ',
					header: {
						overlayText: 'Overlay Text',
						imgSrc: 'Header image for the card',
					},
					description: 'Description',
					titleExt: 'Title extension',
					buttons: [
						{
							name: 'Link Button',
							action: {
								type: 'link',
								payload: {
									url: 'https://www.facebook.com',
								},
							},
						},
					],
				},
			],
		},
	};

	agent.add('Hello I am Webhook demo How are you...');
	agent.add(
		new Payload(agent.UNSPECIFIED, payload_data, {
			rawPayload: true,
			sendAsMessage: true,
		})
	);
};

module.exports = {
	handleWebHookIntent,
	handleWelcomeIntent,
	handleHealthPackagesIntent,
	handleInsurancePoliciesIntent,
	handleInsurancePoliciesToHealthPackage,
	handleDoctorConsultationToHealthPackage,
	handleDoctorConsultationIntent,
	handleHealthCheckupIntent,
	handleLabPackageIntent,
	handleNetworkDiscountsIntent,
	handleTeleconsultationIntent,
	handleTeleconsultationToHealthPackage,
	handleNetworkDiscountToHealthPackage,
	handleLabPackageToHealthPackage,
	handleHealthCheckupToHealthPackage,
};
