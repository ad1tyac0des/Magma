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

// PARAMETERS: Paragraph Element, Length in Percentage
function fadeText(elem, posn, markers = false) {
  let letterSpans = "";
  let para = document.querySelector(elem);
  para.textContent.split("").forEach(function (letter) {
    letterSpans += `<span>${letter}</span>`;
  });
  // console.log(`${letterSpans}`); // For Debugging
  para.innerHTML = letterSpans;

  gsap.to(`${elem}>span`, {
    color: "#fff",
    stagger: 0.2,
    scrollTrigger: {
      scroller: "#main",
      trigger: `${elem}>span`,
      start: "top bottom",
      end: `bottom ${posn}`,
      scrub: 0.6,
      markers: markers,
    },
  });
}


function createImageSequenceAnimation(imgUrls, canvasContainer) {
  const canvas = document.querySelector(`${canvasContainer}>canvas`);
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    return imgUrls.split("\n")[index];
  }

  function countFrames() {
    let frameCount = imgUrls.split("\n").length;
    console.info(
      `[DEBUG] Canvas Container: ${canvasContainer} - Total Frames: ${frameCount}`
    ); // For Debugging
    return frameCount;
  }
  const frameCount = countFrames();

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `${canvasContainer}>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: `${canvasContainer}`,
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
}

locoScroll();

// Applying Canvas Image Sequence Animation on Page3
let frameUrls = `Assets/Images/Frame/frames00007.png
Assets/Images/Frame/frames00010.png
Assets/Images/Frame/frames00013.png
Assets/Images/Frame/frames00016.png
Assets/Images/Frame/frames00019.png
Assets/Images/Frame/frames00022.png
Assets/Images/Frame/frames00025.png
Assets/Images/Frame/frames00028.png
Assets/Images/Frame/frames00031.png
Assets/Images/Frame/frames00034.png
Assets/Images/Frame/frames00037.png
Assets/Images/Frame/frames00040.png
Assets/Images/Frame/frames00043.png
Assets/Images/Frame/frames00046.png
Assets/Images/Frame/frames00049.png
Assets/Images/Frame/frames00052.png
Assets/Images/Frame/frames00055.png
Assets/Images/Frame/frames00058.png
Assets/Images/Frame/frames00061.png
Assets/Images/Frame/frames00064.png
Assets/Images/Frame/frames00067.png
Assets/Images/Frame/frames00070.png
Assets/Images/Frame/frames00073.png
Assets/Images/Frame/frames00076.png
Assets/Images/Frame/frames00079.png
Assets/Images/Frame/frames00082.png
Assets/Images/Frame/frames00085.png
Assets/Images/Frame/frames00088.png
Assets/Images/Frame/frames00091.png
Assets/Images/Frame/frames00094.png
Assets/Images/Frame/frames00097.png
Assets/Images/Frame/frames00100.png
Assets/Images/Frame/frames00103.png
Assets/Images/Frame/frames00106.png
Assets/Images/Frame/frames00109.png
Assets/Images/Frame/frames00112.png
Assets/Images/Frame/frames00115.png
Assets/Images/Frame/frames00118.png
Assets/Images/Frame/frames00121.png
Assets/Images/Frame/frames00124.png
Assets/Images/Frame/frames00127.png
Assets/Images/Frame/frames00130.png
Assets/Images/Frame/frames00133.png
Assets/Images/Frame/frames00136.png
Assets/Images/Frame/frames00139.png
Assets/Images/Frame/frames00142.png
Assets/Images/Frame/frames00145.png
Assets/Images/Frame/frames00148.png
Assets/Images/Frame/frames00151.png
Assets/Images/Frame/frames00154.png
Assets/Images/Frame/frames00157.png
Assets/Images/Frame/frames00160.png
Assets/Images/Frame/frames00163.png
Assets/Images/Frame/frames00166.png
Assets/Images/Frame/frames00169.png
Assets/Images/Frame/frames00172.png
Assets/Images/Frame/frames00175.png
Assets/Images/Frame/frames00178.png
Assets/Images/Frame/frames00181.png
Assets/Images/Frame/frames00184.png
Assets/Images/Frame/frames00187.png
Assets/Images/Frame/frames00190.png
Assets/Images/Frame/frames00193.png
Assets/Images/Frame/frames00196.png
Assets/Images/Frame/frames00199.png
Assets/Images/Frame/frames00202.png`;
createImageSequenceAnimation(frameUrls, "#page3");

// Applying Canvas Image Sequence Animation on Page5
let bridgeUrls = `Assets/Images/Bridge/bridges00004.png
Assets/Images/Bridge/bridges00007.png
Assets/Images/Bridge/bridges00010.png
Assets/Images/Bridge/bridges00013.png
Assets/Images/Bridge/bridges00016.png
Assets/Images/Bridge/bridges00019.png
Assets/Images/Bridge/bridges00022.png
Assets/Images/Bridge/bridges00025.png
Assets/Images/Bridge/bridges00028.png
Assets/Images/Bridge/bridges00031.png
Assets/Images/Bridge/bridges00034.png
Assets/Images/Bridge/bridges00037.png
Assets/Images/Bridge/bridges00040.png
Assets/Images/Bridge/bridges00043.png
Assets/Images/Bridge/bridges00046.png
Assets/Images/Bridge/bridges00049.png
Assets/Images/Bridge/bridges00052.png
Assets/Images/Bridge/bridges00055.png
Assets/Images/Bridge/bridges00058.png
Assets/Images/Bridge/bridges00061.png
Assets/Images/Bridge/bridges00064.png
Assets/Images/Bridge/bridges00067.png
Assets/Images/Bridge/bridges00070.png
Assets/Images/Bridge/bridges00073.png
Assets/Images/Bridge/bridges00076.png
Assets/Images/Bridge/bridges00079.png
Assets/Images/Bridge/bridges00082.png
Assets/Images/Bridge/bridges00085.png
Assets/Images/Bridge/bridges00088.png
Assets/Images/Bridge/bridges00091.png
Assets/Images/Bridge/bridges00094.png
Assets/Images/Bridge/bridges00097.png
Assets/Images/Bridge/bridges00100.png
Assets/Images/Bridge/bridges00103.png
Assets/Images/Bridge/bridges00106.png
Assets/Images/Bridge/bridges00109.png
Assets/Images/Bridge/bridges00112.png
Assets/Images/Bridge/bridges00115.png
Assets/Images/Bridge/bridges00118.png`;
createImageSequenceAnimation(bridgeUrls, "#page5");

fadeText("#page2-content>p", "40%");
fadeText("#page4-content>p", "37%");
fadeText("#page6-content>p", "40%");