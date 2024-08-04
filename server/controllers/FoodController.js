// import mongoose from "mongoose";
import mongoose from "mongoose";
import Food from "../models/Food.js";
import { createError } from "../error.js";

export const addProducts = async (req, res, next) => {
  try {
    const foodData = req.body;
    if (!Array.isArray(foodData)) {
      return next(
        createError(400, "Invalid request. Expected an array of foods")
      );
    }
    let createFoods = [];
    for (const foodInfo of foodData) {
      const { name, desc, img, price, ingredients, category } = foodInfo;
      const product = new Food({
        name,
        desc,
        img,
        price,
        ingredients,
        category,
      });

      const createdFood = await product.save();
      createFoods.push(createdFood);
    }
    return res
      .status(201)
      .json({ message: "Products added successfully", createFoods });
  } catch (err) {
    console.log(err);
  }
};

//Only for officals
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "Invalid request. Product ID is required"));
    }

    const deletedProduct = await Food.findByIdAndDelete(id);
    if (!deletedProduct) {
      return next(createError(404, "Product not found"));
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    return next(
      createError(500, "An error occurred while deleting the product")
    );
  }
};

export const getFoodItems = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, ingredients, search } = req.body;
    ingredients = ingredients?.split(",");
    categories = categories?.split(",");

    const filter = {};
    if (categories && Array.isArray(categories)) {
      filter.category = { $in: categories }; // Match products in any of the specified categories
    }
    if (ingredients && Array.isArray(ingredients)) {
      filter.category = { $in: ingredients }; // Match products in any of the specified ingredients
    }

    if (minPrice || maxPrice) {
      filter["price.org"] = {};
      if (minPrice) {
        filter["price.org"]["$gte"] = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter["price.org"]["$lte"] = parseFloat(maxPrice);
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
        { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
      ];
    }
    const foodList = await Food.find(filter);

    return res.status(200).json(foodList);
  } catch (err) {
    next(err);
  }
};

export const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }
    const food = await Food.findById(id);
    if (!food) {
      return next(createError(404, "Food not found"));
    }

    return res.status(200).json(food);
  } catch (err) {
    next(err);
  }
};