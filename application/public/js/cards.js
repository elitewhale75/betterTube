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

let deleteButton = document.getElementsByClassName("delete-button");
[...deleteButton].forEach(element => {
    element.addEventListener("click", (ev) => {
        var cardId = ev.currentTarget.dataset.postid;
        console.log(cardId)
        fetch(`/posts/delete`, 
        {method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
        postId: cardId})    
        }).
        then(data => {
            location.reload();
            window.location.href = data.url;  //Redirect to profile
            location.reload();
        }).
        catch(err => {console.log(err)});
    })
})