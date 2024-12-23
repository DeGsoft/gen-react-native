import { TablesSchema } from "tinybase/store";

const tablesSchema: TablesSchema = {
    // The TinyBase table contains the todos, with 'text' and 'done' cells.
    todos: {
        text: { type: 'string' },
        done: { type: 'boolean', default: false },
    },
    /* CREATE TABLE Categories
    (      
        CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
        CategoryName TEXT,
        Description TEXT
    ); */
    categories: {
        categoryName: { type: 'string' },
        description: { type: 'string' },
    },
    /* CREATE TABLE Customers
    (      
        CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
        CustomerName TEXT,
        ContactName TEXT,
        Address TEXT,
        City TEXT,
        PostalCode TEXT,
        Country TEXT
    ); */
    customers: {
        customerName: { type: 'string' },
        contactName: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        postalCode: { type: 'string' },
        country: { type: 'string' },
    },
    /* CREATE TABLE Employees
    (
        EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
        LastName TEXT,
        FirstName TEXT,
        BirthDate DATE,
        Photo TEXT,
        Notes TEXT
    ); */
    employees: {
        lastName: { type: 'string' },
        firstName: { type: 'string' },
        birthDate: { type: 'string' },
        photo: { type: 'string' },
        notes: { type: 'string' },
    },
    /* CREATE TABLE Shippers(
        ShipperID INTEGER PRIMARY KEY AUTOINCREMENT,
        ShipperName TEXT,
        Phone TEXT
    ); */
    shippers: {
        shipperName: { type: 'string' },
        phone: { type: 'string' },
    },
    /* CREATE TABLE Suppliers(
        SupplierID INTEGER PRIMARY KEY AUTOINCREMENT,
        SupplierName TEXT,
        ContactName TEXT,
        Address TEXT,
        City TEXT,
        PostalCode TEXT,
        Country TEXT,
        Phone TEXT
    ); */
    suppliers: {
        supplierName: { type: 'string' },
        contactName: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        postalCode: { type: 'string' },
        country: { type: 'string' },
        phone: { type: 'string' },
    },
    /* CREATE TABLE Products(
        ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
        ProductName TEXT,
        SupplierID INTEGER,
        CategoryID INTEGER,
        Unit TEXT,
        Price NUMERIC DEFAULT 0,
        FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID),
        FOREIGN KEY (SupplierID) REFERENCES Suppliers (SupplierID)
    ); */
    products: {
        productName: { type: 'string' },
        supplierID: { type: 'number' },
        categoryID: { type: 'number' },
        unit: { type: 'string' },
        price: { type: 'number' },
        category: { type: 'string' },
        supplier: { type: 'string' },
    },
    /* CREATE TABLE Orders(
        OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
        CustomerID INTEGER,
        EmployeeID INTEGER,
        OrderDate DATETIME,
        ShipperID INTEGER,
        FOREIGN KEY (EmployeeID) REFERENCES Employees (EmployeeID),
        FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
        FOREIGN KEY (ShipperID) REFERENCES Shippers (ShipperID)
    ); */
    orders: {
        customerID: { type: 'number' },
        employeeID: { type: 'number' },
        orderDate: { type: 'string' },
        shipperID: { type: 'number' },
        employee: { type: 'string' },
        customer: { type: 'string' },
        shipper: { type: 'string' },
    },
    /* CREATE TABLE OrderDetails(
        OrderDetailID INTEGER PRIMARY KEY AUTOINCREMENT,
        OrderID INTEGER,
        ProductID INTEGER,
        Quantity INTEGER,
        FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
        FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
    ); */
    orderDetails: {
        orderID: { type: 'number' },
        productID: { type: 'number' },
        quantity: { type: 'number' },
        order: { type: 'string' },
        product: { type: 'string' },
    },
} as const; // NB the `as const` modifier

export { tablesSchema };