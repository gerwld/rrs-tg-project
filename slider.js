const container = document.getElementById("ctg_rss");
const cards = document.getElementById("ctg_rss_content");
const btnBack = document.getElementById("btn_back");
const btnFront = document.getElementById("btn_front");

const THREE_BL_WIDTH = 800;
const ONE_BL_WIDTH = 550;

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
  console.log(offsetLeft, elemWidth);
  if (offsetLeft - elemWidth >= 0) {
    offsetLeft -= elemWidth;
  } else offsetLeft = cards.offsetWidth - container.offsetWidth;

  cards.style.left = `${-offsetLeft}px`;
});

btnFront.addEventListener("click", () => {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();

  if (cards_rect.right - 50 > container_rect.right) {
    offsetLeft += elemWidth;
  } else offsetLeft = 0;

  cards.style.left = `${-offsetLeft}px`;
});
