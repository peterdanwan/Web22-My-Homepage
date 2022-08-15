// Takes a callback function
function getReq(callback){
    // This is how we will REQUEST data from a URL
    let xhr = new XMLHttpRequest();

    // When the window loads, we want to do something with our XHR. Similarly,
    // We want to do something with our XHR if the window doesn't load (i.e., onerror event)
    xhr.onload = function(){
        try{
            let json = JSON.parse(this.responseText);           
            callback(json.data); 
        } catch(err){
            console.error('Unable to parse req JSON', err);
        }
    };

    xhr.onerror = function(){
        console.error('Unable to get req JSON');
    };

    // This is the website that we are requesting data from
    let url = 'https://reqres.in/api/users?page=1';


    // We are taking our XHR and calling the open method and using the GET request.
    xhr.open('GET', url);

    // Then we are going to say to the XHR to send this data to the server
    // Notice that we don't say let data = xhr.send(); to store the retrieved results into a variable. 
    xhr.send();
};

function populateInfo(dataset){
    // Using the DOM to access our dropdownMenu
    let contacts = document.querySelector('#contacts');

    // Need a way of looping through all of the records and putting new anchor elements into our dropdownMenu
    dataset.forEach( data =>{
        //<a id="breed-name" class="dropdown-item" href="#">Breed Name</a>
        let card = document.createElement('article');

        card.className = 'card';
        
        // Insert users' names
        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = `${data.first_name} ${data.last_name}`
        header.appendChild(h2);

        // Insert users' pics
        let image = document.createElement('img');
        image.src = data.avatar;

        //Insert Email info
        let div = document.createElement('div');
        div.className = 'content';
        let email = data.email;
        let paragraph = document.createElement('p');
        paragraph.innerHTML = `<b>Email:</b>`;

        let paragraph2 = document.createElement('p');
        paragraph2.innerHTML = `${email}`;
        div.appendChild(paragraph);
        div.appendChild(paragraph2);

        //Append header, image, and div (containing email stuff) into article
        card.appendChild(header);
        card.appendChild(image);
        card.appendChild(div);

        //Append the card and all of its contents into the contacts div
        contacts.appendChild(card);

       
    });
    
    console.log('dataset', dataset);
}