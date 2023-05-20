//Go to post link after clicking card
let cards = document.getElementsByClassName("full-card");
[...cards].forEach(cardElement => {
    cardElement.addEventListener("click", (ev) => {
        var postId = ev.currentTarget.dataset.postid;
        fetch(`/posts/viewpost/${postId}`).
        then(data => {
            window.location.href = data.url;
        });
    })
});