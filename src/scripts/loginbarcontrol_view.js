/* global _ Backbone */

/* exported LoginBarControlView */
const LoginBarControlView = Backbone.View.extend({

  // PROPERTY DEFINITION

  className: 'login-bar-control-view',

  loginFragment: 'login',

  logoutFragment: 'logout',

  tagName: 'p',

  template: function() {
    if (this.model.isLoggedIn()) {
      return `
        <a href="#${_.result(this, 'loginFragment')}" class="btn btn-default btn-logout">
          Logout - <strong>${this.model.escape('userID')}</strong>
        </a>
      `;
    } else {
      return `
        <a href="#${_.result(this, 'loginFragment')}" class="btn btn-default btn-login">
          Login
        </a>
      `;
    }
  },

  // EVENT DEFINITION

  // METHOD DEFINITION

  render: function() {
    this.$el.html(_.result(this, 'template'));
    return Promise.resolve();
  },

  // INITIALIZE DEFINITION

  initialize: function(options = {}) {
    if (options.loginFragment) {
      this.loginFragment = options.loginFragment;
    }

    if (options.logoutFragment) {
      this.logoutFragment = options.logoutFragment;
    }

    this.listenTo(this.model, 'change', this.render);
  }
});
