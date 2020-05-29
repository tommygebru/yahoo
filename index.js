$(document).ready(function() {
	/******************************************
	C L I C K   E V E N T
	******************************************/
	$(".search-bar").on("click", "#search-btn", newQuery);
	const apiKey = "628ca4460ecf460faaa076684f9f59d7";
  /******************************************
  	P U L L   D E F A U L T   Q U E R Y
  	******************************************/
  	function getNews() {
  		fetch("https://newsapi.org/v2/everything?q=tesla&language=en&apiKey=628ca4460ecf460faaa076684f9f59d7").then(response => {
  			if (response.ok) {
  				return response.json();
  			} else {
  				throw console.log(response.text());
  			}
  		}).then(responseJson => displaySearchResults(responseJson)).catch(error => displaySearchError(error));
  	}; //function
  	getNews();
});
