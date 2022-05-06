const form = document.getElementById("iframe_form");
const mainIframe = document.getElementById("main_iframe");
const showFormCb = document.getElementById("iframe_tg");
const showLastFormDd = document.getElementById("iframe_last");
const form_textarea = document.getElementById("iframe_ta");

// If website iFrame direction will be different than public_html, add path to constant BASE_WEBSITE_URL down below with concatenation
// example: BASE_WEBSITE_URL = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1] + "/myPathToIframeFolder/";

var getUrl = window.location;
const BASE_WEBSITE_URL = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];

function initForm() {
  form_textarea.value = `<iframe width="100%" height="${showFormCb.checked ? 550 : 480}" src="${BASE_WEBSITE_URL}content/iframe.html?show_telegram=${showFormCb.checked ? "yes" : "no"}&show_last=${showLastFormDd.value}" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
  mainIframe.src = `./content/iframe.html?show_telegram=${showFormCb.checked ? "yes" : "no"}&show_last=${showLastFormDd.value}`;
}
initForm();
form.addEventListener("change", initForm);
