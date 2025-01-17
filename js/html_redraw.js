function HTMLredraw() {
  this.bodyWrap = document.querySelector('body');
  this.gameWrap = document.querySelector('#game-wrap');
  this.scoreWrap = document.querySelector('#score');
  this.messageWrap = document.querySelector('#message');
  this.scoreNums = 4;
}

HTMLredraw.prototype.updateEggPosition = function(data) {
  this.changeAttributesValue(['data-egg-' + data.egg], [data.position]);
};

HTMLredraw.prototype.updateBasketPosition = function(data) {
  this.changeAttributesValue(['data-bx', 'data-by'], [data.x, data.y]);
};

HTMLredraw.prototype.changeAttributesValue = function(attributes, values) {
  if (attributes instanceof Array && values instanceof Array && attributes.length == values.length) {
    for (var i = 0; i < attributes.length; i++) {
      this.gameWrap.setAttribute(attributes[i], values[i]);
    }
  }
};

HTMLredraw.prototype.updateScore = function(data) {
  var elements = this.scoreWrap.getElementsByTagName('li');
  var score = data.value.toString();
  var empty = (this.scoreNums - score.length);

  for (var i = 0; i < elements.length; i++) {
    var num = (i < empty) ? 0 : parseInt(score.charAt(i - empty));
    elements[i].className = 'n-' + num;
  }
};

HTMLredraw.prototype.updateLossCount = function(data) {
  this.changeAttributesValue(['data-loss'], [data.loss]);
};

HTMLredraw.prototype.gameOver = function() {
  var msg = this.getMessage('ГАМЕ ОВЕР');

  this.messageWrap.show();
  this.messageWrap.appendChild(msg);

  document.addEventListener('click',function(e){ //FIXME: Сделано только для тачей с 1080x1920 расширением.
    window.location.href=window.location.href
  });
};

HTMLredraw.prototype.gameWin = function() {
  var msg = this.getMessage('ПОБЕДАА!!!!');

  this.messageWrap.show();
  this.messageWrap.appendChild(msg);
};

HTMLredraw.prototype.getMessage = function(message) {
  var data = { h3: message, p: ':((((' };

  var wrap = document.createElement('div');
  for (var tag in data) {
    var elem = document.createElement(tag);
    elem.innerHTML = data[tag];
    wrap.appendChild(elem);
  }

  return wrap;
};

HTMLredraw.prototype.mobileVersion = function() {
  this.bodyWrap.className = 'is-mobile';
};
