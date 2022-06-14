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

// import middlewares
const middlewares = require("./middlewares/auth");


// Define Routes auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me", middlewares.authenticate, authController.currentUser);

// Define Routes Account
app.get("/api/users/:id", userController.getById);
app.put("/api/users/update/:id", middlewares.authenticate, upload.single("picture"), userController.updateById);

// Public File Access
app.use("/public/files", express.static(path.join(__dirname, "/storages")));

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});