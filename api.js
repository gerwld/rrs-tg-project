const loader = document.getElementById('ctg_load');
const content = document.getElementById('ctg_rss_content');
const instance = axios.create({
  baseURL: "https://ctg-cors.herokuapp.com/https://rsshub.app/",
});


const getRssData = () => {
  instance
    .get("telegram/channel/haregakaniti")
    .then((r) => {
      const data = xmlToJSON.parseString(r.data);
      console.log(`GET items`, data.rss[0].channel[0].item);
      loader.classList.add('loaded');
      createElemBuilder();
      createElemBuilder();
    })
    .catch((error) =>{
     loader.classList.add('error');
     loader.querySelector('span').innerHTML = error.message;
      console.error(error)
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
     src=${img}
     alt=${title}>
 </div>
 <div class="content">
   <h3>${title}</h3>
   <p>${pg}</p>
   <span class="datetime">${date}</span>
 </div>
 </div>
 `
 content.appendChild(tag);
}


