/* global Backbone queryStringToObject queryObjectToString */

/* exported LoginButtonView */
const LoginButtonView = Backbone.View.extend({

  // PROPERTY DEFINITION

  className: 'loginbutton_view',

  loginFragment: 'login',

  logoutFragment: 'logout',

  tagName: 'p',

  // EVENT DEFINITION

  // METHOD DEFINITION

  render: function () {
    let html = '';

    const currentFragment = Backbone.history.fragment ? Backbone.history.fragment.split('?') : [];
    const loginFragment = this.loginFragment.split('?');
    const logoutFragment = this.loginFragment.split('?');

    if (currentFragment[0] !== loginFragment[0] && currentFragment[0] != logoutFragment[0]) {
      let queryObject;
      if (this.model.isLoggedIn()) {
        queryObject = queryStringToObject(logoutFragment[1]);
      } else {
        queryObject = queryStringToObject(loginFragment[1]);
      }

      if (Backbone.history.fragment) {
        queryObject['redirect'] = Backbone.history.fragment;
      }

      let queryString = queryObjectToString(queryObject);
      if (queryString) {
        queryString = `?${queryString}`;
      }

      if (this.model.isLoggedIn()) {
        html += `
          <a href="#${logoutFragment[0]}${queryString}" class="btn btn-default btn-logout">
            Logout: <strong>${this.model.escape('userID')}</strong>
          </a>
        `;
      } else {
        html += `
          <a href="#${this.loginFragment[0]}${queryString}" class="btn btn-default btn-login">
            Login
          </a>
        `;
      }
    }

    this.$el.html(html);

    return Promise.resolve();
  },

  // INITIALIZE DEFINITION

  initialize: function (options = {}) {
    if (options.loginFragment) {
      this.loginFragment = options.loginFragment;
    }

    if (options.logoutFragment) {
      this.logoutFragment = options.logoutFragment;
    }

    this.listenTo(this.model, 'change', this.render);
  }
});
