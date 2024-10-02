function preloaderCounter() {
  const span = document.querySelector(".counter-text-frame>h1>span");
  let count = 0;
  let counter = setInterval(() => {
    count++;
    if (count >= 100) {
      clearInterval(counter);
    }
    span.textContent = count;
  }, 10);
}

function createWordFrames(textContainer) {
  const textFrameContainerArray = document.querySelectorAll(textContainer);

  textFrameContainerArray.forEach((textFrameContainer) => {
    const ogText = textFrameContainer.textContent;
    textFrameContainer.textContent = ""; // Clear the container

    ogText.match(/\S+\s*/g).map((word) => {
      if (word[word.length - 1] === " ") {
        word = word.trim();
        word += "&nbsp;";
      }

      const text = document.createElement("h1");
      text.innerHTML = word;

      const textFrame = document.createElement("div");
      textFrame.classList.add("text-frame");
      textFrame.style.display = "inline-block";
      textFrame.appendChild(text);
      textFrameContainer.appendChild(textFrame);
    });
  });
}

function LoadingAnimation() {
  // preloader Content Appears
  gsap.to("#preloader-content", {
    display: "flex",
    duration: 0.5,
  });

  gsap.from(".preloader-text-container .text-frame h1", {
    y: "600",
    rotation: "65deg",
    duration: 1.2,
    stagger: 0.05,
    ease: "power2.inOut",
  });

  gsap.from(".counter-text-frame h1", {
    y: "600",
    rotation: "65deg",
    delay: 0.9,
    duration: 0.7,
    ease: "power2.inOut",
  });

  setTimeout(preloaderCounter, 2500); // Preloader Counter Starts

  // preloader Content Disappears
  gsap.to(".preloader-text-container .text-frame h1, .counter-text-frame h1", {
    y: "-600",
    duration: 0.7,
    delay: 3.5,
    ease: "power2.inOut",

    onComplete: () => {
      gsap.to("#preloader-main", {
        display: "none",
        duration: 0.1,
        delay: .7,
      });

      gsap.to("#preloader", {
        display: "none",
        duration: 0.1,
        delay: 1.2,
      });

      gsap.to(".preloader-skip", {
        top: "100%",
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.3,
      });

      // Hero Page Animations
      gsap.from("#page1 video", {
        scale: 1.2,
        duration: 2,
        delay: .3,
        ease: "power3.inOut",
      })

      gsap.from("#right-nav", {
        y: -200,
        duration: 1.5,
        delay: .4,
        ease: "power2.inOut",
      })

      gsap.from(".hero-text-container .text-frame h1", {
        y: "600",
        rotation: "65deg",
        duration: 1.4,
        delay: .3,
        ease: "power2.inOut",
      });

      gsap.from("#hero-content-inner", {
        y: 190,
        duration: 1.8,
        delay: .2,
        ease: "power2.inOut",
      })

      gsap.from("#scroll-indicator", {
        y: 190,
        duration: 1.8,
        delay: .2,
        ease: "power2.inOut",
      })

      gsap.from("#hero-content-inner>p", {
        opacity: 0,
        duration: 1,
        delay: 2.4,
      })

      gsap.from("#hero-content-inner>button", {
        x: -450,
        duration: 1,
        delay: 1.8,
        ease: "power2.inOut",
      })
    },
  });
}

function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function fadeText(element, posn, markers = false) {
  const para = document.querySelector(element);
  const paraContent = para.textContent.split("");
  para.innerHTML = paraContent.map((char) => `<span>${char}</span>`).join("");

  gsap.to(`${element}>span`, {
    color: "#fff",
    stagger: 0.2,
    scrollTrigger: {
      scroller: "#main",
      trigger: `${element}`,
      start: "top bottom",
      end: `bottom ${posn}`,
      scrub: 0.6,
      markers: markers,
    },
  });
}

function imgSequenceAnimation(canvasContainer, imageDir, totalImages) {
  const canvas = document.querySelector(`${canvasContainer}>canvas`);
  const ctx = canvas.getContext("2d");

  const frames = {
    currentIndex: 0,
    maxIndex: totalImages,
  };

  const images = [];
  let imagesCount = 0;

  function preloadImage() {
    for (let i = 1; i <= frames.maxIndex; i++) {
      const imgUrl = `./Assets/Images/${imageDir}/${imageDir.toLowerCase()}${i}.webp`;
      const img = new Image();
      img.src = imgUrl;

      img.onload = () => {
        imagesCount++;
        if (imagesCount === frames.maxIndex) {
          // console.log("all images loaded");
          drawImage(frames.currentIndex);
          startAnimation();
        }
      };
      images.push(img);
    }
  }

  function drawImage(index) {
    if (index >= 0 && index < frames.maxIndex) {
      const img = images[index];

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.max(scaleX, scaleY);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      frames.currentIndex = index;
    }
  }

  function startAnimation() {
    gsap.to(frames, {
      currentIndex: frames.maxIndex,
      snap: frames.currentIndex,
      onUpdate: () => {
        drawImage(Math.floor(frames.currentIndex));
      },
      scrollTrigger: {
        scroller: "#main",
        trigger: `${canvasContainer}>canvas`,
        start: "top top",
        end: "300% top",
        scrub: 1,
      },
    });
  }

  ScrollTrigger.create({
    trigger: canvasContainer,
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "300% top",
  });

  preloadImage();
}

function animateCircle() {
  const counter = document.querySelector(".counter");

  gsap.from(".page7-circle", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".page7-circle",
      scroller: "#main",
      // markers: true,
      start: "top center",
      end: "top top",
      scrub: 0.7,
    },
  });

  if (window.innerWidth < 768) {
    gsap.to(".page7-circle", {
      width: "100vw",
      height: "100vw",
      transformOrigin: "center center",
      repeat: 1,
      yoyo: true,
      scrollTrigger: {
        trigger: ".page7-circle",
        scroller: "#main",
        // markers: true,
        start: "top center",
        end: "bottom+=1000% top",
        scrub: 0.7,
      },
    });

    gsap.from(".page7-circle", {
      y: -540,
      scrollTrigger: {
        trigger: ".page7-circle",
        scroller: "#main",
        // markers: true,
        start: "top center",
        end: "bottom+=100% top",
        scrub: 0.7,
      },
    });
  } else {
    gsap.to(".page7-circle", {
      width: "42vw",
      height: "42vw",
      transformOrigin: "center center",
      repeat: 1,
      yoyo: true,
      scrollTrigger: {
        trigger: ".page7-circle",
        scroller: "#main",
        // markers: true,
        start: "top center",
        end: "bottom+=1000% top",
        scrub: 0.7,
      },
    });

    gsap.from(".page7-circle", {
      y: -840,
      scrollTrigger: {
        trigger: ".page7-circle",
        scroller: "#main",
        // markers: true,
        start: "top center",
        end: "bottom+=100% top",
        scrub: 0.7,
      },
    });
  }

  gsap.to("#page7", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      // markers: true,
      start: "top+=1% top-=1%",
      end: "1% top",
      scrub: 0.7,
    },
  });

  gsap.to(".page7-circle-inn", {
    backgroundColor: "#0a3bceb4",
    scrollTrigger: {
      trigger: ".page7-circle-inn",
      scroller: "#main",
      // markers: true,
      start: "top center",
      end: "bottom+=600% top",
      scrub: true,
      onUpdate: (self) => {
        const scrollProgress = self.progress;
        const scrollValue = gsap.utils.mapRange(0, 1, 0, 60, scrollProgress);
        counter.textContent = scrollValue.toFixed(0);
      },
    },
  });
}

function page9Animation() {
  gsap.from("#page9-right>img", {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: "#page9-right>img",
      scroller: "#main",
      start: "top center+=20%",
      end: "bottom top",
    },
  });

  gsap.from("#page10-wrapper .features-section", {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page10-wrapper .features-section",
      scroller: "#main",
      start: "top center+=35%",
      end: "bottom top",
    },
  });
}

function disableDataScrollOnMobile() {
  const element = document.querySelector("[data-scroll]");
  if (window.innerWidth <= 768) {
    element.removeAttribute("data-scroll");
    element.removeAttribute("data-scroll-speed");
    element.removeAttribute("class");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createWordFrames(".preloader-text-container");
  createWordFrames(".hero-text-container");
  LoadingAnimation();
  disableDataScrollOnMobile();
  locoScroll();
  fadeText("#page2-content>p", "40%");
  imgSequenceAnimation("#page3", "Frame", 66);
  fadeText("#page4-content>p", "37%");
  imgSequenceAnimation("#page5", "Bridge", 39);
  fadeText("#page6-content>p", "40%");
  imgSequenceAnimation("#page7", "Lore", 136);
  animateCircle();
  page9Animation();
});
