import Slide from "./slide";

class Presentive extends EventTarget {
  constructor(options) {
    super();

    this.options = options;

    this._isStarted = false;
    this._container = null;
    this._slides = [];

    this._modules = [];
  }

  // public getters
  get container() {
    return this._container;
  }

  get slides() {
    return this._slides;
  }

  get activeSlide() {
    return this._slides.find((slide) => slide.isActive);
  }

  get activeSlideIndex() {
    return this._slides.findIndex((slide) => slide.isActive);
  }

  // overload
  dispatchEvent(event) {
    if (!this._isStarted) return false;
    return super.dispatchEvent(event);
  }

  //  public methods
  configure(options) {
    if (this._isStarted) {
      throw new Error("Presentive should be configure before it is started");
    }

    Object.assign(this.options, options);
  }

  use(module) {
    this._modules.push(module);
  }

  start() {
    if (this._isStarted) return;

    const { containerSelector } = this.options;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      throw new Error(
        `Presentive container with selector ${containerSelector} was not found.`
      );
    }

    this._defineSlides();
    this._installModules();

    this._isStarted = true;
    this.dispatchEvent(new Event("start"));

    this.first();
  }

  // navigation actions
  goTo(index) {
    const targetSlide = this._slides[index];

    if (targetSlide) {
      this.activeSlide && this.activeSlide.deactivate();
      targetSlide.activate();

      this.dispatchEvent(new Event("slidechange"));
    }
  }

  goBy(delta) {
    this.goTo(this.activeSlideIndex + delta);
  }

  prev(isForce) {
    const event = new Event("prev", { cancelable: !isForce });
    this.dispatchEvent(event) && this.goBy(-1);
  }

  next(isForce) {
    const event = new Event("next", { cancelable: !isForce });
    this.dispatchEvent(event) && this.goBy(1);
  }

  first() {
    this.goTo(0);
    this.dispatchEvent(new Event("first"));
  }

  last() {
    this.goTo(this._slides.length - 1);
    this.dispatchEvent(new Event("last"));
  }

  // private methods
  _defineSlides() {
    const { slideSelector } = this.options;
    const visibleSlideSelector = `${slideSelector}:not([visible])`;
    const visibleSlideElements =
      this._container.querySelectorAll(visibleSlideSelector);

    this._slides = Array.from(
      visibleSlideElements,
      (slideElement) => new Slide(slideElement, this.options)
    );
  }

  _installModules() {
    this._modules.forEach((module) => module(this));
  }
}

export default Presentive;
