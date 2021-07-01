export const contentLoaded = (callback) => {
  if (document.currentScript.async) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

export const match = (x) => {
  const matched = (x) => ({
    on: () => matched(x),
    otherWise: () => x,
  });

  return {
    on: (predicate, fn) => (predicate(x) ? matched(fn(x)) : match(x)),
    otherWise: (fn) => fn(x),
  };
};
