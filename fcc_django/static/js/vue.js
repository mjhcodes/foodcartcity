

///////////// VUE COMPONENTS //////////////

Vue.component("card", {
	props: ["image", "name", "address", "phone", "website"],
	data: function() {
		return {
			tel: "tel:",
		}
	},
	template: `
		<div class="card medium">
			<div class="card-image center-align">
				<img :src="image" alt="food cart city logo">
				<span class="card-title center-align">{{ name }}</span>
			</div>
			<div class="card-content center-align valign-wrapper">
				<p>{{ address }}</p>
			</div>
			<div class="card-action center-align">
				<a :href="tel + phone"><i class="material-icons">local_phone</i></a>
				<a :href="website"><i class="material-icons">desktop_mac</i></a>
			</div>
		</div>
	`
})



///////////// VUE ROOT //////////////

const mykey = config.ZOMATO_KEY;

new Vue({
  el: "#app",
  delimiters: ["[[", "]]"],
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
					"sort": "rating",
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