// This is the page that will call the API calls for the authentication
const remoteURL = 'http://localhost:8088';

export default {
	getAllTrips(id) {
		return fetch(`${remoteURL}/trips?userId=${id}`).then(result =>
			result.json()
		);
	},
	getTrip(id) {
		return fetch(
			`${remoteURL}/locations?tripId=${id}&_expand=locationType`
		).then(result => result.json());
	},
	getTripDetails(id) {
		return fetch(`${remoteURL}/trips/${id}`).then(result => result.json());
	},

	getTripByType(id, typeId) {
		return fetch(
			`${remoteURL}/locations?tripId=${id}&locationType=${typeId}&_expand=locationType`
		).then(result => result.json());
	},
	deleteTrip(id) {
		return fetch(`${remoteURL}/trips/${id}`, {
			method: 'DELETE'
		}).then(result => result.json());
	},
	deleteLocation(id) {
		return fetch(`${remoteURL}/locations/${id}`, {
			method: 'DELETE'
		}).then(result => result.json());
	}
};
