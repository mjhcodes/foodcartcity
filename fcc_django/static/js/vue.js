///////////// VUE STORES //////////////

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
  template: `
    <div>
      <nav>
        <div class="nav-wrapper light-green lighten-5">
          <a href="#!" class="brand-logo"><img src="../static/img/fcclogo.png" style="height: 50px"></a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#">SIGN IN</a></li>
            <li><a href="#">GET STARTED</a></li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
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
			<div class="card-image waves-effect waves-block waves-light">
        <a href="#" data-target="slide-out" class="sidenav-trigger" @click="cartSideNav(cart)"><img :src="cart.image" alt="food cart city logo"></a>
			</div>
		</div>
	`
})

Vue.component("slideout", {
	data: function() {
		return {
      tel: "tel:",
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
      <div class="user-view" style="height: 285px">
        <div class="background">
          <img :src="cart.image" style="width: 100%">
        </div>
      </div>
      <h4>{{ cart.name }}</h4>
      <div class="divider"></div>
      <p><a :href="googleMaps + cart.address" target="_blank">{{ cart.address }}</a></p>
      <div class="divider"></div>
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
    // prevPage: function () {
    //   if (this.page > 1) {
    //     this.page--;
    //     this.listCarts();
    //   }
    // },
    // nextPage: function () {
    //   if (this.page <= (this.carts.length / this.perPage) + 1) 
    //     this.page++;
    //     this.listCarts();
    // },
  },
  mounted: function () {
    this.listCarts();
    this.listCuisines();
  }
})

M.AutoInit();