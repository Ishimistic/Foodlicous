import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Orders from "../models/Orders.js";

dotenv.config();

//SIGN UP
export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password,} = req.body;

    if(!name || !email || !password){
      return next(createError(400, "All fields should be filed!!"));
    }

    //Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already registered"));
    }

    //Encrypting the password
    const encryptedPasswd = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPasswd
    });
    const createdUser = await user.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

//User Login.............
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return next(400, "All details are necessary!");
    }

    //Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(409, "Email n  ot found "));
    }

    const matchPasswd = await bcrypt.compare(password, user.password);

    if (!matchPasswd) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};


//ADD TO CART
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;

    const user = await User.findById(userJWT.id);
   
    const existingCartItemIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    console.log("Existing cart item index: ", existingCartItemIndex);

    if (existingCartItemIndex !== -1) {
      // Product is already in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // Product is not in the cart, add it
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
      
  } catch (err) {
    console.error("Error adding product to cart: ", err);
    next(err);
  };
};


//REMOVE FROM CART
export const removeFromCart = async (req, res, next) => {
  try{
    const {productId, quantity} = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    
    if(!user){
      return next(createError(404, "User not found"));
    }

    const productIndex = user.cart.findIndex((item) => {
      item.product.equals(productId)
    });

    if(existingCartItemIndex !== -1){
      //Found
      if(quantity && quantity > 0){ 
        user.cart[existingCartItemIndex].quantity -= quantity;
        if(user.cart[productIndex].quantity <= 0){
          usercart.cart.splice(productIndex, 1); //Removing the product
        }
      }
      else{
        user.cart.splice(productIndex, 1);
      }
      await user.save();
      return res.status(200).json({message: "Product qunatity has been updated in cart", user});
    }
    else{
      return next(createError(404, "Product not found in user's cart."));
    }
  }catch(err){
    next(err);
  }
}


// GET ALL CART ITEMS
export const getAllCartItems = async (req, res, next) => {
  try{
    const userJWT = req.user;
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Food",
    });
    const cartItems = user.cart;
    return res.status(200).json(cartItems);
  }catch(err){
    next(err);
  }
}


//PLACE ORDER
export const placeOrder = async(req, res, next) => {
  try{
    const {products, address, totalAmounts} = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    const order = new Orders({
      products,
      user: user._id,
      total_amount: totalAmounts,
      address
    });

    await order.save();
    user.cart = [];
    await user.save();

    return res.status(200).json({message: "Order placed successfully", order});
  }catch(err){
    next(err);
  }
};


//GET USER ORDERS
export const getUserOrders = async(req, res, next) => {
  try{
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    if(!user){
      return next(404, "User not found");
    }
    const orderedProducts = user.orders;

    if (!orderedProducts || orderedProducts.length === 0) {
      return next(createError(404, "No orders found for this user"));
    }

    return res.status(200).json(orderedProducts);
  
  }catch(err){
    next(err);
  }
}


//ADD TO FAVORITES
export const addToFavorites = async(req, res, next) => {
  try{
    const {productId} = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    if(!user.favorites.includes(productId)){
      user.favorites.push(productId);
      await user.save();
    }

    return res.status(200).json({message: "Product added to favorites successfully", user});

  }catch(err){
    next(err);
  }
}


//REMOVE FROM FAVORITES
export const removeFromFavorites = async(req, res, next) => {
  try{
    const {productId} = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    user.favorites = user.favorites.filter((fav) => !fav.equals(productId));
    await user.save();

    return res.status(200).json({message: "Product removed from favorites successfully", user});

  }catch(err){
    next(err);
  }
}


//GET USER's FAVORITES
export const getUserFavorites = async(req, res, next) => {
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favorites").exec();
    if(!user){
      return next(404, "User not found");
    }
    const favoriteProducts = user.favorites;

    return res.status(200).json(favoriteProducts);
  }catch(err){
    next(err);
  }
}