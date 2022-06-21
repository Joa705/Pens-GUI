url = 'localhost'

// Read all penns on page load
function read_on_pageload(){
   fetch_penns("http://localhost/Penner/api/penn/read.php")
   .then(data => {display_penns(data)})
}


// Fetch url penns query
async function fetch_penns_by_query() {
   // Get selected option value
   const select = document.getElementById('query');
   var value = select.options[select.selectedIndex].value;
   console.log(value);
   // Get users input
   const text = document.getElementById('search-bar-text').value;
   console.log(text);
   
   // query users option
   if(value == 'name'){
      fetch_penns("http://" + url + "/Penner/api/penn/read_by_name.php?name=" + text)
      .then(data => {display_penns(data)})
   }
   else if(value == 'color'){
      fetch_penns("http://" + url + "/Penner/api/penn/read_by_color.php?color=" + text)
      .then(data => {display_penns(data)})
   }
   else if(value == 'firma'){
      fetch_penns("http://" + url + "/Penner/api/penn/read_by_firma.php?firma=" + text)
      .then(data => {display_penns(data)})

   }
   else{console.log("No option selected")}
}


// Fetch url penns
async function fetch_penns(url) {
   const link = url;
   const login = 'Svein';
   const password = '12345';
   const response = await fetch(link, {
   headers:{
      "Authorization": `Basic ${btoa(`${login}:${password}`)}`,
      'Content-Type': 'application/json'
   },
   });

   return response.json();
}


// Display fetched data
function display_penns(data) {
   // Clear old penns display if it exists
   const element_old = document.getElementById('penns-display');
   if(element_old){element_old.remove()}

   // Create new div for the penns display
   const element = document.createElement('div');
   element.setAttribute('id', 'penns-display');

   // If no penns display message
   if(data.message){
      element.appendChild(document.createTextNode(data.message))
   }
   else{
      // Display data to the user
      for(const res of data.data){
         element.appendChild(document.createElement("br"))
         element.appendChild(document.createTextNode("Name: "))
         element.appendChild(document.createTextNode(res.name))
      
         element.appendChild(document.createElement("br"))
         element.appendChild(document.createTextNode("Type: "))
         element.appendChild(document.createTextNode(res.type))
      
         element.appendChild(document.createElement("br"))
         element.appendChild(document.createTextNode("Color: "))
         element.appendChild(document.createTextNode(res.color))
      
         element.appendChild(document.createElement("br"))
         element.appendChild(document.createTextNode("Firma: "))
         element.appendChild(document.createTextNode(res.firma_name))
         
         // Append image if it exists
         if(res.image){
            let imgele = document.createElement('img')
            imgele.setAttribute('src', 'http://localhost/Penner/images/' + res.image)
            imgele.setAttribute("width", "150");
   
            element.appendChild(document.createElement("br"))         
            element.appendChild(imgele)
         }

         element.appendChild(document.createElement("br"))
         element.appendChild(document.createElement("br"))
      }

   }

   // Append created elements to the penns div
   document.getElementById("penns").append(element);
}