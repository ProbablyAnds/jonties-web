import axios from "axios";
import { Product } from "../@types/product";
import { Account } from "../@types/account";
import { Order } from "../@types/order";

export const getProducts = async () => {
  const response = await axios.get("http://localhost:8080/products");
  console.log(response.data);
  const products: Array<Product> = response.data.map((json: any) => mapJsonToProduct(json));
  return products;
}

export const login = async (email: string, password: string) => {

  const req = {
    method: 'post',
    url: 'http://localhost:8080/auth/login',
    data: {
      email: email,
      password: password
    }
  };

  const response = await axios(req);
  console.log(response);
  return response;
}

export const register = async (email: string, username: string, password: string) => {
  const req = {
    method: 'post',
    url: 'http://localhost:8080/auth/register',
    data: {
      email: email,
      password: password,
      username: username,
      role: "customer"
    }
  };

  const response = await axios(req);
  if(response.status === 200) {
    return login (email, password);
  }
  return response;
}

export const getAccountById = async (id: string, sessionToken: string) => {

  const req = {
    method: 'get',
    url: 'http://localhost:8080/users/' + id
  };

  const response = await axios.get(
    'http://localhost:8080/users/' + id,
    {
      headers: {
        'jontiesrest': sessionToken.toString(),
      }
    }
  )
  //axios(req);
  console.log(response);

  return mapJsonToAccount(response.data);
}

export const updateAccountUsername = async (userId: String, username: String, sessionToken: String) => {

  const response = await axios.patch(
    'http://localhost:8080/users/' + userId,
    {
      username: username
    },
    {
      headers: {
        'jontiesrest': sessionToken.toString(),
      }
    }
  )

  console.log(response);
}

export const makeOrder = async (userId: String, products: Array<Product>, sessionToken: String) => {

  const response = await axios.post(
    'http://localhost:8080/orders',
    {
      userId: userId,
      products: products.map(product => product.productId),
      total: products.reduce((sum, product) => sum + product.productPrice.valueOf(), 0),
      paid: false
    }, 
    {
      headers: {
        'jontiesrest': sessionToken.toString(),
      }
    }
  )

  console.log(response);

  return response;
}

export const getOrdersById = async (userId: String, sessionToken: String) => {
  
  const response = await axios.get(
    'http://localhost:8080/orders/' + userId,
    {
      headers: {
        'jontiesrest': (sessionToken ?? "").toString(),
      }
    }
  )

  const orders: Array<Order> = response.data.map((json: any) => mapJsonToOrder(json));
  console.log(orders);
  return orders;
}

function mapJsonToProduct(json: any): Product {
  return {
    productId: json._id,
    productName: json.name,
    productPrice: json.price,
    productDescription: json.description,
    productCount: 1,
  };
}

function mapJsonToAccount(json: any): Account {
  return {
    userId: json._id,
    username: json.username,
    email: json.email,
    role: json.role
  };
}

function mapJsonToOrder(json: any): Order {
  return {
    orderId: json._id,
    userId: json.userId,
    products: json.products,
    totalPrice: json.total,
    paid: json.paid
  }
}