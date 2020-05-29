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
  		fetch("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=tesla&language=en&apiKey=628ca4460ecf460faaa076684f9f59d7").then(response => {
  			if (response.ok) {
  				return response.json();
  			} else {
  				throw console.log(response.text());
  			}
  		}).then(responseJson => displaySearchResults(responseJson)).catch(error => displaySearchError(error));
  	}; //function
  	getNews();
    /******************************************
    	P U L L   S E A R C H   Q U E R Y
    	******************************************/
    	function newQuery() {
    		$(".secondarycontent .horizontal").remove();
    		$("#newstory .smallstory").remove();
    		$("#slide .image").remove();
    		let inputText = $("input.bdr").val();
    		fetch("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=" + inputText + "&language=en" + "&apiKey=" + apiKey).then(response => {
    			if (response.ok) {
    				return response.json();
    			} else {
    				throw console.log(response.text());
    			}
    		}).then(responseJson => displaySearchResults(responseJson)).catch(error => displaySearchError(error));
    	}; //function
});//READY
/******************************************
D I S P L A Y   R E S U L T S
******************************************/
function displaySearchResults(responseJson) {
	for (let i = 0; i < 6; i++) {
    let link = responseJson.articles[i].url;
		let title = responseJson.articles[i].title;
		let desc = responseJson.articles[i].description;
		let image = responseJson.articles[i].urlToImage;
		if (desc.length > 140) {
			desc = desc.slice(0, 140) + "...";
		}
		$(".secondarycontent").append(`<a href=${link} target="_blank"><div class="horizontal"><img src=${image} alt="thumbnail image"><span><h1>${title}</h1><p>${desc}</p></span></div></a>`);
	} //loop
	for (let i = 6; i < 10; i++) {
    let link = responseJson.articles[i].url;
		let title = responseJson.articles[i].title;
		let image = responseJson.articles[i].urlToImage;
		if (title.length > 50) {
			title = title.slice(0, 45) + "...";
		}
		$("#newstory").append(`<a href=${link} target="_blank"><div class="smallstory"><img src=${image} alt="thumbnail image"><p>${title}</p></div></a>`);
	} //loop
	for (let i = 10; i < 11; i++) {
    let link = responseJson.articles[i].url;
		let title = responseJson.articles[i].title;
		let desc = responseJson.articles[i].description;
		let image = responseJson.articles[i].urlToImage;
		if (desc.length > 140) {
			desc = desc.slice(0, 140) + "...";
		}
		$("#slide").append(`<a href=${link} target="_blank"><div class="image" style="background:linear-gradient(rgba(0, 0, 0, .19), rgba(0, 0, 0, .19)), url(${image}) center no-repeat">
              <div class="side-action"><i class="ionicons ion-ios-paper-outline"></i><i class="ionicons ion-social-reddit-outline"></i><i class="ionicons ion-social-facebook-outline"></i><i class="ionicons ion-social-twitter-outline"></i><i class="ionicons ion-social-linkedin-outline"></i></div>
              <div>
                  <h1>${title}</h1>
                  <p>${desc}</p>
              </div>
          </div></a>`);
	} //loop
}
/******************************************
D I S P L A Y   E R R O R S
******************************************/
function displaySearchError(error) {
	console.log(error.message);
}
