// create a method to fetch data from the api
fetch("/inventory")
.then(res=>res.json())
.then(data=>{
	data.forEach(item=>{
    RenderProduct(item)
    })
})



const form = document.getElementById("Form")
const editProduct =  sessionStorage.getItem("editProduct")

if(form){
    form.addEventListener("submit",async (event) =>{
    event.preventDefault();

    const name = document.getElementById("name");
    const brand = document.getElementById("brand");
    const ingredients = document.getElementById("ingredients")

     const product = {product_name: name.value,
                     brands: brand.value,
                    ingredients_text: ingredients.value
                }

    
   
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
}
const edit = document.getElementById("editForm")
if(edit){
     
    edit.addEventListener("submit", async (event) =>{
        event.preventDefault()
        const editProduct = sessionStorage.getItem("editProduct");
        const field = document.getElementById("select").value
        const value = document.getElementById("input").value
        if(value.trim() !=""){
             const editData = {
            [field]: value
        }
        alert(`${editProduct}`)
            const response = await fetch (`/inventory/${editProduct}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editData)
            })
            const result = await response.json()
            if(!response.ok){
                alert("failed to Update")
            }
        
        alert("Item Edited")
        sessionStorage.removeItem("editProduct");
        window.opener.location.reload();
        window.close()
        }
       else{
        alert("Input The content to be changed")
       }
    })
}
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
        sessionStorage.setItem("editProduct", product.id)
        window.open(`/editForm`, "_blank");
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
    const container= document.getElementById('view')
    if (!container)
        rerurn
    details.appendChild(brand)
    details.appendChild(ingredient)
    newList.appendChild(name)
    newList.appendChild(details)
    newList.appendChild(deleteButton)
    newList.appendChild(editButton)
    RenderList.appendChild(newList)
}   