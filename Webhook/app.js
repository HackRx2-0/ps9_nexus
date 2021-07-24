const express = require('express');
const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const mongoDB = require('./api/mongoDB');
const {
	handleWebHookIntent,
	handleWelcomeIntent,
	handleHealthPackagesIntent,
	handleInsurancePoliciesIntent,
	handleInsurancePoliciesToHealthPackage,
	handleDoctorConsultationIntent,
	handleDoctorConsultationToHealthPackage,
	handleHealthCheckupIntent,
	handleLabPackageIntent,
	handleNetworkDiscountsIntent,
	handleTeleconsultationIntent,
	handleTeleconsultationToHealthPackage,
	handleNetworkDiscountToHealthPackage,
	handleLabPackageToHealthPackage,
	handleHealthCheckupToHealthPackage,
} = require('./intentFunctions/intents');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
	res.send('Server Is Working......');
});
const port = process.env.PORT || 3000;
/**
 * on this route dialogflow send the webhook request
 * For the dialogflow we need POST Route.
 * */
app.post('/webhook', (req, res) => {
	// get agent from request
	let agent = new WebhookClient({
		request: req,
		response: res,
	});

	// create intentMap for handle intent
	let intentMap = new Map();

	// add intent map 2nd parameter pass function
	intentMap.set('webhook-demo', handleWebHookIntent);
	intentMap.set('Default Welcome Intent', handleWelcomeIntent);
	intentMap.set('Health_packages', handleHealthPackagesIntent);
	intentMap.set('Insurance_policies', handleInsurancePoliciesIntent);
	intentMap.set(
		'Insurance_policies_to_Health_package',
		handleInsurancePoliciesToHealthPackage
	);
	intentMap.set('Doctor_consultations', handleDoctorConsultationIntent);
	intentMap.set(
		'Doctor_consultations_to_Health_Package',
		handleDoctorConsultationToHealthPackage
	);
	intentMap.set('Health_checkups', handleHealthCheckupIntent);
	intentMap.set(
		'Health_checkups_to_Health_package',
		handleHealthCheckupToHealthPackage
	);
	intentMap.set('Lab_packages', handleLabPackageIntent);
	intentMap.set(
		'Lab_packages_to_health_packages',
		handleLabPackageToHealthPackage
	);
	intentMap.set('Network_discounts', handleNetworkDiscountsIntent);
	intentMap.set(
		'Network_discounts_to_Health_package',
		handleNetworkDiscountToHealthPackage
	);
	intentMap.set('Teleconsultations', handleTeleconsultationIntent);
	intentMap.set(
		'Teleconsultations_to_Health_package',
		handleTeleconsultationToHealthPackage
	);

	// now agent is handle request and pass intent map
	agent.handleRequest(intentMap);
});

/**
 * now listing the server on port number 3000 :)
 * */
app.listen(port, () => {
	console.log('Server is Running on port ' + port);
	// Temp code for reference
	// const res = await mongoDB.get('/1');
	// console.log(res.data);
});
