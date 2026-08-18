from flask import Flask, request,session, jsonify
import math

app = Flask(__name__)

inventory = []
# code to fetch data from api
def get_product_api(barcode):
    url = url = f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json"
    response = response.get(url)
    if response.status_code != 200:
        return None
    data = response.json()
    new_id = len(inventory) +1
    product = data.get("product")

    name = product.get("product_name")
    brand = product.get("brands")
    ingredients = product.get("ingredients_text")
   
    new_item = ({"id":new_id,  "product_name":name,"brands":brand,"ingredients_text":ingredients})
    inventory.append(new_item)


@app.route("/inventory", methods = ["GET"])
def get_inventory():
    return jsonify(inventory)

# get a single item from the inventory
@app.route("/inventory/<int:id>", methods = ["GET"])
def get_item(id):
    for item in inventory:
        if item["id"] == id:
            return jsonify(item)
    return jsonify({"message": "Item Not Present"}),404

# Post an item to the api
@app.route("/inventory", methods = ["POST"])
def add_item():
    data = request.get_json()
    product = data["product"]
    name = product.get("product_name")
    brand = product.get("brands")
    ingredients = product.get("ingredients_text")
    new_id = len(inventory) +1
    if name and brand and ingredients:

        new_product = {"id": new_id,
                            "product_name" : name,
                            "brands": brand,
                            "ingredients_text": ingredients
                        }
        inventory.append(new_product)
        return jsonify(new_product),201
    return jsonify({"error":"Name, Brand and ingredients are required"})


# add code to modify the Info
@app.route("/inventory/<int:id>" methods = ["PATCH"])
def update_inventory(id):
    data = request.get_json()
    product = data["product"]
    name = product.get("product_name")
    brand = product.get("brands")
    ingredients = product.get("ingredients_text")

    for item in data:
        if item["id"] == id:
            item["product_name"] = name
            item["brands"] = brand
            item["ingredients_text"] = ingredients
            return item
        return jsonify({"error": "Item not found"})

# Code to delete an Item
@app.route("/inventory/<int:id>" methods = ["DELETE"])
def delete_item(id):
    for item in inventory:
        if item["id"] == id:
            inventory.remove(item)
            return "",201
        return jsonify({"error":"Item not found"}),401