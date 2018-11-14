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
});
