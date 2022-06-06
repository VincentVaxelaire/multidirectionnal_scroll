const horizontalContainers = document.querySelectorAll('[data-horizontal-timeline="wrapper"]');

const options = {
  root: null,
  rootMargin: '0% 0% 0% 0%',
}

const observerContainers = new IntersectionObserver(function (entries, observerContainers) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    const horLength = entry.target.children[0].scrollWidth
    const distFromTop = entry.target.parentNode.offsetTop;
    const scrollDistance = distFromTop + horLength - window.innerWidth;
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset;

      if (scrollTop >= distFromTop && scrollTop <= scrollDistance) {
        entry.target.children[0].style.transform = "translateX(-" + (scrollTop - distFromTop) + "px)";
      }
    })
  });
}, options);

horizontalContainers.forEach(horizontalContainer => {
  horizontalContainer.parentNode.style.height = horizontalContainer.scrollWidth + 'px';
  observerContainers.observe(horizontalContainer);
});
