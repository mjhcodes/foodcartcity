

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
			searchValue: null,
			cuisineFilter: null, // not yet a feature
			page: 1,
			perPage: 8,
			carts: [],
			cuisines: [],
		}
	},
  methods: {
    listCarts: function () {
      axios({
        method: 'get',
        baseURL: 'api/carts/',
        params: {
          search: this.searchValue,
          page: this.page,
        }
      })
      .then((response) => {
        console.log(response.data.results);
        this.carts = response.data.results;
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    listCuisines: function () {
      axios({
        method: 'get',
        baseURL: 'api/cuisines/',
      })
      .then((response) => {
        console.log(response.data.results);
        this.cuisines = response.data.results;
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    prevPage: function () {
      if (this.page > 1) {
        this.page--;
        this.listCarts();
      }
    },
    nextPage: function () {
      if (this.page <= (this.carts.length / this.perPage) + 1) 
        this.page++;
        this.listCarts();
    },
  },
  mounted: function () {
    this.listCarts();
    this.listCuisines();
  }
})