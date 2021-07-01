export default (presentive) => {
  const { container } = presentive;

  const updateViewScale = () => {
    const firstSlide = presentive.slides[0];

    if (!firstSlide) return;

    const { innerWidth, innerHeight } = window;
    const { offsetWidth, offsetHeight } = firstSlide.element;

    const widthRatio = offsetWidth / innerWidth;
    const heightRation = offsetHeight / innerHeight;
    const scale = 1 / Math.max(widthRatio, heightRation);

    container.style.setProperty("--presentive-scale", scale);
  };

  presentive.addEventListener("start", updateViewScale);

  window.addEventListener("resize", updateViewScale);
};
