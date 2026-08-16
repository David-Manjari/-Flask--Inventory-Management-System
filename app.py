from flask import Flask, request,session


app = Flask(__name__)

inventory = []

@app.route("/inventory", methods = ["GET"])
def get_inventory():
    return jsonify(inventory)

# get a single item from the inventory
@app.route("/inventory/<int:id>", methods = ["GET"])
def get_item(id):
    for item in inventory:
        if item["status"] == id:
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

        new_product = {"status": new_id,
                        "product":{
                            "product_name" = name,
                            "brands": brand
                            "ingredients_text": ingredients
                        }}
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
        if item["status"] == id:
            for item in item:
                item["product_name"] = name
                item["brands"] = brand
                item["ingredients_text"] = ingredients
                return item
        return jsonify({"error": "Item not found"})

# Code to delete an Item
@app.route("/inventory/<int:id>" methods = ["DELETE"])
def delete_item(id):
    for item in inventory:
        if item["status"] == id:
        inventory.remove(item)
        return "",201
    return jsonify({"error":"Item not found"}),401