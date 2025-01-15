// import AlumniController
const AlumniController = require("../controllers/AlumniController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Alumni API Express");
});

// Alumni routes
router.get("/alumni", AlumniController.index); // Route menampilkan semua alumni
router.post("/alumni", AlumniController.store); // Route menambahkan data alumni
router.put("/alumni/:id", AlumniController.update); // Route mengedit data alumni
router.delete("/alumni/:id", AlumniController.destroy); // Route menghapus data alumni
router.get("/alumni/:id", AlumniController.show ); // Route menampilkan data alumni berdasarkan id
router.get("/alumni/search/:name", AlumniController.search); // Route pencarian berdasarkan nama
router.get("/alumni/status/fresh-graduate", AlumniController.freshGraduate); // Route pencarian berdasarkan status
router.get("/alumni/status/employed", AlumniController.employed); // Route pencarian berdasarkan status
router.get("/alumni/status/unemployed", AlumniController.unemployed); // Route pencarian berdasarkan status

// export router
module.exports = router;
