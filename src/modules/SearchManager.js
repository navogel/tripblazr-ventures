import Token from '../Token';

export default {
	FbSearch(searchTerm, lat, lng, range) {
		console.log(
			`https://graph.facebook.com/v4.0/search?type=place&center=${lat},${lng}&distance=${range}&q=${searchTerm}&fields=name,location,cover,about,overall_star_rating,category_list,parking,phone,price_range,restaurant_specialties,website,description&access_token=${Token.FB}`
		);
		return fetch(
			`https://graph.facebook.com/v4.0/search?type=place&center=${lat},${lng}&distance=${range}&q=${searchTerm}&fields=name,location,cover,about,overall_star_rating,category_list,parking,phone,price_range,restaurant_specialties,website,description&access_token=${Token.FB}`
		).then(result => result.json());
	},
	FetchFbPlace(id) {
		return fetch(`https://graph.facebook.com/v4.0/${id}`).then(result =>
			result.json()
		);
	}
};
