const AE_inputDataAnalytics_element = document.querySelector('[AE-inputDataAnalytics="true"]');
const AE_inputDataAnalytics_form = AE_inputDataAnalytics_element.querySelector('form');
const AE_inputDataAnalytics_html = `
	<!-- AE! Контейнер с полями для расшириной прокидки данных при отправке формы -->
	<div AE-inputDataAnalytics="wrapper">
  	<!-- Ссылка -->
    <input type="hidden" AE-inputDataAnalytics-Value="link" name="link">
    <!-- Сookie -->
    <input type="hidden" AE-inputDataAnalytics-Value="cookie" name="cookie">
    <!-- utm_contractor -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_contractor" name="utm_contractor">
    <!-- utm_webcontent -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_webcontent" name="utm_webcontent">
    <!-- utm_source -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_source" name="utm_source">
    <!-- utm_medium -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_medium" name="utm_medium">
    <!-- utm_campaign -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_campaign" name="utm_campaign">
    <!-- utm_content -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_content" name="utm_content">
    <!-- utm_term -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_term" name="utm_term">
    <!-- utm_region_id -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_region_id" name="utm_region_id">
    <!-- utm_region_name -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_region_name" name="utm_region_name">
    <!-- utm_source_type -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_source_type" name="utm_source_type">
    <!-- utm_group_id -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_group_id" name="utm_group_id">
    <!-- utm_device_type -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_device_type"  name="utm_device_type">
    <!-- utm_creative_id -->
    <input type="hidden" AE-inputDataAnalytics-Value="utm_creative_id" name="utm_creative_id">
    <!-- yclid -->
    <input type="hidden" AE-inputDataAnalytics-Value="yclid" name="yclid">
  </div>
`;

AE_inputDataAnalytics_form.innerHTML = AE_inputDataAnalytics_html;

///

document.querySelector('[AE-inputDataAnalytics-Value="cookie"]').value = document.cookie;

///

function extractBaseUrlAndParams(url) {
  const urlObj = new URL(url);
  let hostname = urlObj.hostname;

  if (hostname.startsWith("www.")) {
    hostname = hostname.substring(4);
  }

  let baseUrl = `${hostname}${urlObj.pathname}`;
  let paramString = "";

  urlObj.searchParams.forEach((value, key) => {
    paramString += (paramString.length === 0 ? "" : "&") + `${key}=${value}`;
  });

  return { baseUrl, paramString };
}

function updateInputFields() {
  const url = window.location.href;
  const linkFields = document.querySelectorAll('[AE-inputDataAnalytics-Value="link"]');

  const { baseUrl, paramString } = extractBaseUrlAndParams(url);

  linkFields.forEach((linkField) => {
    linkField.value = baseUrl;
  });
}

updateInputFields();

////////////// utm в в подходящие input

var queryString = window.location.search;
console.log(queryString);

var URLSearchParams_wb = new URLSearchParams(queryString);

const utmParameters = [
  "utm_contractor", // Трафик мейкер
  "utm_webcontent", // Веб контент пользователя
  "utm_source", //
  "utm_medium", //
  "utm_campaign", //
  "utm_content", //
  "utm_term", //
  "utm_region_id", // ID региона
  "utm_region_name", // Название региона
  "utm_source_type", //
  "utm_group_id", // ID группы объявлений
  "utm_device_type", // Тип устройства
  "utm_creative_id", // ID креатива
  "yclid" // Yandex ID клика (не путать с ClientID)
];

for (const utm_element of utmParameters) {
  $("form").each(function (index) {
    if (URLSearchParams_wb.has(utm_element)) {
      console.log(utm_element + "is exist");
      var value = URLSearchParams_wb.get(utm_element);
      $(this).find("[AE-inputDataAnalytics-Value='" + utm_element + "']").val(value);
    }
  });
}