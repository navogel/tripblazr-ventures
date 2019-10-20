// This is the page that will call the API calls for the authentication
const remoteURL = 'http://localhost:8088';

export default {
	getTrip(id) {
		return fetch(`${remoteURL}/locations?tripId=${id}`).then(result =>
			result.json()
		);
	},
	createUser(user) {
		return fetch(`${remoteURL}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(Response => Response.json());
	},
	getUserById(id) {
		return fetch(`${remoteURL}/users/${id}`).then(result => result.json());
	}
};
