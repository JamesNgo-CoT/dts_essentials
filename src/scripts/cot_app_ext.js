cot_app.prototype.setTitle = ((setTitle) => function(title, focus = true) {
  const returnValue = setTitle.call(this, title);

  if (this.name && this.name !== title) {
    title = `${title} - ${this.name}`;
  }

  document.title = title;

  if (this.titleElement && focus !== false) {
    this.titleElement.focus();
  }

  return returnValue;
})(cot_app.prototype.setTitle);

cot_app.prototype.render = ((render) => function() {
  const returnValue = render.call(this);

  this.titleElement = document.querySelector('#app-header h1');
  this.titleElement.setAttribute('tabindex', '0');

  return returnValue;
})(cot_app.prototype.render);
