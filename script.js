 
  
  let API = "https://makeup-api.herokuapp.com/api/v1/products.json";
  // console.log(API)
  
  // Read - (GET)
  let data;
  async function ReadAllData(){
    try{ 
         let Response = await fetch(API, {
         method : "GET"
    })
    data = await Response.json()
    renderAllProducts(data);
}
  catch(err){
        console.log(err)
    }
  }      
  
  ReadAllData();

    // render all Products data 
    
    function renderAllProducts(products,searchtext=""){
        Productlist.innerHTML = "";
          if(searchtext!=="")
          products = products.filter(val=>val.name.includes(searchtext))
          products.forEach((product)=>{
          rederProducts(product)
         })
      }    
  
  //Delete operation
  function DeleteData(id, parent){
      fetch("${API}/${id}", {
          method: "DELETE",
          headers : {
              "Content-type" : "application/json; charset=UTF-8"
          }
      })
      .then(()=>parent.remove())
      .catch((err)=>console.log(err))
  }


  // operations in html 
  const Productlist = document.querySelector("#student-list");

  function rederProducts(product){
    const ProductDiv = document.createElement("div");
    ProductDiv.className = "card";
    ProductDiv.innerHTML += `
    <h4 class="card-title text-center text-dark">${product.name} - ${product.brand}</h4>
    <img src="${product.image_link}" alt="${product.name}" class="center"/>
     <p><span>Price : </span>${product.price}</p>
     <p><span>ProductLink : </span>${product.product_link}</p>
     <p><span>Description : </span>${product.description}</p>
     <button data-id='${product.id}' class="btn btn-primary">Delete</button>
    `;
  
    Productlist.appendChild(ProductDiv);
  }
  
  Productlist.addEventListener("click", (event)=>{
    event.preventDefault(); 
 if (event.target.className === "btn btn-primary"){
    let id = event.target.dataset.id;
    let parent = event.target.parentNode;
     DeleteData(id, parent)
 }
}) 

//Filter
  document.getElementById("search").addEventListener("keyup", (event)=>{
   event.preventDefault()
  //  document.getElementById("search").value
   renderAllProducts(data,document.getElementById("search").value)
  })
  
  document.getElementById("btn").addEventListener("click", (event)=>{
    event.preventDefault()
   //  document.getElementById("search").value
    renderAllProducts(data,document.getElementById("search").value)
   })


  
 





