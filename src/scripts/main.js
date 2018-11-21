/* global Backbone BaseRouter cot_app LoginButtonView LoginModel */

$(function () {

  // COT APP
  const app = new cot_app('/* @echo APP_NAME */', {
    hasContentTop: false,
    hasContentBottom: false,
    hasContentRight: false,
    hasContentLeft: false,
    searchcontext: 'INTRA'
  });

  app.setBreadcrumb([{
    'name': '/* @echo APP_NAME */',
    'link': '#'
  }], true);

  app.render();

  // CONTAINER
  let $container = $('#dts_essentials_container');

  // LOGIN
  const loginModel = new (LoginModel.extend({
    url: 'https://was-intra-sit.toronto.ca/c3api_auth/v2/AuthService.svc/AuthSet'
  }))();

  const loginButtonView = new (LoginButtonView.extend({}))({ model: loginModel });
  loginButtonView.$el.appendTo($container);
  loginButtonView.render();

  // ROUTER
  const router = new (BaseRouter.extend({
    homeFragment: 'home',

    routes: {
      'login': function(query) {
        console.log('LOGIN', query)
      },

      'logout': function(query) {
        console.log('LOGIN', query)
      },

      'home': function(query) {
        console.log('HOME', query);
      },

      '*default': 'defautRoute'
    }
  }))();

  loginButtonView.listenTo(router, 'route', loginButtonView.render);

  Backbone.history.start();
});
