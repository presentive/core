class Slide extends EventTarget {
  constructor(element, options) {
    super();

    this._element = element;
    this._options = options;
    this._isActive = false;
    this._visitCount = 0;
  }

  // public getters
  get element() {
    return this._element;
  }

  get isActive() {
    return this._isActive;
  }

  get isVisited() {
    return this._visitCount > 0;
  }

  get title() {
    const [title] = this._element.querySelectorAll("h1, h2, h3, h4, h5, h6");
    return title ? title.innerText : "";
  }

  // public methods
  activate() {
    if (this._isActive) return;

    this._visitCount++;

    const { activeSlideClass } = this._options;
    this._element.classList.add(activeSlideClass);

    this._isActive = true;
    this.dispatchEvent(new Event("activate"));
  }

  deactivate() {
    const { activeSlideClass, visitedSlideClass } = this._options;
    this._element.classList.replace(activeSlideClass, visitedSlideClass);

    this._isActive = false;
    this.dispatchEvent(new Event("deactivate"));
  }
}

export default Slide;
