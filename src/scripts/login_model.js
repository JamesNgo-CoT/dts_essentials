/* global _ Backbone */

/* exported LoginModel */
const LoginModel = Backbone.Model.extend({

  // PROPERTY DEFINITION

  localStorageKey: function () {
    return `${this.app} login sid`;
  },

  localStorageValue: function () {
    return this.get('sid');
  },

  // METHOD DEFINITION

  checkLogin: function () {
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn()) {
        this.reLogin().then(() => {
          resolve(this.isLoggedIn());
        }, (error) => {
          reject(error);
        })
      } else {
        resolve(false);
      }
    });
  },

  isLoggedIn: function () {
    return this.has('sid');
  },

  login: function (user, pwd) {
    return new Promise((resolve, reject) => {
      $.ajax({
        contentType: 'application/json',
        data: JSON.stringify({
          app: this.app,
          user: user,
          pwd: pwd
        }),
        method: 'POST',
        url: _.result(this, 'url')
      }).then((data) => {
        this.set(data);
        localStorage.setItem(_.result(this, 'localStorageKey'), _.result(this, 'localStorageValue'));
        resolve(data);
      }, (jqXHR, textStatus, errorThrown) => {
        reject(errorThrown);
      });
    });
  },

  logout: function () {
    return new Promise((resolve) => {
      this.clear();
      localStorage.removeItem(_.result(this, 'localStorageKey'));
      resolve();
    });
  },

  reLogin: function () {
    if (this.isLoggedIn()) {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: 'GET',
          url: `${_.result(this, 'url')}('${this.get('sid')}')`
        }).then((data) => {
          this.set(data);
          localStorage.setItem(_.result(this, 'localStorageKey'), _.result(this, 'localStorageValue'));
          resolve(data);
        }, (jqXHR, textStatus, errorThrown) => {
          reject(errorThrown);
        });
      });
    } else {
      return Promise.reject('Not logged in.');
    }
  },

  // INITIALIZE DEFINITION

  initialize: function () {
    this.app = this.get('app') || 'CoT';

    var sid = localStorage.getItem(_.result(this, 'localStorageKey'));
    if (sid) {
      this.set('sid', sid);
      this.reLogin();
    }
  }
});
