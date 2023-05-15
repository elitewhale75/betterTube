var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

async function fetchWithStrings(){
    try{
        var response = await fetch(url); //Get URL
        var data = await response.json(); //Get JSON
        var htmlString = data.reduce(function(prev, obj) { 
            //Go through array and create string for HTML generation
            return prev + 
            `<div class = "img-group">
                <img src="${obj.url}" class="img">
                <p class="img-title">${obj.title}</p>
             </div>`
        },"");

        //Add String Under Image List
        document.getElementById('image-list').innerHTML = htmlString;

        //Add Event Listeners to Each Image
        let x = document.getElementsByClassName('img-group');
        [...x].forEach(element => {
            element.addEventListener('click', (ev) =>{
                console.log(ev.currentTarget);
            });
        });
    }catch(error){
        console.log(error);
    }
}

fetchWithStrings();