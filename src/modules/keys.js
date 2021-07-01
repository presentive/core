import { match } from "../utils";

export default (presentive) => {
  const prevSlideKeys = ["ARROWLEFT", "ARROWUP", "PAGEUP", "H", "K", "P"];
  const nextSlideKeys = ["ARROWRIGHT", "ARROWDOWN", "PAGEDOWN", "L", "J", "N"];

  const doSlideActions = (event) => {
    match(event.key.toUpperCase())
      .on(
        (key) => prevSlideKeys.includes(key),
        () => presentive.prev()
      )
      .on(
        (key) => nextSlideKeys.includes(key),
        () => presentive.next()
      )
      .on(
        (key) => key === " ",
        () => presentive.next()
      );
  };

  window.addEventListener("keydown", doSlideActions);
};
