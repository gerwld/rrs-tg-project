const loader = document.getElementById('ctg_load');
const content = document.getElementById('ctg_rss_content');
const instance = axios.create({
  baseURL: "https://ctg-cors.herokuapp.com/https://rsshub.app/",
});

const RSS_ENDPOINT = "telegram/channel/haregakaniti";

const getRssData = () => {
 console.log(moment.locale('he'));
  instance
    .get(RSS_ENDPOINT)
    .then((r) => {
      const data = xmlToJSON.parseString(r.data);
      return data.rss[0].channel[0].item;
    }).then(res => {
      res.reverse().map(e => {
       const desc = e.description[0]._text;
       var img = desc.split('https://').pop().split('.jpg')[0];
       var pg = desc.split(`.href);">​​</a>`).pop().split('</p><blockquote>')[0] + "...";
       var date = moment(e.pubDate[0]._text).calendar();
       const data = {
        title: e.title[0]._text.slice(0, 80),
        date: e.pubDate[0]._text,
       }
       createElemBuilder(img, data.title, pg, date);
       console.log(e);
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


const createElemBuilder = (img = "--", title ="--", pg ="--", date ="--") => {
 var tag = document.createElement("div");
 tag.classList.add('slide_block');
 tag.innerHTML = `
 <div class="slide_block_content">
 <div class="image">
   <img
     src="https://${img}.jpg"
     onerror="this.src='./img/fallback-img.jpg'"
     alt=${title}>
 </div>
 <div class="content">
   <h3><a href="#">${title}</a></h3>
   <p>${pg}</p>
   <span class="datetime" lang="he" dir="rtl">${date}</span>
 </div>
 </div>
 `
 content.appendChild(tag);
}
