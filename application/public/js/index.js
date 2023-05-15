var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
var imgCount;

async function fetchWithStrings(){
    try{
        var response = await fetch(url); //Get URL
        var data = await response.json(); //Get JSON
        imgCount = data.length;
        display(imgCount)
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
                delet(ev);
                display(imgCount);
            });
        });
    }catch(error){
        console.log(error);
    }
}

// Function to Delete Elements
function delet(ev){
    ev.currentTarget.remove();
    imgCount--;
}

// Function to Display Number of Images
function display(counter){
    document.getElementById('countdown').innerText = counter;
}

fetchWithStrings();