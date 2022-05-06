const container = document.getElementById("ctg_rss");
const cards = document.getElementById("ctg_rss_content");
const btnBack = document.getElementById("btn_back");
const btnForw = document.getElementById("btn_forw");
const swipeBlock = document.getElementById("ctg_swipe_block");

const THREE_BL_WIDTH = 800;
const ONE_BL_WIDTH = 550;
const JUMP_RANGE = 100;
const IS_AUTOSCROLL = true;
const AUTOSCROLL_TIMEOUT = 2000;

let elemWidth;
let offsetLeft = 0;
let startx;
let paddingSize = 10;

const urlP = new URLSearchParams(window.location.search);
const IS_TG_BAR_SHOW = urlP.get("show_telegram") !== "no";

function resizeBlock() {
  if (container.offsetWidth >= THREE_BL_WIDTH) {
    cards.querySelectorAll(".slide_block").forEach((e) => {
      let size = container.offsetWidth / 3 - paddingSize;
      e.style = `max-width: ${size}px; width: ${size}px; flex: 0 0 ${size}px`;
    });
  }
  if (container.offsetWidth >= ONE_BL_WIDTH && container.offsetWidth < THREE_BL_WIDTH) {
    cards.querySelectorAll(".slide_block").forEach((e) => {
      let size = container.offsetWidth / 2 - paddingSize;
      e.style = `max-width: ${size}px; width: ${size}px; flex: 0 0 ${size}px`;
    });
  }
  if (container.offsetWidth < ONE_BL_WIDTH) {
    cards.querySelectorAll(".slide_block").forEach((e) => {
      let size = container.offsetWidth - paddingSize;
      e.style = `max-width: ${size}px; width: ${size}px; flex: 0 0 ${size}px`;
    });
  }

  elemWidth = cards.querySelector(".slide_block") ? cards.querySelector(".slide_block").offsetWidth : 400;
  offsetLeft = 0;
  IS_TG_BAR_SHOW && container.classList.add("with_tg");
  cards.style.left = `${offsetLeft}px`;
}

window.addEventListener("onlaod", resizeBlock);
window.addEventListener("resize", resizeBlock);
resizeBlock();

btnBack.addEventListener("click", () => {
  if (offsetLeft - elemWidth >= 0) {
    offsetLeft -= elemWidth;
  } else offsetLeft = cards.offsetWidth - container.offsetWidth;
  cards.style.left = `-${offsetLeft}px`;
});

btnForw.addEventListener("click", () => {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (cards_rect.right - 50 > container_rect.right) {
    offsetLeft += elemWidth;
  } else offsetLeft = 0;
  cards.style.left = `-${offsetLeft}px`;
});

if (IS_AUTOSCROLL) {
  container.addEventListener("mouseover", () => {
    clearInterval(autoScroll);
  });
  container.addEventListener("mouseleave", () => {
    autoScroll = setInterval(autoScrollTm, AUTOSCROLL_TIMEOUT);
  });

  var autoScroll = setInterval(autoScrollTm, AUTOSCROLL_TIMEOUT);
  function autoScrollTm() {
    offsetLeft += elemWidth;
    cards.style.left = `-${offsetLeft}px`;
    alignVisBlock();
  }
}

// **** Swipe block logic **** //

let isPressedDown = false;
let cursorXSpace;

swipeBlock.addEventListener("mousedown", (e) => {
  container.style.cursor = "grabbing";
  cursorXSpace = e.offsetX - cards.offsetLeft;
  isPressedDown = true;
});

swipeBlock.addEventListener("mouseup", () => {
  container.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
});

swipeBlock.addEventListener("mousemove", (e) => {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (!isPressedDown) return;
  e.preventDefault();

  let newValue = e.offsetX - cursorXSpace;
  if (newValue < JUMP_RANGE && newValue > (cards_rect.width - container_rect.width + JUMP_RANGE) * -1) {
    offsetLeft = Math.abs(newValue);
    if (newValue >= 0) {
      cards.style.left = `${offsetLeft}px`;
    } else cards.style.left = `-${offsetLeft}px`;
  }
  setTimeout(alignVisBlock, 200);
});

function alignVisBlock() {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (container_rect.right < cards_rect.right - 50) {
    offsetLeft = Math.round(offsetLeft / elemWidth) * elemWidth;
  } else {
    offsetLeft = 0;
  }
  cards.style.left = `-${offsetLeft}px`;
}

// Mobile scroll

swipeBlock.addEventListener(
  "touchstart",
  (e) => {
    isPressedDown = true;
    startx = e.targetTouches[0].clientX - cards.offsetLeft;
  },
  { passive: true }
);

swipeBlock.addEventListener(
  "touchmove",
  (e) => {
    if (!isPressedDown) return;
    x = e.targetTouches[0].clientX;
    let offset = x - startx;

    if (offset >= 0) offsetLeft = 0;
    else offsetLeft = Math.abs(offset);
    cards.style.left = `-${offsetLeft}px`;
  },
  { passive: true }
);

swipeBlock.addEventListener("touchend", () => {
  isPressedDown = false;
  setTimeout(alignVisBlock, 20);
});
