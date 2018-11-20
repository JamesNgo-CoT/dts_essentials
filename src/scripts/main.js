// The main javascript file for dts_essentials.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

/* global Backbone BaseRouter cot_app LoginBarControlView LoginModel */

$(function () {
  const appName = 'DTS Essentials';
  const ref = {};

  // COT APP

  if (window['cot_app']) { //the code in this 'if' block should be deleted for embedded apps
    const app = new cot_app(appName, {
      hasContentTop: false,
      hasContentBottom: false,
      hasContentRight: false,
      hasContentLeft: false,
      searchcontext: 'INTRA'
    });

    ref.app = app;

    app.setBreadcrumb([{
      'name': app.name, 'link': '#'
    }], true).render();
  }

  const $container = $('#dts_essentials_container');

  // LOGIN

  const ThisLoginModel = LoginModel.extend({
    url: 'https://was-intra-sit.toronto.ca/c3api_auth/v2/AuthService.svc/AuthSet'
  });

  const loginModel = new ThisLoginModel({ app: appName });

  ref.loginModel = loginModel;

  const ThisLoginBarControlView = LoginBarControlView.extend({
    loginFragment: loginPageRouter.route,
    logoutFragment: 'logout'
  });

  const loginBarControlView = new ThisLoginBarControlView({
    model: loginModel
  });
  loginBarControlView.$el.appendTo($container);
  loginBarControlView.render();

  // ROUTER

  ref.containers = {
    default: $('<div></div>').appendTo($container)
  };

  ref.showView = function(container, view) {
    for (const key in ref.containers) {
      if (key === container) {
        ref.containers[key].children().hide();
        view.$el.appendTo(ref.containers[key]).show();
        ref.containers[key].show();
      } else {
        ref.containers[key].hide();
      }
    }
  };

  /* global loginPageRouter */

  const ThisRouter = BaseRouter.extend({
    homeFragment: '',

    routes: {
      'login': loginPageRouter(ref),

      'logout': function() {},

      '': function() {},

      '*default': 'defautRoute'
    }
  });
  new ThisRouter();

  Backbone.history.start();
});
