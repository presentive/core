import Presentive from "./presentive";
import defaultOptions from "./defaultOptions";
import { contentLoaded } from "./utils";

// modules
import view from "./modules/view";
import keys from "./modules/keys";
import pageTitle from "./modules/pageTitle";

const presentive = new Presentive(defaultOptions);

// apply presentive modules
presentive.use(view);
presentive.use(keys);
presentive.use(pageTitle);

Object.defineProperty(window, "presentive", {
  value: presentive,
  configurable: true,
});

contentLoaded(() => presentive.start());
