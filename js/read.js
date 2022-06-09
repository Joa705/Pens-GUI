

// Fetch url penns
async function fetch_penns() {
   const url ="http://localhost/Penner/api/penn/read.php";
   const login = 'Svein';
   const password = '12345';
   const response = await fetch(url, {
   headers:{
      "Authorization": `Basic ${btoa(`${login}:${password}`)}`,
      'Content-Type': 'application/json'
   }
   });

   return response.json();
  
}



function display_penns() {
   const element = document.createElement('div');
   // Fetch penns
   fetch_penns()
   // Display data to the user
   .then(data => {
      for(const res of data.data){
         console.log(res.name);
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
     
         element.appendChild(document.createElement("br"))
         element.appendChild(document.createElement("br"))
      }
   })

   document.getElementById("penns").append(element);
}