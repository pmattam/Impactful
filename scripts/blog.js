// Populate Search Results

var newsURL = 'https://newsapi.org/v2/everything?q=charity&sortBy=popularity&pageSize=10&apiKey=dd2c986c594a428db26a72b36cb0b8d0';
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
        var title = document.createElement('h3')
        title.textContent = article.title;
        var titleLi = createLiElement(title);
        ulElement.appendChild(titleLi);
        var pic = document.createElement('img');
        pic.setAttribute('src', article.urlToImage);
        var picLi = createLiElement(pic);
        ulElement.appendChild(picLi);
        var author = document.createElement('h4')
        author.textContent = article.author;
        var authorLi =createLiElement(author);
        ulElement.appendChild(authorLi);
        var date = document.createElement('h5');
        date.textContent = article.publishedAt;
        dateLi = createLiElement(date)
        ulElement.appendChild(dateLi);
        var description = document.createElement('h5')
        description.textContent = article.description;
        descriptionLi = createLiElement(description);
        ulElement.appendChild(descriptionLi);
        ulElement.addEventListener('click', function(e) {
            e.preventDefault();
            openInNewTab(article.url);
        })
        searchDiv.appendChild(ulElement);
    });

}

var createLiElement = function(text) {
    var liElement = document.createElement('li');
    liElement.appendChild(text);
    return liElement;
}

var createHrefElement = function(text) {
    var hrefElement = document.createElement('a');
    hrefElement.setAttribute('href', text);
    return hrefElement;
}

var openInNewTab = function (url) {
    var win = window.open(url, '_blank');
    console.log(url);
    win.focus();
}

var anchorTags = document.querySelector('a')
anchorTags.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(event)
    // openInNewTab(event.target);
})



getBlogApiData();

