const form = document.getElementById("iframe_form");
const showFormCb = document.getElementById("iframe_tg");
const showLastFormDd = document.getElementById("iframe_last");
const form_textarea = document.getElementById("iframe_ta");


// Set your website address in the constant down bellow, between " "
const BASE_WEBSITE_URL = "http://localhost:5500/";

function initForm() {
  form_textarea.value = `<iframe width="100%" height="550" src="${BASE_WEBSITE_URL}content/iframe.html?show_telegram=${showFormCb.checked ? "yes" : "no"}&show_last=${showLastFormDd.value}" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
}
initForm();
form.addEventListener("click", initForm);
