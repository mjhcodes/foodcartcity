///////////// VUE ROOT //////////////

new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
	data () {
		return {
			restaurants: null,
			searchValue: null,
		}
	},
	methods: {
		listCarts: function() {
			axios({
				method: "get",
				baseURL: "https://developers.zomato.com/api/v2.1/",
				url: "search",
				headers: {
					"user-key": "845100fc86ee9f8dacc60cda5d0c1d7b",
				},
				params: {
					"entity_id": 286, // Portland's city ID
					"entity_type": "city",
					"q": this.searchValue,
					"establishment_type": 81, // Food Cart ID
					"count": 20,
				}
			})
			.then((response) => {
				console.log(response.data.restaurants);
				this.restaurants = response.data.restaurants;
			})
			.catch(function(error) {
				console.log(error);
			})
		}
	},
	mounted() {
		this.listCarts()
	}
})