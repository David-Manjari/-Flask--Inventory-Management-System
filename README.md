# Inventory Management
This project is created as a demo of crud applications using python APIs and displaying the changes on a webpage

## Project Overview
### Problem
This application resolves the issue of acquiring pre created data and displaying it for the users
It is intended to show my understanding of APIs and creating a fully functional web App.
The app fetches data required by a user and displays it for them, while also giving the user the capability to :
- Add their own data
- Edit the data displayed
- Delete unwanted data
## Features
    - Add Inventory Items
    - Edit Inventory Items
    - Delete Inventory Items
    - View available stock
    - Fetch stock data from API
## Technologies Used
- Python
- Flask
- HTML
- CSS
- JavaScript
- Git & GitHub
## Project Structure
Flask-Inventory-Management-System/

    * Static/
        - index.js
        - index.css
        - editForm.css
    * templates/
        - index.html
        - editForm.html
    * app.py
    * requirements.txt
    * README.md
    * gitignore

## Installation

    1. Clone the repository
       - git clone [GitHub Repository](https://github.com/David-Manjari/-Flask--Inventory-Management-System)
       ```bash
            git clone https://github.com/David-Manjari/-Flask--Inventory-Management-System.git

    2. Navigate into the project
        - cd Flask-Inventory-Management-System

    3. Create a virtual environment
        - python -m venv venv

    4. Activate the virtual environment
        - Windows
            venv\Scripts\activate
        - Linux/macOS
            source venv/bin/activate
        - Install dependencies
            pip install -r requirements.txt
## Running the Application
After installing and activating the virtual environment, run the command ***flask run*** or ***python app.py***.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/items | Get all items |
| GET | /api/items/<id> | Get an item |
| POST | /api/items | Create an item |
| PATCH | /api/items/<id> | Update an item |
| DELETE | /api/items/<id> | Delete an item |
| FETCH | /api/tests/<barcode> | Add an Item from an api

## Future Improvements

- Add inventory reports
- Add low-stock notifications
- Add dashboard analytics
- Deploy the application

## License

This project is licensed under the MIT License.

## Author

David Manjari

GitHub: https://github.com/David-Manjari