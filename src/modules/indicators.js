export default (presentive) => {
  const { container } = presentive;

  const indicators = document.createElement("div");
  const currentSlide = document.createElement("span");
  const totalSlides = document.createElement("span");

  const createIndicators = () => {
    indicators.classList.add("indicators");

    updateIndicators();

    indicators.append(currentSlide, totalSlides);
    container.append(indicators);
  };

  const updateIndicators = () => {
    currentSlide.innerText = presentive.activeSlideIndex + 1;
    totalSlides.innerText = presentive.slides.length;
  };

  presentive.addEventListener("start", createIndicators);
  presentive.addEventListener("slidechange", updateIndicators);
};
