export const MOCKEABLE = Symbol("MOCKEABLE");

export function mockeable() {
  return function(target, propertyName, descriptor) {
    const original = descriptor.value;

    descriptor.value = function() {
      const result = original.apply(this, arguments);

      if (!this[MOCKEABLE]) {
        this[MOCKEABLE] = {};
      }

      const url = new URL(`http:${result}`);

      this[MOCKEABLE][propertyName] = `${url.hostname}${url.pathname}`;

      return result;
    };
  };
}
