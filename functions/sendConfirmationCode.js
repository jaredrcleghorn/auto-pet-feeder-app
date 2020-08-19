// Config.
import config from '../config.json';

export default function sendConfirmationCode(email) {
	return fetch(`${config.autoPetFeederApiBaseUrl}/sendConfirmationCode`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	});
};
