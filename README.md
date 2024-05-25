#  Valantis Project

## Project Link: [Valantis](https://margaritashch.github.io/VALANTIS/)
(API currently unavailable)

Valantis Project is a web application for viewing and filtering products using the Valantis API. The application includes features such as product search, filtering by price and brand, and pagination of results.

## Requirements
- Use the provided API to create a page that displays a list of products.
- Each product should display its id, name, price, and brand.
- Display 50 products per page with pagination support for navigating both forwards and backwards.
- Enable filtering of results using the provided API by name, price, and brand.
- If the API returns duplicate ids, count them as a single product and display only the first one, even if other fields differ.
- If the API returns an error, log the error identifier to the console, if available, and retry the request.

## Documentation
[API Documentation](https://github.com/ValantisJewelry/TestTaskValantis/blob/main/API.md)

## Stack
- **JavaScript + Modules**
- **SCSS**
- **HTML**

## Dependencies
The project uses the following key dependencies:
- `md5` for password hashing.
- `fetch API` for performing HTTP requests to the API.

## Project Description
This project uses the Model-View-Controller (MVC) architectural pattern, which helps in clearly separating code into model, view, and controller. This approach simplifies dependency management, enhances scalability, and makes testing different parts of the application easier.

### Why MVC was Chosen

- **Separation of Concerns:** MVC divides the application into three key components, making code management and testing easier.
- **Development Flexibility:** Developers can work on the model, view, and controller simultaneously, speeding up the development process.
- **Ease of Scaling:** Due to the clear separation, the application can be easily scaled by adding new features and changing logic without interfering with the user interface.

### Accomplishments
- **Modularity:** The project is structured based on a modular approach, separating logic into models (Model), views (View), and controllers (Controller). This ensures clean code, easy maintenance, and scalability. Each module performs its task, reducing coupling and increasing the cohesion of system components.
- **Data Caching:** To optimize performance and reduce the number of server requests, data caching of product ids and query results is implemented (`this.idsCache` and `this.totalItemsCountCache`). This speeds up repeated requests for data already obtained in previous sessions.
- **Code Reusability:** Functionality is divided into reusable methods such as `fetchAPI`, `getUniquePriceOptions`, `getUniqueBrandOptions`, which simplifies code management and further maintenance.
- **Pagination:** Products on the site are divided into pages, with 50 items per page.
- **Filtering:** Filtering options by price and brand.
- **Search:** Implemented search functionality for products by name.

### Problems and Solutions

- **Filtering without Pagination:** Currently, the API does not support pagination for filtered results.

   **Solution:**
  1. **Store Filtering Results:** Save all API filtering results in the client's internal state. This allows for managing data display without needing to request the server each time.
  2. **Dynamic Data Loading:** For large volumes of data, consider dynamically loading filtering results as the page scrolls or when moving to the next pagination page.

