/**
 * Decorate function or method with .enable() and .disable() methods.
 * @param {function|object} target
 * @param {string} [prop]
 * @returns {function}
 */
function noopable(target, prop) {
    var obj, fn,
        patched,
        disabled = false;

    if (arguments.length > 1) obj = target, fn = target[prop];
    else fn = target;

    if (fn.noopable) return fn;

    patched = function() {
        if (!disabled) fn.apply(this, arguments);
    }

    patched.noopable = true;
    patched.disable = function() {disabled = true; return patched;}
    patched.enable = function() {disabled = false; return patched;}

    if (obj) {
        patched.restore = function() {obj[prop] = fn;}
        obj[prop] = patched;
    }

    return obj ? patched.bind(obj) : patched;
}

/** export noopable function */
module.exports = noopable;
