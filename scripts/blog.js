// Populate Search Results

var newsURL = 'https://newsapi.org/v2/everything?q=charity&sortBy=popularity&apiKey=dd2c986c594a428db26a72b36cb0b8d0';
var blogRawData = [];

var getBlogApiData = function() {
    fetch(newsURL, {method: 'GET'}, {mode: 'no-cors'})
         .then(function(response) {
            return response.json();
        })
        .then(processGetData)
        .then(addBlogListToPage)
};

var processGetData = function(apiData) {
    blogRawData = Object.values(apiData.articles);
    console.log(blogRawData)
    return blogRawData;
};

var addBlogListToPage = function(articleList) {
    var searchDiv = document.querySelector('.blog-results');

    
    articleList.forEach(function(article) {
        var ulElement = document.createElement('ul');
        var title = createLiElement(article.title);
        ulElement.appendChild(title);
        var author = createLiElement(article.author);
        ulElement.appendChild(author);
        var website = createLiElement(article.url);
        ulElement.appendChild(website)
        var description = createLiElement(article.description);
        ulElement.appendChild(description);
        searchDiv.appendChild(ulElement);
    });

}

var createLiElement = function(text) {
    var liElement = document.createElement('li');
    liElement.textContent = text;
    return liElement;
}

var createHrefElement = function(text) {
    var hrefElement = document.createElement('a');
    hrefElement.setAttribute('href', text);
    return hrefElement;
}

getBlogApiData();

