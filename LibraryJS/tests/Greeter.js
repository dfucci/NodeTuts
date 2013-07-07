var Greeter;
Greeter = (function() {
  function Greeter() {}
  Greeter.prototype.sayHello = function() {
    return print('Hello World');
  };
  return Greeter;
})();