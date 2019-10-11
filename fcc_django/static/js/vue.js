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

Vue.component("navbar", {
  props: ["value"],
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    }
  },
  template: `
    <div>
      <nav>
        <div class="nav-wrapper white">
          <a href="#!" class="brand-logo"><img src="../static/img/fcclogo.png" style="height: 50px;"></a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger" style="margin-left: 8.5%;"><i class="material-icons green-text text-darken-4">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li>
              <div class="search-wrapper focused">
                <input class="black-text" id="search" placeholder="Search" v-bind:value="value" v-on:input="updateValue($event.target.value)" />
              </div>
            </li>
            <li class="center-align" style="width: 140px; margin-left: 35px;"><a href="#" class="green-text text-darken-4" style="padding-left: 25px; padding-right: 25px;">SIGN IN</a></li>
            <li style="width: 140px"><a href="#" class="green darken-4 white-text" style="padding-left: 20px; padding-right: 20px;">GET STARTED</a></li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
        <a href="#!" class="brand-logo"><img src="../static/img/fcclogo.png" style="width: 90%; margin-top: 25px; margin-bottom: 25px;"></a>
        <li>
          <div class="search-wrapper focused center-align">
            <input style="width: 80%;" id="search" placeholder="Search" v-bind:value="value" v-on:input="updateValue($event.target.value)" />
          </div>
        <li>
        <li><a href="#">SIGN IN</a></li>
        <li><a href="#">GET STARTED</a></li>
      </ul>
    </div>
  `
})

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
      <div style="height: 10vh; padding-right: 10%; padding-left: 10%;" class="valign-wrapper">
        <p style="margin: 0; width: 100%;" class="center-align" v-for="cuisine in cart.cuisines">{{ cuisine.name }}</p>
      </div>
      <div style="margin: 0" class="divider"></div>
      <div style="height: 17.5vh; padding-right: 10%; padding-left: 10%;" class="valign-wrapper grey lighten-5">
        <a :href="googleMaps + cart.address" target="_blank" class="black-text" style="width: 100%">{{ cart.address }}</a>
      </div>
      <div style="margin: 0" class="divider"></div>
      <div style="display: flex; justify-content: space-evenly; height: 10vh;" class="valign-wrapper">
        <a :href="tel + cart.phone" v-if="cart.phone"><i class="green-text text-darken-3 fas fa-phone-alt fa-lg"></i></a>
        <a :href="cart.website" v-if="cart.website" target="_blank"><i class="green-text text-darken-3 fas fa-desktop fa-lg"></i></a>
        <a :href="mailto + cart.email" v-if="cart.email"><i class="green-text text-darken-3 fas fa-paper-plane fa-lg"></i></a>
        <a :href="cart.facebook" v-if="cart.facebook" target="_blank"><i class="green-text text-darken-3 fab fa-facebook fa-lg"></i></a>
        <a :href="cart.instagram" v-if="cart.instagram" target="_blank"><i class="green-text text-darken-3 fab fa-instagram fa-lg"></i></a>
        <a :href="cart.twitter" v-if="cart.twitter" target="_blank"><i class="green-text text-darken-3 fab fa-twitter fa-lg"></i></a>
        <a :href="cart.yelp" v-if="cart.yelp" target="_blank"><i class="green-text  text-darken-3 fab fa-yelp fa-lg"></i></a>
      </div>
      <div style="margin: 0" class="divider"></div>
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
    }
  }
})

M.AutoInit();