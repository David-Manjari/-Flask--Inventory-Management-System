

const name = document.getElementById("name");
const brand = document.getElementById("brand");
const ingredients = document.getElementById("ingredients")
const form = document.getElementById("Form")

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    if (name.value ===""){
        alert("Fill the product name field")
        return;
    }
    if (brand.value ===""){
        alert("Fill in the brand")
        return;
    }

    if(ingredients.value ===""){
        alert("Add the ingredients")
        return;
    }
       

    const product = {product_name: name.value,
                     brand: brand.value,
                    ingredients: ingredients.value}
    
// create a methid to add the information to the backend
        const ressponse = await fetch("/inventory",{
            method: "POST",
            headers: {
                "Content-Type": "applicatio/json"
            },
            body: JSON.stringify(product)
        });

        // await response from backend
        const response= await response.JSON()
    RenderProduct(product)
})

function RenderProduct(product){
    const RenderList = document.getElementById('view_list')
    const newlist = document.createElement("ul")
    const name = document.createElement('li')
    const brand = document.createElement("li")
    const ingredient = document.createElement("li")
    const details = document.createElement("ul")
    brand.textContent = "Brand: " + product["brand"]
    ingredient.textContent = "Ingredients: " + product["ingredients"]
    name.textContent = product['product_name']
    
    details.appendChild(brand)
    details.appendChild(ingredient)
    newlist.appendChild(name)
    newlist.appendChild(details)
    RenderList.appendChild(newlist)
}   