const container = document.getElementById("ctg_rss");
const cards = document.getElementById("ctg_rss_content");
const card = cards.querySelector(".slide_block").offsetWidth + 15;

const btnBack = document.getElementById("btn_back");
const btnFront = document.getElementById("btn_front");

let offsetLeft = 0;

btnFront.addEventListener("click", (e) => {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (cards_rect.right > container_rect.right + card - 15) {
    offsetLeft += card;
    cards.style.left = `${-offsetLeft}px`;
  } else {
    offsetLeft = 0;
    cards.style.left = `${offsetLeft}px`;
  }
});

btnBack.addEventListener("click", (e) => {
  if (offsetLeft - card >= 0) {
    offsetLeft -= card;
    cards.style.left = `${-offsetLeft}px`;
  } else {
    offsetLeft = cards.offsetWidth - container.offsetWidth;
    cards.style.left = `${-offsetLeft}px`;
  }
});
