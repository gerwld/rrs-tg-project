const container = document.getElementById("ctg_rss");
const cards = document.getElementById("ctg_rss_content");
const contentWidth = cards.querySelector(".slide_block").offsetWidth + 15;

const btnBack = document.getElementById("btn_back");
const btnFront = document.getElementById("btn_front");

let offsetLeft = 0;

btnFront.addEventListener("click", (e) => {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (cards_rect.right > container_rect.right + contentWidth - 15) {
    offsetLeft += contentWidth;
    cards.style.left = `${-offsetLeft}px`;
  } else {
    offsetLeft = 0;
    cards.style.left = `${offsetLeft}px`;
  }
});

btnBack.addEventListener("click", (e) => {
  if (offsetLeft - contentWidth >= 0) {
    offsetLeft -= contentWidth;
    cards.style.left = `${-offsetLeft}px`;
  } else {
    offsetLeft = cards.offsetWidth - container.offsetWidth + 2;
    cards.style.left = `${-offsetLeft}px`;
  }
});
