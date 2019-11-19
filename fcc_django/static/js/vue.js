///////////// VUEX STORE //////////////

const store = new Vuex.Store({
  state: {
    cartObject: ""
  },
  mutations: {
    passCart (state, currentCart) {
      state.cartObject = currentCart
    }
  },
});

///////////// VUE COMPONENTS //////////////

Vue.component("card", {
  props: ["cart"],
  methods: {
    cartSideNav(currentCart) {
      store.commit("passCart", currentCart)
    }
  },
	template: `
		<div class="card hoverable">
			<div class="card-image content waves-effect waves-block waves-light">
        <a href="#" data-target="slide-out" class="sidenav-trigger" @click="cartSideNav(cart)">
          <div class="content-overlay"></div>
          <img class="content-image" :src="cart.image" alt="Image of a food cart">
          <div class="content-details fadeIn-top">
            <h3 class="flow-text">{{ cart.name }}</h3>
            <p class="flow-text">{{ cart.neighborhood }}</p>
          </div>
        </a>
			</div>
		</div>
	`
})

Vue.component("slideout", {
	data: function() {
		return {
      tel: "tel:",
      mailto: "mailto:",
      googleMaps: "https://www.google.com/maps/place/",
		}
  },
  computed: {
    cart() {
      return store.state.cartObject
    }
  },
  template: `
    <div id="slide-out" class="sidenav">
      <div class="user-view" style="margin: 0; height: 300px">
        <div class="background">
          <img :src="cart.image" style="width: 100%">
        </div>
      </div>
      <div style="height: 22.5vh; padding-right: 10%; padding-left: 10%;" class="valign-wrapper">
        <h3 style="margin: 0; width: 100%" class="center-align">{{ cart.name }}</h3>
      </div>
      <div style="margin: 0" class="divider"></div>
      <div style="height: 10vh; padding-right: 5px; padding-left: 5px;" class="valign-wrapper cart-cuisine-background">
        <p style="margin: 0; width: 100%; padding-right: 2.5px; padding-left: 2.5px;" class="center-align" v-for="cuisine in cart.cuisines">{{ cuisine.name }}</p>
      </div>
      <div style="margin: 0" class="divider"></div>
      <div style="height: 17.5vh; padding-right: 10%; padding-left: 10%;" class="valign-wrapper cart-address-background">
        <a :href="googleMaps + cart.address" target="_blank" class="black-text cart-address" style="width: 100%">{{ cart.address }}</a>
      </div>
      <div style="margin: 0" class="divider"></div>
      <div style="display: flex; justify-content: space-evenly; height: 10vh;" class="valign-wrapper cart-socials-background">
        <a :href="tel + cart.phone" v-if="cart.phone"><i class="black-text text-darken-3 fas fa-phone-alt fa-lg"></i></a>
        <a :href="cart.website" v-if="cart.website" target="_blank"><i class="black-text text-darken-3 fas fa-desktop fa-lg"></i></a>
        <a :href="mailto + cart.email" v-if="cart.email"><i class="black-text text-darken-3 fas fa-paper-plane fa-lg"></i></a>
        <a :href="cart.facebook" v-if="cart.facebook" target="_blank"><i class="black-text text-darken-3 fab fa-facebook fa-lg"></i></a>
        <a :href="cart.instagram" v-if="cart.instagram" target="_blank"><i class="black-text text-darken-3 fab fa-instagram fa-lg"></i></a>
        <a :href="cart.twitter" v-if="cart.twitter" target="_blank"><i class="black-text text-darken-3 fab fa-twitter fa-lg"></i></a>
        <a :href="cart.yelp" v-if="cart.yelp" target="_blank"><i class="black-text  text-darken-3 fab fa-yelp fa-lg"></i></a>
      </div>
      <div style="margin: 0" class="divider"></div>
    </div>
  `
})

Vue.component("vuefooter", {
  template: `
    <div class="footer-copyright" style="padding: 22.5px 0">
      <div class="container">
      <span>© 2019 Food Cart City</span>
      <a class="grey-text text-lighten-3 right" style="padding: 0 10px 0" href="mailto:foodcartcity@gmail.com"><i class="fcc-socials fas fa-paper-plane fa-lg"></i></a>
      <a class="grey-text text-lighten-3 right" style="padding: 0 10px 0" href="https://www.twitter.com/foodcartcity" target="_blank"><i class="fcc-socials fab fa-twitter fa-lg"></i></a>
      <a class="grey-text text-lighten-3 right" style="padding: 0 10px 0" href="https://www.instagram.com/foodcartcity" target="_blank"><i class="fcc-socials fab fa-instagram fa-lg"></i></a>
      <a class="grey-text text-lighten-3 right" style="padding: 0 10px 0" href="https://www.facebook.com/foodcartcity" target="_blank"><i class="fcc-socials fab fa-facebook fa-lg"></i></a>
      </div>
    </div>
  `
})

///////////// VUE ROOT //////////////

// const mykey = config.ZOMATO_KEY;

new Vue({
  el: "#app",
  delimiters: ["[[", "]]"],
	data () {
		return {
			searchValue: null,
			cuisineFilter: null, // not yet a feature
			page: 1,
      perPage: 12,
      pages: [],
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
    updateValue: function (value) {
      this.$emit("input", value);
    },
    setPages () {
      let numberOfPages = Math.ceil(this.carts.length / this.perPage);
      this.pages = [];
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (carts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return carts.slice(from, to);
    },
    prevPage () {
      if (this.page != 1) {
        this.page--
      }
    },
    nextPage () {
      if (this.page < Math.ceil(this.carts.length / this.perPage)) {
        this.page++
      }
    },
  },
  mounted: function () {
    this.listCarts();
    this.listCuisines();
  },
  watch: {
    searchValue: function () {
      this.page = 1;
      this.listCarts();
    },
    carts () {
      this.setPages();
    }
  },
  computed: {
    displayedCarts () {
      return this.paginate(this.carts);
    },
  }
})

M.AutoInit();