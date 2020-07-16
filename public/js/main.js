"use strict";var currentYear=(new Date).getFullYear(),arrayErrors=[],moviesFindResults={pages:1,amount:0},paginas=[];document.addEventListener("DOMContentLoaded",(function(){var e=location;if("/"===e.pathname||"/index.html"===e.pathname)if(0===(sessionStorage.getItem("sessionActive")||0))location.href="login.html";else JSON.parse(sessionStorage.getItem("userInfo"));var t=["superman","batman","star","harry","speed","caracas","hard","rambo","avengers","rocky","lego"],a=Math.floor(Math.random()*t.length);findMovies(t[a],"")}));var searchForm=document.getElementById("search-form"),searchTitle=document.getElementById("search-title"),searchYear=document.getElementById("search-year"),msgError=document.getElementById("msg-error"),pagesNav=document.getElementById("pages-nav");searchForm.addEventListener("submit",(function(e){e.preventDefault(),arrayErrors=[],msgError.innerHTML="",msgError.className="msg-error",checkInputsSearch(),0===arrayErrors.length?(findMovies(searchTitle.value.trim(),searchYear.value.trim()),pagesNav.classList.add("pages-nav--show")):(msgError.classList.add("msg-error--show"),arrayErrors.forEach((function(e){msgError.innerHTML+="<p>".concat(e,"</p>")})))}));var logout=document.getElementById("logout");logout.addEventListener("click",(function(e){e.preventDefault(),sessionStorage.removeItem("sessionActive"),location.href="index.html"}));var findMovies=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"1",r="?t=&s=".concat(e,"&type=movie&y=").concat(t,"&page=").concat(a),n="http://www.omdbapi.com/".concat(r,"&apikey=c52b4a65");fetch(n).then((function(e){return e.json()})).then((function(e){"True"===e.Response&&(console.log(e),e.totalResults>0&&(showMovies(e.Search),paginas[0]=0,paginas[1]=moviesFindResults.amount))})).catch((function(e){return console.log("se produjo un error ",e)}))},findMovieId=function(e){var t="?i=".concat(e),a="http://www.omdbapi.com/".concat(t,"&apikey=c52b4a65");return fetch(a).then((function(e){return e.json()})).then((function(e){if("True"===e.Response&&e.totalResults>0){showMovies(e.Search);var t=parseInt(e.totalResults);moviesFindResults.amount=t,paginas[0]=t,paginas[1]=moviesFindResults.amount}})).catch((function(e){return console.log("se produjo un error ",e)})),moviesFindResults.amount},showMovies=function(e){var t=document.getElementById("movies"),a="/assets/img/no-image-available.png";t.innerHTML="",e.forEach((function(e){a="N/A"!==e.Poster?e.Poster:"/assets/img/no-image-available.png",t.innerHTML+='<div class="movies-card">\n               <h3 class="movie-title">'.concat(e.Title,'</h3>\n               <img src="').concat(a,'" alt="" class="movie-img">\n               <div class="movie-info">\n                  <a onclick="movieSelected(\'').concat(e.imdbID,'\')" class=" btn year" href="movie.html">Ver Detalle</a>\n               </div>\n            </div>')}))},movieSelected=function(e){sessionStorage.setItem("movieId",e)},checkInputsSearch=function(){var e=searchTitle.value.trim(),t=searchYear.value.trim();null!==e&&0!==e.length||arrayErrors.push("Debe de indicar el Titulo de la pelicula"),t.length>0&&(isNaN(t)||!/^\d{4}$/.test(t)?arrayErrors.push("el año debe ser numero entero > 999"):t>currentYear&&arrayErrors.push("el año debe ser menor o igual a ".concat(currentYear)))},validateEmail=function(e){return!!/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},validatePasswordModerate=function(e){return!!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(e)};