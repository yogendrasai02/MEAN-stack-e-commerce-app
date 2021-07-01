/**
 *  ENDPOINTS:
 *  domain/product/getCategories
 *  domain/product/getCategoryData/<categoryId>
 *  domain/product/addCategory
 *  domain/product/updateCategory/<categoryId>
 *  domain/product/deleteCategory/<categoryId>
 *  -------------
 *  domain/product/getAllProducts
 *  domain/product/getProducts/<categoryId>
 *  domain/product/addProduct
 *  domain/product/updateProduct/<prodId>
 *  domain/product/deleteProduct/<prodId>
 */

const exp = require("express");
const productApiRoute = exp.Router();

/**
 * Dealing with categories
 */

// get categories
productApiRoute.get("/getCategories", async (req, res) => {
    let coll = req.app.get("dbObj").collection("categoryCollection");
    let categoryData = await coll.find({}, { _id: 0 }).sort({ categoryName : 1 }).toArray();
    res.send({
        categoriesData:categoryData
    });
});

// get category data
productApiRoute.get("/getCategoryData/:categoryId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("categoryCollection");
    let categoryId = +req.params.categoryId;
    let data = await coll.findOne({ categoryId: categoryId });
    if (data)
        res.send({ categoryData: data });
    else
        res.send({ message: "Category with given id not found" });
});

// add category
// payload is new category data
productApiRoute.post("/addCategory", async (req, res) => {
    let coll = req.app.get("dbObj").collection("categoryCollection");
    let newCategoryData = req.body;
    let newCategoryId = newCategoryData.categoryId;
    let existingCategoryData = await coll.findOne({ categoryId: newCategoryId });
    if (existingCategoryData)
        res.send({
            message: "Category with given id already exists"
        });
    else {
        let insertedResult = await coll.insertOne(newCategoryData);
        res.send({
            "inserted":"success"
        });
    }
});

// update category: add subcategories
// payload is obj with category id, new subcategories array
productApiRoute.put("/updateCategory/:categoryId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("categoryCollection");
    let categoryId = +req.params.categoryId;
    let newCategoryObj = req.body;
    let existingCategory = await coll.findOne({ categoryId: categoryId });
    if (existingCategory) {
        let updatedResult = await coll.replaceOne({ categoryId: categoryId }, newCategoryObj);
        res.send({
            "updated":"success"
        });
    }
    else
        res.send({
            message: "Given category does not exist"
        });
});

// delete category
productApiRoute.delete("/deleteCategory/:categoryId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("categoryCollection");
    let categoryId = +req.params.categoryId;
    let existingCategory = await coll.findOne({ categoryId: categoryId });
    if (existingCategory) {
        let deletedResult = await coll.deleteOne({ categoryId: categoryId });
        res.send({
            "deleted":"success"
         });
    }
    else
        res.send({
            message: "Category not found"
        });
});

/**
 * Dealing with products
 */
// get products
productApiRoute.get("/getAllProducts", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let products = await coll.find({}, { _id:0 }).sort({ prodName : 1 }).toArray();
    res.send({
        products: products
    });
});

// get products for a specific category
productApiRoute.get("/getProducts/:categoryId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let categoryId = +req.params.categoryId;
    let products = await coll.find({ prodCategoryId: categoryId }).sort({ prodName: 1 }).toArray();
    res.send({
        products: products
    });
});

// get product for a specific prodId
productApiRoute.get("/getProduct/:prodId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let prodId = +req.params.prodId;
    let prod = await coll.findOne({ prodId: prodId });
    if (prod)
        res.send({ productData: prod });
    else
        res.send({ message: "Product not found" });
});

// add product
productApiRoute.post("/addProduct", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let productObj = req.body;
    let prodId = productObj.prodId;
    let existingProduct = await coll.findOne({ prodId: prodId });
    if (existingProduct)
        res.send({ message: "Product with given id already exists" });
    else {
        let insertedResult = await coll.insertOne(productObj);
        res.send({
            added: "success"
        });
    }
});

// update product
productApiRoute.put("/updateProduct", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let updProdObj = req.body;
    let prodId = +updProdObj.prodId;
    let existingProduct = await coll.findOne({ prodId: prodId });
    if (existingProduct) {
        let updatedResult = await coll.replaceOne({ prodId: prodId }, updProdObj);
        res.send({
            "updated":"success"
        });
    }
    else
        res.send({
            message: "Product with given id not found"
        });
});

// update for sale
productApiRoute.put("/updateForSale", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let obj = req.body;
    let id = obj.prodId;
    let existingProd = await coll.findOne({ prodId: id });
    if (existingProd) {
        let upd = await coll.updateOne({ prodId: id }, { $set: { forSale: obj.forSale } });
        res.send({ updated: "success" });
    }
    else
        res.send({ message: "product not found" });
});

// update stock
productApiRoute.put("/updateStock", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let obj = req.body;
    let id = obj.prodId;
    let existingProd = await coll.findOne({ prodId: id });
    if (existingProd) {
        let currStock = existingProd.stock;
        let upd = await coll.updateOne({ prodId: id }, { $set: { stock: obj.stock + currStock } });
        res.send({ updated: "success" });
    }
    else
        res.send({ message: "product not found" });
});

// delete product
productApiRoute.delete("/deleteProduct/:prodId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("productCollection");
    let prodId = +req.params.prodId;
    let existingProduct = await coll.findOne({ prodId: prodId });
    if (existingProduct) {
        let deletedResult = await coll.deleteOne({ prodId: prodId });
        res.send({
            deleted:"success"
        });
    }
    else
        res.send({
            message: "Product with given id not found"
        });
});


module.exports = productApiRoute;