import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/",
});

//Authorization
export const UserSignUp = async(data) => await API.post("/user/signup", data);
export const UserSignIn = async(data) => await API.post("/user/signin", data);

//Products
export const getAllProducts = async(filter) => await API.get(`/food?${filter}`, filter);
export const getProductDetails = async(id) => await API.get(`/food?${id}`);

//Cart
export const getCart = async(token) => await API.get(`/user/cart`, {
    headers: {Authorization: `Bearer ${token}`},
});

export const addToCart = async(token, data) => {
    await API.post(`/user/cart/`, data, {
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const deleteFromCart = async(token, data) => {
    await API.patch(`/user/cart/`, data, {
        headers: {Authorization: `Bearer ${token}`},
    })
}

//Favorites
export const getFavorites = async(token) => await API.get(`/user/favorites`, {
    headers: {Authorization: `Bearer ${token}`},
});

export const addToFavorites = async(token, data) => {
    await API.post(`/user/favorites/`, data, {
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const deleteFromFavorites = async(token, data) => {
    await API.patch(`/user/cart/`, data, {
        headers: {Authorization: `Bearer ${token}`},
    })
}


//Orders
export const getOrders = async(token) => await API.get(`/user/cart`, {
    headers: {Authorization: `Bearer ${token}`},
});

export const placeOrder = async(token, data) => {
    await API.post(`/user/cart/`, data, {
        headers: {Authorization: `Bearer ${token}`}
    })
}
