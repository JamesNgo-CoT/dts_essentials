/* global LoginPageView util */

/* exported loginPageRouter */
const loginPageRouter = (ref) => function(query) {
  if (ref.app) {
    ref.app.setTitle('Login');

    ref.app.setBreadcrumb([{
      'name': ref.app.name,
      'link': '#'
    }, {
      'name': 'Login',
      'link': `#${loginPageRouter.route}`
    }], true);
  }

  Promise.resolve().then(() => {
    if (ref.loginModel.isLoggedIn()) {
      return ref.loginModel.reLogin();
    } else {
      return false;
    }
  }).then((isLoggedIn) => {
    if (isLoggedIn) {
      const queryObject = util.queryStringToObject(query);
      const redirect = queryObject['redirect'] || this.homeFragment || '';
      this.navigate(redirect, { trigger: true });
    } else {
      if (loginPageRouter.view) {
        loginPageRouter.view.remove();
      }

      loginPageRouter.view = new LoginPageView({ model: ref.loginModel });
      loginPageRouter.view.$el.hide();

      Promise.resolve().then(() => {
        return loginPageRouter.view.render();
      }).then(() => {
        return ref.showView('default', loginPageRouter.view);
      });
    }
  }).catch((error) => {
    console.error(error);
  });
};

loginPageRouter.route = 'login';

loginPageRouter.view = null;
