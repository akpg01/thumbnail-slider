/* global $ */
import "../css/styles.css";

const images = [
  {
    title: "sce1.jpeg",
    url: "src/img/sce1.jpeg"
  },
  {
    title: "sce2.jpeg",
    url: "src/img/sce2.jpeg"
  },
  {
    title: "sce3.jpeg",
    url: "src/img/sce3.jpeg"
  },
  {
    title: "sce5.jpeg",
    url: "src/img/sce5.jpeg"
  },
  {
    title: "sce6.jpeg",
    url: "src/img/sce6.jpeg"
  },
  {
    title: "sce7.jpeg",
    url: "src/img/sce7.jpeg"
  },
  {
    title: "sce8.jpeg",
    url: "src/img/sce8.jpeg"
  }
];

$(document).ready(() => {
  let slide = document.querySelector(".image_slider");

  images.forEach(elem => {
    slide.insertAdjacentHTML(
      "afterbegin",
      `
          <li><img src="${elem.url}"></li>
      `
    );
  });

  function init() {
    let imageMargin = 10;
    let ul = document.querySelector(".image_slider");
    let imageWrapper = document.querySelector(".image_slider-wrapper");
    let wrapperWidth = imageWrapper.offsetWidth; // visible window
    let liItems = ul.children;
    let imageNumber = liItems.length;
    let imageWidth = liItems[0].children[0].offsetWidth + imageMargin;
    // total width of container
    let containerWidth = imageWidth * imageNumber;
    // number of images that fit in the container
    let imageInContainer = parseInt(wrapperWidth / imageWidth);

    let menuInvisible = containerWidth - wrapperWidth - imageMargin;
    let menuOffset = menuInvisible;

    // total width of all images in slider
    ul.style.width = parseInt(containerWidth) + "px";

    // visible section is less than or equal to the rapper hide arrows
    if (containerWidth <= wrapperWidth) {
      $(".prev").hide();
      $(".next").hide();
    } else if (containerWidth >= wrapperWidth) {
      $(".prev").hide();
      $(".next").show();
    }
    let stats = {
      imageCount: imageNumber,
      imageMargin: imageMargin,
      imagesInContainer: imageInContainer,
      widthWrapper: wrapperWidth,
      widthImage: imageWidth,
      slider: ul,
      wrapper: imageWrapper,
      container: containerWidth,
      imageWidth: imageWidth,
      menuOffset: menuOffset
    };
    return stats;
  }

  let nextArrow = document.querySelector(".next");
  nextArrow.addEventListener("click", el => {
    let stats = init();
    showSlides(1);
    let scrollLeft = stats.wrapper.scrollLeft;

    if (scrollLeft >= 0 && scrollLeft < stats.menuOffset) {
      $(".prev").show();
      $(".next").show();
    } else if (scrollLeft >= stats.menuOffset) {
      $(".prev").show();
      $(".next").hide();
    }
  });

  let prevArrow = document.querySelector(".prev");
  prevArrow.addEventListener("click", () => {
    let stats = init();
    showSlides(-1);
    let scrollLeft = stats.wrapper.scrollLeft - stats.imageWidth;

    if (scrollLeft <= 0) {
      $(".prev").hide();
      $(".next").show();
    } else if (scrollLeft > 0 || scrollLeft >= stats.menuOffset) {
      $(".prev").show();
      $(".next").show();
    }
  });

  function showSlides(dir) {
    let stats = init();
    let scroll;
    if (dir === -1) {
      scroll = "-=";
    } else {
      scroll = "+=";
    }
    $(".image_slider-wrapper").animate(
      { scrollLeft: scroll + stats.widthImage },
      "slow"
    );
  }

  // responsiveness
  $(window).on("resize", () => {
    setTimeout(function() {
      beginMenu(init);
    }, 2000);
    $(".image_slider-wrapper").animate({ scrollLeft: 0 }, "fast");
  });
  setTimeout(function() {
    beginMenu(init);
  }, 2000);
});

function beginMenu(init) {
  window.onload = init();
}
