
async function create_penn(){
    // Get user input
    var name = document.getElementById('name').value;
    var type = document.getElementById('type').value;
    var color = document.getElementById('color').value;
    var firma_id = document.getElementById('firma_id').value;

    // Check for empty input
    if(name == ""){name = null};
    if(type == ""){type = null};
    if(color == ""){color = null};
    if(firma_id == ""){console.log("Field firma_id must be filled out"); return;};

    // Get image
    const image_temp_file = document.getElementById('image');
    const image = image_temp_file.files[0];

    // Convert to form data
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append("type", type);
    formdata.append("color", color);
    formdata.append("firma_id", firma_id);
    formdata.append("image", image);

    
    console.log(name);
    console.log(type);
    console.log(color);
    console.log(firma_id);
    console.log(image);

    // Send post request
    send_request(formdata, "http://localhost/Penner/api/penn/create.php")
    .then(data => {
        const status = document.getElementById('status');
        const form_result = document.createElement('div');
        form_result.appendChild(document.createTextNode(data.message));
        status.append(form_result);
    })
    .catch(error => console.log(error))
}

// Send create request to the api server
async function send_request(formdata, url){
    const login = 'Svein';
    const password = '12345';
    const response = await fetch(url, {
    method: 'POST',
    headers:{
       "Authorization": `Basic ${btoa(`${login}:${password}`)}`,

    },
    body: formdata
    })

    return response.json();
}


// Display input image 
function load_image(event) {
    var image = document.getElementById('img-output');
	image.src = URL.createObjectURL(event.target.files[0]);
    
}
