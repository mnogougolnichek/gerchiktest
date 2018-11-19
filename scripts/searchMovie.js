"use strict";

function SearchMovie (options) {
    const {app, input, list, movieDetails} = options;
    this.app = app;
    this.input = input;
    this.list = list;
    this.movieDetails = movieDetails;
    this.data = [];
    this.init();
}

SearchMovie.prototype.init = function () {
    this.search();
    this.app.addEventListener("click", (event) => {
        if(event.target.classList.contains("js-app__list-item")){
            this.renderDetails(+event.target.id)
        }
    })
};

SearchMovie.prototype.getData = function (value) {
    fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.data = response;
            this.renderList();
            console.log(response);
        });
};

SearchMovie.prototype.renderList = function () {
    this.list.innerHTML ="";
    this.movieDetails.innerHTML = "";
    for(let i = 0; i < this.data.length; i++){
        let url = this.data[i].show.image? this.data[i].show.image.medium: "images/placeholder.jpg",
            premiere = this.data[i].show.premiered?  this.data[i].show.premiered.substring(0,4): "Unknown";
        this.list.innerHTML += this.listItemTmpl(this.data[i].show.id, url, this.data[i].show.name, premiere);
    }
};

SearchMovie.prototype.search = function () {
    this.input.addEventListener("input", () => {
        if(this.searchValue !== ""){
            this.getData(this.input.value);
        }

    })
};

SearchMovie.prototype.renderDetails = function (id) {
    this.list.innerHTML ="";
    for(let i = 0; i < this.data.length; i++){
        console.log(this.data[i].show.id, id);
        if(this.data[i].show.id === id){
            this.movieDetails.innerHTML = this.movieDetailsTmpl(this.data[i]);
        }
    }
};

SearchMovie.prototype.listItemTmpl = function (id, url, name, premiere) {
    return `<li class="js-app__list-item app__list-item" id="${id}">
               <img src="${url}" class="app__image">
               <div class="app__description">
                   <div>
                       <span class="app__description-name">${name}</span>
                   </div>
                   <div>
                       <span class="app__description-year">${premiere}</span>
                   </div>     
               </div>
    </li>
    `
};

SearchMovie.prototype.movieDetailsTmpl = function (movie) {
    let id = movie.show.id,
        url = movie.show.image? movie.show.image.medium: "images/placeholder.jpg",
        premiered = movie.show.premiered? movie.show.premiered.substring(0,4): "Unknown",
        name = movie.show.name,
        language = movie.show.language,
        runtime = movie.show.runtime,
        summary = movie.show.summary? movie.show.summary: "";
    return `<div class="app__movie-details-content" id="${id}">
               <div class="app__description app__description--details">
               <img src="${url}" class="app__image--details">
                   <div>
                       <span class="app__description-name--details">${name}</span>
                   </div>
                   <ul class="app__description-details-list">
                       <li>Premiere: <span>${premiered}</span></li>
                       <li>Language: <span>${language}</span></li>
                       <li>Runtime: <span>${runtime}</span></li>
                   </ul>    
                   ${summary}
               </div>
    </div>
    `
};