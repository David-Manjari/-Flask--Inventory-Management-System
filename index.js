

const name = document.getElementById("name");
const brand = document.getElementById("brand");
const ingredients = document.getElementById("ingredients")
const form = document.getElementById("Form")

form.addEventListener("submit", (event) =>{
    event.preventDefault();


    const product = {product_name: name.value,
                     brand: brand.value,
                    ingredients: ingredients.value}
    RenderProduct(product)
})

function RenderProduct(product){
    const RenderList = document.getElementById('view_list')
    const newlist = document.createElement("ul")
    const name = document.createElement('li')
    const brand = document.createElement("li")
    const ingredient = document.createElement("li")
    const details = document.createElement("ul")
    brand.textContent = product["brand"]
    ingredient.textContent = product["ingredient"]
    name.textContent = product['product_name']
    
    details.appendChild(brand)
    details.appendChild(ingredient)
    newlist.appendChild(name)
    newlist.appendChild(details)
    RenderList.appendChild(newlist)
}   