function dropdown() {
    document.getElementById("user-context-tab").
        addEventListener("click", function () {

            document.getElementById("dropdown").classList.toggle("show");
        })
}

document.addEventListener("click", function(event){
    var{id} = event.target.attributes;
    var dropdownMenu = document.getElementById("dropdown");
    if(id==null || (id.value != "logout" && 
             id.value != "link-to-user" && 
             id.value !="greeting")
    ){
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
          }
    }
})

dropdown();