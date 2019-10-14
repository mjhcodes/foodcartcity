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
            {% if user.is_authenticated %}
            <li class="center-align" style="width: 140px; margin-left: 35px;"><a href="{% url 'logout' %}" class="green-text text-darken-4" style="padding-left: 25px; padding-right: 25px;">SIGN OUT</a></li>
            <li style="width: 140px"><a href="#" class="green darken-4 white-text" style="padding-left: 20px; padding-right: 20px;">{{ user.username }}</a></li>
            {% else %}
            <li class="center-align" style="width: 140px; margin-left: 35px;"><a href="{% url 'login' %}" class="green-text text-darken-4" style="padding-left: 25px; padding-right: 25px;">SIGN IN</a></li>
            <li style="width: 140px"><a href="{% url 'users:signup' %}" class="green darken-4 white-text" style="padding-left: 20px; padding-right: 20px;">GET STARTED</a></li>
            {% endif %}
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