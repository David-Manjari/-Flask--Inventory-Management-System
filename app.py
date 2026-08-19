from flask import Flask, request,session, jsonify, render_template
import math
import requests

app = Flask(__name__)

inventory = []
# code to fetch data from api
import requests

import requests

def get_product_api(barcode):
    url = f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json"

    headers = {
    "User-Agent": "InventoryManagementSystem/1.0 (your-email@example.com)"
}

    response = requests.get(url, headers=headers)
    print("URL:", url)
    print("STATUS:", response.status_code)
    print("CONTENT TYPE:", response.headers.get("Content-Type"))
    print("RESPONSE:", response.text[:500])

    if response.status_code != 200:
        return None

    try:
        data = response.json()
    except requests.exceptions.JSONDecodeError:
        print("Response was not JSON")
        return None

    product = data.get("product")

    if not product:
        return None

    new_id = max(
        (item["id"] for item in inventory),
        default=0
    ) + 1

    new_item = {
        "id": new_id,
        "product_name": product.get("product_name"),
        "brands": product.get("brands"),
        "ingredients_text": product.get("ingredients_text")
    }

    inventory.append(new_item)

    return new_item
@app.route("/test/<barcode>", methods=["GET"])
def get_product(barcode):
    print("BARCODE RECEIVED:", barcode)

    result = get_product_api(barcode)

    print("RESULT:", result)

    return jsonify({
        "barcode": barcode,
        "result": result
    })
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/editForm")
def edit():
    return render_template("editForm.html")
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
    product = data
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
@app.route("/inventory/<int:id>", methods = ["PATCH"])
def update_inventory(id):
    data = request.get_json()
    for product in inventory:
        if product["id"] == id:
            if "product_name" in data:
                product["product_name"] = data["product_name"]
            if "brands" in data:
                product["brands"] = data["brands"]

            if "ingredients_text" in data:
                product["ingredients_text"] = data["ingredients_text"]

            return jsonify(product),200
    return jsonify({"error":"Item not found"})

# Code to delete an Item
@app.route("/inventory/<int:id>", methods = ["DELETE"])
def delete_item(id):
    for item in inventory:
        if item["id"] == id:
            inventory.remove(item)
            return "",200
            return jsonify({"error":"Item not found"}),404
    return jsonify({"error": "Item not found"}), 404

if __name__ == "__main__":
    print(app.url_map)
    app.run(debug=True)
