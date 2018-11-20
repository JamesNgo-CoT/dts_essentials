/* global _ Backbone CotForm */

/* exported LoginPageView */
const LoginPageView = Backbone.View.extend({

  // PROPERTY DEFINITION

  className: 'login-page-view',

  formDefinition: {
    sections: [{
      title: 'Login',

      rows: [{
        fields: [{
          required: true,
          title: 'Application',
          type: 'text'
        }]
      }, {
        fields: [{
          required: true,
          title: 'User Name',
          type: 'text'
        }]
      }, {
        fields: [{
          required: true,
          title: 'Password',
          type: 'password'
        }]
      }]
    }]
  },

  template: `
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-lg-9">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie nec nunc eget ultricies. Donec sit amet orci feugiat, cursus dolor in, facilisis ante. Aliquam eget felis et turpis porta condimentum. Fusce ut nisi ante. Quisque convallis congue diam, in convallis sapien. Ut malesuada, arcu sit amet accumsan consectetur, mauris tellus ultrices mauris, eu euismod lacus turpis et neque. Nunc vulputate leo lacus, a aliquam justo euismod quis.</p>
      </div>

      <div class="col-xs-12 col-sm-4 col-lg-3">
        <div class="loginForm">
          <p><input type="submit" value="Login" class="btn btn-block btn-lg btn-primary"></p>
        </div>
      </div>
    </div>
  `,

  // EVENT DEFINITION

  // METHOD DEFINITION

  render: function () {
    this.$el.html(_.result(this, 'template'));

    const formModel = new Backbone.Model({ app: this.model.app });

    const formDefinition = _.result(this, 'formDefinition');

    const $loginFormContainer = $('.loginForm', this.$el);
    const $loginFormContainerChildren = $loginFormContainer.children().detach();

    const form = new CotForm(formDefinition);
    form.setModel(formModel);
    form.setView(this);

    return form.render({
      target: $loginFormContainer
    }).then(() => {
      $('form', $loginFormContainer).append($loginFormContainerChildren);
    });
  }
});
