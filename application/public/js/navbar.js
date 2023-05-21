//Toggle dropdown menu
document.getElementById("user-context-tab").
    addEventListener("click", function () {

        document.getElementById("dropdown").classList.toggle("show");
    })


//Dropdown minimize function
document.addEventListener("click", function(event){
    var{id} = event.target.attributes;
    var dropdownMenu = document.getElementById("dropdown");
    if(id==null || (id.value != "logout" && 
             id.value != "link-to-user" && 
             id.value !="greeting"))
    {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
          }
    }
});

//Logout
document.getElementById("logout").
addEventListener("click", function(event){
    fetch("/users/logout", {method: "POST"})
    .then(data => { //Get link from routehandler
        window.location.href = data.url;  //Redirect to home page
        
    });
});