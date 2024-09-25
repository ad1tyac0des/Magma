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
  para.innerHTML = paraContent.map(char => `<span>${char}</span>`).join("");

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
    }
  });
}

function imgSequenceAnimation(canvasContainer, imageDir, totalImages) {
  const canvas = document.querySelector(`${canvasContainer}>canvas`)
  const ctx = canvas.getContext("2d");

  const frames = {
    currentIndex: 0,
    maxIndex: totalImages,
  }

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
          console.log("all images loaded");
          drawImage(frames.currentIndex);
          startAnimation();
        }
      }
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
        console.log(Math.floor(frames.currentIndex));
        drawImage(Math.floor(frames.currentIndex));
      },
      scrollTrigger: {
        scroller: "#main",
        trigger: `${canvasContainer}`,
        start: "top top",
        end: "bottom top",
        pin: true,
        markers: true,
        scrub: 1,
      }
    })
  }

  preloadImage();
}


locoScroll();
fadeText("#page2-content>p", "40%");
imgSequenceAnimation("#page3", "Frame", 66);
fadeText("#page4-content>p", "37%", true);
imgSequenceAnimation("#page5", "Bridge", 39);
fadeText("#page6-content>p", "40%");