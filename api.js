const loader = document.getElementById('ctg_load');
const content = document.getElementById('ctg_rss_content');
const ctg_rss = document.getElementById('ctg_rss');
const instance = axios.create({
  baseURL: "https://ctg-cors.herokuapp.com/https://rsshub.app/",
});

const RSS_ENDPOINT = "telegram/channel/haregakaniti";
const COUNT_TO_LOAD = 10;

moment.locale('he');

const getRssData = () => {
  instance
    .get(RSS_ENDPOINT)
    .then((r) => {
      const data = xmlToJSON.parseString(r.data);
      const tgData = {
        img: data.rss[0].channel[0].image[0].url[0]._text,
        title: data.rss[0].channel[0].title[0]._text.split('- Telegram Channel')[0],
        link: data.rss[0].channel[0].link[0]._text
      }

      createHdBuilder(tgData.img, tgData.title, tgData.link);
      return data.rss[0].channel[0].item;
    }).then(res => {
      res.reverse().slice(0, COUNT_TO_LOAD).map(e => {
       const desc = e.description[0]._text;
       var links = detectURLs(desc);

       const data = {
        img: links[0],
        title: e.title[0]._text.slice(0, 80),
        pg: desc.split(`.href);">​​</a>`).pop().split('</p><blockquote>')[0] + "...",
        date: moment(e.pubDate[0]._text).calendar(),
        prodLink: links[1]
       }
       createElemBuilder(data.img, data.title, data.pg, data.date, data.prodLink);
      })
      resizeBlock();
      loader.classList.add('loaded');
      
    })
    .catch((error) =>{
     loader.classList.add('error');
     loader.querySelector('span').innerHTML = error.message;
     });
};
getRssData();


const createElemBuilder = (img = "--", title ="--", pg ="--", date ="--", link="#") => {
 var tag = document.createElement("div");
 tag.classList.add('slide_block');
 tag.innerHTML = `
 <div class="slide_block_content">
 <div class="image">
   <img
     src="${img}"
     onerror="this.src='./img/fallback-img.jpg'"
     alt=${title}>
 </div>
 <div class="content">
   <h3><a target="_blank" href=${link}>${title}</a></h3>
   <p>${pg}</p>
   <span class="datetime" lang="he" dir="rtl">${date}</span>
 </div>
 </div>
 `
 content.appendChild(tag);
}

const createHdBuilder = (img = "--", title ="--", link="#") => {
  var tag = document.createElement("div");
  tag.classList.add('tg_cregentials');
  tag.innerHTML = `
  <a class="title" href=${link} target="_blank">
    <div class="avatar">
      <img src=${img} alt="Avatar">
    </div>
    <span>${title}</span>
    </a>
  `
  ctg_rss.appendChild(tag);
 }



function detectURLs(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.match(urlRegex)
}