// create a method to fetch data from the api
fetch("/inventory")
.then(res=>res.json())
.then(data=>{
	data.forEach(item=>{
    RenderProduct(item)
    })
})



const form = document.getElementById("Form")
let editProduct = null

form.addEventListener("submit",async (event) =>{
    event.preventDefault();

    const name = document.getElementById("name");
    const brand = document.getElementById("brand");
    const ingredients = document.getElementById("ingredients")
    if (name.value.trim() ===""){
        alert("Fill the product name field")
        return;
    }
    if (brand.value.trim() ===""){
        alert("Fill in the brand")
        return;
    }

    if(ingredients.value.trim() ===""){
        alert("Add the ingredients")
        return;
    }


    const product = {product_name: name.value,
                     brands: brand.value,
                    ingredients_text: ingredients.value
                }
    
// create a method to add the information to the backend

        const response = await fetch("/inventory",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        // await response from backend
        const feedback = await response.json()
        console.log(feedback.id)
    RenderProduct(feedback)
})

function RenderProduct(product){
    const RenderList = document.getElementById('view_list')
    const newList = document.createElement("ul")
    const name = document.createElement('li')
    const brand = document.createElement("li")
    const ingredient = document.createElement("li")
    const details = document.createElement("ul")
    brand.textContent = "Brand: " + product["brands"]
    ingredient.textContent = "Ingredients: " + product['ingredients_text']
    name.textContent = product['product_name']


    const editButton = document.createElement("button")
    editButton.textContent = "EDIT";
    editButton.addEventListener("click",  () =>{
        
        editProduct = product.id;
        alert("product id picked")
    })
    //  A function to delete an element
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
        const response = await fetch(`/inventory/${product.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            newList.remove();
        }
        else
            alert("Could not delete Product")
    });
    
    details.appendChild(brand)
    details.appendChild(ingredient)
    newList.appendChild(name)
    newList.appendChild(details)
    newList.appendChild(deleteButton)
    newList.appendChild(editButton)
    RenderList.appendChild(newList)
}   