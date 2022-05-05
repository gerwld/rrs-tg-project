

const THREE_BL_WIDTH = 800;
const ONE_BL_WIDTH = 550;
const JUMP_RANGE = 100;
const IS_AUTOSCROLL = false;
const AUTOSCROLL_TIMEOUT = 2600;


const container = document.getElementById("ctg_rss");
const cards = document.getElementById("ctg_rss_content");
const btnBack = document.getElementById("btn_back");
const btnForw = document.getElementById("btn_forw");
const swipeBlock = document.getElementById("ctg_swipe_block");

let elemWidth;
let offsetLeft = 0;
let paddingSize = 10;

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

  elemWidth = cards.querySelector(".slide_block").offsetWidth;
  offsetLeft = 0;
  cards.style.left = `${offsetLeft}px`;
}

resizeBlock();
window.addEventListener("onlaod", resizeBlock);
window.addEventListener("resize", resizeBlock);

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

if(IS_AUTOSCROLL) {
  container.addEventListener("mouseover", () => {
    clearInterval(autoScroll);
  });
  container.addEventListener("mouseleave", () => {
    autoScroll = setInterval(autoScrollTm, AUTOSCROLL_TIMEOUT);
  });

  var autoScroll = setInterval(autoScrollTm, AUTOSCROLL_TIMEOUT);
  function autoScrollTm() {
    const container_rect = container.getBoundingClientRect();
    const cards_rect = cards.getBoundingClientRect();
    if(container_rect.right < cards_rect.right - 100) {
      offsetLeft += elemWidth;
    } else {
      offsetLeft = 0;
    }
    cards.style.left = `-${offsetLeft}px`;
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
    offsetLeft = newValue;
    cards.style.left = `${offsetLeft}px`;
  }
  setTimeout(alignVisBlock, 200);
});

function alignVisBlock() {
  offsetLeft = Math.round(offsetLeft / elemWidth) * elemWidth;
  cards.style.left = `${offsetLeft}px`;
}

