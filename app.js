// import express and router
const express = require("express");
const router = require("./routes/api");
const protectedRoute = require("./routes/protected");
const loginRoute = require("./routes/auth/login");
// import dotenv dan menjalankan method config
require("dotenv").config();

// buat object express
const app = express();

// menggunakan middleware
app.use(express.json());

// Rute login
app.use(loginRoute);  

app.use(protectedRoute);  // Rute yang dilindungi

// menggunakan router
app.use(router);

// mendefinisikan port
app.listen(3000);
