$(document).ready(() => {
    $.get("/api/posts", results => {
        outputPosts(results, $(".postsContainer"));
    })
})

function outputPosts(results, container) {
    container.html("");

    results.forEach(result => {
        var html = createPostHtml(result)
        container.append(html);
    });

    if (results.length == 0) {
        container.append(`
            <h1 class='noResultsTitle'>Welcome to Twitter!</h1>
            <div class='noResults'>Come on, write your first tweet now!</div>
        `)
    }
}