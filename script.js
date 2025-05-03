/* script.js — упрощённая и надёжная схема */

gsap.registerPlugin(ScrollTrigger);

// для каждого .scene создаём собственный ScrollTrigger
gsap.utils.toArray(".scene").forEach((scene, idx) => {
  const lettersLayer   = scene.querySelector(".full-screen");
  const contentLayer   = scene.querySelector(".after-content");

  // убедимся, что следующий слой изначально невидим
  gsap.set(contentLayer, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top top",   // когда верх сцены дошёл до верха окна
      end: "bottom top",  // когда низ сцены дошёл до верха окна
      scrub: true,
      pin: true,          // «прилипаем» ровно на высоту сцены
      anticipatePin: 1,
      snap: {
        snapTo: 1,        // снап на начало/конец
        duration: 0.3,
        ease: "power1.inOut"
      },
      // markers: true      // включи, если хочешь видеть маркеры в dev‑tools
    }
  });

  // 1) гасим весь красный слой (и буквы вместе с ним)
  tl.to(lettersLayer, { opacity: 0, duration: 0.5 }, 0);
  // 2) параллельно проявляем следующий контент
  tl.to(contentLayer, { opacity: 1, duration: 0.5 }, 0);
});
