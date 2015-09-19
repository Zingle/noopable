noopable
========
Decorate a function with .enable() and .disable() methods.

```js
var noopable = require("noopable");

// add .enable/.disable to console.log
console.log = noopable(console.log);

// disable console.log
console.log.disable();
console.log("foo");     // does nothing

// re-enable console.log
console.log.enable();
console.log("foo");     // prints 'foo'

// can also pass object and method name
noopable(console, "error");

// disable error log
console.error.disable();
console.error("error"); // does nothing

// restore original method
console.error.restore();
console.error("error"); // prints 'error'
assert(console.error.enable === undefined);
```
