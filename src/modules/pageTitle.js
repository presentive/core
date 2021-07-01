export default (presentive) => {
  const { title } = document;

  const updateTitle = () => {
    const slide = presentive.activeSlide;

    if (slide) {
      document.title = `${slide.title} \u2014 ${title}`;
      return;
    }

    document.title = title;
  };

  presentive.addEventListener("start", updateTitle);
  presentive.addEventListener("slidechange", updateTitle);
};
