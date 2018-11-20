function xss_escape(str) {
  return 'string' === typeof str ? str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;') : str;
}

window.jQuery.ajaxSetup({
  dataFilter: function(data) {
    return xss_escape(data);
  }
});
