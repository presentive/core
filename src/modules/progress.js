export default (presentive) => {
  const { container } = presentive;

  const progress = document.createElement("div");

  const createProgress = () => {
    progress.classList.add(presentive.options.progressClass);
    container.append(progress);
  };

  const updateProgress = () => {
    const { activeSlideIndex, slides } = presentive;
    const width = (100 * (activeSlideIndex + 1)) / slides.length;
    progress.style.width = `${width}%`;
  };

  presentive.addEventListener("start", createProgress);
  presentive.addEventListener("slidechange", updateProgress);
};
