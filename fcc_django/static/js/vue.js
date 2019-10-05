

///////////// VUE COMPONENTS //////////////

Vue.component('card', {
	props: ['image', 'name', 'address', 'website'],
	template: `
		<div class="card medium">
			<div class="card-image center-align">
				<img :src="image" alt="food cart city logo" style="max-width: 100%">
				<span class="card-title center-align" style="width: 100%">{{ name }}</span>
			</div>
			<div class="card-content center-align valign-wrapper">
				<p>{{ address }}</p>
			</div>
			<div class="card-action center-align">
				<a style="margin-right: 0;":href="website">Website</a>
			</div>
		</div>
	`
})



///////////// VUE ROOT //////////////

const mykey = config.ZOMATO_KEY;

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
					"user-key": mykey,
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