function render(tpl, data) {
  var html = $(tpl + '-template').innerHTML;
  return nunjucks.renderString(html, data);
};

function loading() {
  var html = render('loading');
  $('output').innerHTML = html;
};

function HomeRouter() {

};

Q.reg('home', HomeRouter);

Q.init({
  index: 'home'
});
