"use strict";
(() => {
    document.addEventListener("DOMContentLoaded",main);

    function main() {
        let app = document.getElementById("app"),
            list = app.querySelector(".js-app__list"),
            input = app.querySelector(".js-app__input"),
            movieDetails = app.querySelector(".js-app__movie-details");
        const searchMovie = new SearchMovie({
            app: app,
            input: input,
            list: list,
            movieDetails: movieDetails
        });
    }
})();
