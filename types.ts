type Product = {
    id: string;
    productName: string;
    supplierID?: string;
    categoryID?: string;
    unit?: string;
    price: number;
};

type Products = {
    [key: string]: Product;
};

type Order = {
    id: string;
    customerID: string;
    employeeID?: string;
    orderDate: string;
    shipperID?: string;    
};

type OrderDetails = {
    id: string;
    orderID: string;
    productID: string;
    quantity: number;
    price: number;
};

type Category = {
    id: string;
    categoryName: string;
    description: string;
};

type Customer = {
    id: string;
    customerName: string;
    contact: string;
    tin: string;
};