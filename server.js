const express = require("express");
const app = express();
const PORT = 2000;
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/fileUpload");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Controllers
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

// import middlewares
const middlewares = require("./middlewares/auth");


// Define Routes auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me", middlewares.authenticate, authController.currentUser);

// Define Routes Users
app.get("/users/:id", userController.getById);
app.put("/users/update/:id", middlewares.authenticate, upload.single("picture"), userController.updateById);
app.get("/users/:id/products?", userController.getProductBySellerId);

// Define Routes Products
app.get("/products", productController.getAll);
app.post("/products/create", middlewares.authenticate, upload.fields([{ name: "picture" }])
    , productController.create);
app.get("/products/:id", middlewares.authenticate, productController.getProductById);
app.put("/products/:id", middlewares.authenticate, upload.fields([{name: "picture"}])
, productController.updateProductById);
app.delete("/products/:id", middlewares.authenticate, productController.deleteProductById);
app.get("/product/filter?", productController.filterProducts);
// Public File Access
app.use("/public/files", express.static(path.join(__dirname, "/storages")));

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});