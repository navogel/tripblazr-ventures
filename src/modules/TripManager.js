// This is the page that will call the API calls for the authentication
const remoteURL = 'http://localhost:8088';

export default {
	getTrip(id) {
		return fetch(`${remoteURL}/locations?tripId=${id}`).then(result =>
			result.json()
		);
	},
	getTripByType(id, typeId) {
		return fetch(
			`${remoteURL}/locations?tripId=${id}&locationType=${typeId}`
		).then(result => result.json());
	}
};
