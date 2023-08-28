import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';

(function init() {
  const reveal = new Reveal({
    plugins: [Markdown, Highlight],
    hash: true,
  });

  function resetSlideScrolling(slide) {
    slide.classList.remove('scrollable-slide');
  }

  function handleSlideScrolling(slide) {
    if (slide.scrollHeight >= 800) {
      slide.classList.add('scrollable-slide');
    }
  }

  reveal.addEventListener('ready', function (event) {
    handleSlideScrolling(event.currentSlide);
  });

  reveal.addEventListener('slidechanged', function (event) {
    const isFirstSlide = event.indexh === 0 && event.indexv === 0;
    const display = isFirstSlide ? 'flex' : 'none';
    const footer = document.querySelector('.footer');
    footer && (footer.style.display = display);
    if (event.previousSlide) {
      resetSlideScrolling(event.previousSlide);
    }
    handleSlideScrolling(event.currentSlide);
  });

  reveal.initialize();
})();
