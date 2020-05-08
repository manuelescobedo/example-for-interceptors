export const NOTIFIABLE = Symbol("NOTIFIABLE");

export function notifiable(args = {}) {
  args = Object.assign({ method: "POST" }, args);

  return function(target, propertyName, descriptor) {
    const original = descriptor.value;

    descriptor.value = function() {
      const result = original.apply(this, arguments);

      if (!this[NOTIFIABLE]) {
        this[NOTIFIABLE] = {};
      }

      const url = new URL(`http:${result}`);

      this[NOTIFIABLE][propertyName] = {
        url: `${url.hostname}${url.pathname}`,
        ...args
      };

      return result;
    };
  };
}
