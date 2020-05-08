export const CACHEABLE = Symbol("CACHEABLE");

export function cacheable(args: { expireIn: number } = { expireIn: 1000 }) {
  const { expireIn } = args;
  return function(target, propertyName, descriptor) {
    const original = descriptor.value;

    descriptor.value = function() {
      const result = original.apply(this, arguments);

      if (!this[CACHEABLE]) {
        this[CACHEABLE] = [];
      }
      this[CACHEABLE].push({
        url: result,
        expireIn
      });

      return result;
    };
  };
}
