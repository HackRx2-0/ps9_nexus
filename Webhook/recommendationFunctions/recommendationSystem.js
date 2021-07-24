const mongoDB = require('../api/mongoDB');
// Recommendation System
const givePackageRecommendation = async (userDetails) => {
	const healthCondition_healthPacakge = {
		Diabetes: '60fa9a19834e7b37d0101dad',
		Cholesterol: '60fa9c36834e7b37d0101db3',
		Cancer: '60fa9e34834e7b37d0101db5',
	};

	let suggestedHealthPackageId = '';
	if (userDetails.healthConditions.length > 0) {
		// Call the health package api with filters of heath conditions
		suggestedHealthPackageId =
			healthCondition_healthPacakge[userDetails.healthConditions[0]];
	} else {
		// Call the health package api with filters of age group
		if (userDetails.age >= 18 && userDetails.age <= 35)
			suggestedHealthPackageId = '60fa826f834e7b37d0101da5';
		else if (userDetails.age >= 36 && userDetails.age <= 50)
			suggestedHealthPackageId = '60f92eb8d4a05a2c842f0018';
		else suggestedHealthPackageId = '60face3fcc9be3001541e382';
	}

	let res = await mongoDB.post('/healthPackage/find/', {
		_id: suggestedHealthPackageId,
	});

	return await res.data;
};

const giveArticleRecommendationBasedOnUserDetails = async (userDetails) => {
	let article = {};
	if (userDetails.healthConditions.length > 0) {
		// Call the article api with filters of heath conditions
	} else {
		// Call the article api with filters of gender
	}
};

const giveArticleRecommendationBasedHealthPackage = async (healthPackage) => {
	let article = {};
	if (healthPackage.healthConditions.length > 0) {
		// Call the article api with filters of heath conditions
	}
};

module.exports = {
	givePackageRecommendation,
	giveArticleRecommendationBasedHealthPackage,
	giveArticleRecommendationBasedOnUserDetails,
};
