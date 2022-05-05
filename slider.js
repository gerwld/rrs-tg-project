const container = document.getElementById("ctg_rss");
const cards = document.getElementById("ctg_rss_content");
const btnBack = document.getElementById("btn_back");
const btnFront = document.getElementById("btn_front");

let elemWidth;
let offsetLeft = 0;
let marginGap = 15;

function resizeBlock() {
  if(container.offsetWidth >= 800) {
    cards.querySelectorAll(".slide_block").forEach((e) => {
      e.style = `max-width: ${container.offsetWidth / 3 - marginGap}px;`;
    });
  }
  if(container.offsetWidth >= 550 && container.offsetWidth < 800) {
    cards.querySelectorAll(".slide_block").forEach((e) => {
      e.style = `max-width: ${(container.offsetWidth / 2) - 10}px;`;
      e.classList.add('mg-r-800');
      marginGap = 11;
    });
  }
  if(container.offsetWidth < 550) {
    cards.querySelectorAll(".slide_block").forEach((e) => {
      e.style = `max-width: ${(container.offsetWidth) - 10}px; flex: 0 0 ${(container.offsetWidth) - 10}px;`;
      e.classList.add('mg-r-800');
      marginGap = 11;
    });
  }
  // cards.querySelectorAll(".slide_block").forEach((e) => {
  //   e.style = `max-width: ${container.offsetWidth - 8}px;`;
  // });
  elemWidth = cards.querySelector(".slide_block").offsetWidth + marginGap;
  offsetLeft = 0;
  cards.style.left = `${offsetLeft}px`;
}

resizeBlock();
window.addEventListener("onlaod", resizeBlock);
window.addEventListener("resize", resizeBlock);


btnBack.addEventListener("click", () => {
  if (offsetLeft - elemWidth >= 0) {
    offsetLeft -= elemWidth;
  } else if (offsetLeft - elemWidth < 0 && offsetLeft - elemWidth > elemWidth * -1) {
    offsetLeft = 0;
  } else {
    offsetLeft = cards.offsetWidth - container.offsetWidth + 2;
  }
  cards.style.left = `${-offsetLeft}px`;
});

btnFront.addEventListener("click", () => {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();

  if (cards_rect.right > container_rect.right + elemWidth - marginGap) {
    const offset = elemWidth - (container.offsetWidth % elemWidth);

    if (offsetLeft == 0 && offset > 80) {
      offsetLeft += offset - 8;
    } else if (offsetLeft == 0 && offset > 0) {
      offsetLeft += elemWidth + offset - 8;
    } else {
      offsetLeft += elemWidth;
    }
  } else {
    offsetLeft = 0;
  }
  cards.style.left = `${-offsetLeft}px`;
});
