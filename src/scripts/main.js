// The main javascript file for dts_essentials.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

$(function () {
  if (window['cot_app']) { //the code in this 'if' block should be deleted for embedded apps
    const app = window.app = new cot_app('dts_essentials', {
      hasContentTop: false,
      hasContentBottom: false,
      hasContentRight: false,
      hasContentLeft: false,
      searchcontext: 'INTRA'
    });

    app.setBreadcrumb([{
      'name': app.name, 'link': '#'
    }], true).render();
  }

  const $container = $('#dts_essentials_container');

  const formDefinition = {
    rootPath: '/* @echo SRC_PATH */',

    sections: [{
      title: 'Section',

      rows: [{
        fields: [{
          readOnly: true,
          title: 'number',
          type: 'number',
          value: '123',

          preRender: function() { console.log('PRE RENDER', 'number'); },
          postRender: function() { console.log('POST RENDER', 'number'); }
        }]
      }, {
        fields: [{
          readOnly: true,
          title: 'email',
          type: 'email',
          value: '123',

          preRender: function() { console.log('PRE RENDER', 'email'); },
          postRender: function() { console.log('POST RENDER', 'email'); }
        }]
      }, {
        fields: [{
          readOnly: true,
          title: 'phone',
          type: 'phone',
          value: '123',

          preRender: function() { console.log('PRE RENDER', 'phone'); },
          postRender: function() { console.log('POST RENDER', 'phone'); }
        }]
      }, {
        fields: [{
          choices: [{ text: 'text' }],
          readOnly: true,
          title: 'dropdown',
          type: 'dropdown',
          value: '123',

          preRender: function() { console.log('PRE RENDER', 'dropdown'); },
          postRender: function() { console.log('POST RENDER', 'dropdown'); }
        }]
      }]
    }]
  };

  const form = new CotForm(formDefinition);
  form.render({ target: $container });
});
