function KeyboardInputManager() {
  this.events = {};
  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  var map = {
    // TODO: добавить для тача !DONE!
    81: { x: 0, y: 1, type: 'button' }, // Верх-Лево
    69: { x: 1, y: 1, type: 'button' }, // Верх-Право
    68: { x: 1, y: 0, type: 'button' }, // Низ-Право
    65: { x: 0, y: 0, type: 'button' }, // Низ-Лево
    };
  document.addEventListener('click',function(e){ //FIXME: Сделано только для тачей с 1080x1920 расширением.
    if(e.clientX < 960 && e.clientY < 540) {
      self.emit('move', { x: 0, y: 1, type: 'button' });
    };
    if (e.clientX > 960 && e.clientY < 540) {
      self.emit('move', { x: 1, y: 1, type: 'button' });
    };
    if (e.clientX > 960 && e.clientY > 540) {
      self.emit('move', { x: 1, y: 0, type: 'button' });
    };
    if (e.clientX < 960 && e.clientY > 540) {
      self.emit('move', { x: 0, y: 0, type: 'button' });
    };
  });

  document.addEventListener('keydown', function (event) { //TODO: DELETEME, это для дебага с клавой
    var modifiers = event.altKey && event.ctrlKey && event.metaKey &&
                    event.shiftKey;
    var data    = map[event.which];
    if (!modifiers && data !== undefined) {
      event.preventDefault();
      self.emit('move', data);
    }
  });
};