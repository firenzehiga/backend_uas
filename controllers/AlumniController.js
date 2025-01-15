// import Model Alumni
const Alumni = require("../models/Alumni");
const { check, validationResult } = require("express-validator");
class AlumniController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const alumni = await Alumni.all();

    // Kondisi jika panjang array lebih dari 0 maka akan menampilkan data
    if (alumni.length > 0) {
      const data = {
        message: "Get All Resource",
        data: alumni,
      };
      // menggunakan short if else
      return res.status(200).json(data);
    }
    //else
    const data = {
      message: "Data is Empty",
    };

    res.status(200).json(data);
  }

  async store(req, res) {
    // Validasi data menggunakan express-validator
    await check("name").notEmpty().withMessage("Nama harus diisi").run(req);
    await check("phone").notEmpty().withMessage("Telepon harus valid").run(req);
    await check("address")
      .notEmpty()
      .withMessage("Alamat harus diisi")
      .run(req);
    await check("graduation_year")
      .isInt()
      .withMessage("Tahun Kelulusan harus diisi")
      .notEmpty()
      .withMessage("Tahun Kelulusan harus diisi")
      .run(req);
    await check("status").notEmpty().withMessage("Status harus diisi").run(req);

    // Menangani hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = {
        message: "All fields must be filled correctly",
        error: errors.array(),
      };

      return res.status(422).json(data);
    }

    // Melakukan penambahan data dari body
    const {
      name,
      phone,
      address,
      graduation_year,
      status,
      company_name,
      position,
    } = req.body;

    // Menambahkan data menggunakan then-catch
    Alumni.create({
      name,
      phone,
      address,
      graduation_year,
      status,
      company_name,
      position,
    })
      .then((alumni) => {
        return res.status(201).json({
          message: "Resource is added successfully",
          data: alumni,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Resource failed to add",
          error: error.message,
        });
      });
  }

  async update(req, res) {
    const { id } = req.params;

    // Cari id alumni
    const alumni = await Alumni.find(id);

    if (alumni) {
      const alumniUpdated = await Alumni.update(id, req.body);

      const data = {
        message: "Resource is update successfully",
        data: alumniUpdated,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    // Cari id alumni
    const alumni = await Alumni.find(id);

    if (alumni) {
      await Alumni.delete(id);
      const data = {
        message: "Resource is deleted successfully",
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    // Cari id alumni
    const alumni = await Alumni.find(id);

    if (alumni) {
      const data = {
        message: "Get Detail Resource",
        data: alumni,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params; // Mengambil nama dari path parameter

    if (!name) {
      return res.status(400).json({ message: "Nama tidak boleh kosong" });
    }

    Alumni.search(name)
      .then((alumni) => {
        if (alumni.length === 0) {
          return res.status(404).json({ message: "Resource not found" });
        }
        const data = {
          message: "Get Search Resource",
          data: alumni,
        };
        res.status(200).json(data); // Kirim data mahasiswa yang ditemukan
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
      });
  }

  async freshGraduate(req, res) {
    // Mencari alumni dengan status fresh graduate
    Alumni.findByStatus("Fresh Graduate")
      .then((alumni) => {
        if (alumni.length > 0) {
          res.status(200).json({
            message: "Get Fresh Graduate Resource",
            total: alumni.length,
            data: alumni,
          });
        } else {
          res.status(404).json({
            message: "Resource not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Terjadi kesalahan", error });
      });
  }

  async employed(req, res) {
    // Mencari alumni dengan status employed
    Alumni.findByStatus("Employed")
      .then((alumni) => {
        if (alumni.length > 0) {
          res.status(200).json({
            message: "Get Employed Resource",
            total: alumni.length,
            data: alumni,
          });
        } else {
          res.status(404).json({
            message: "Resource not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Terjadi kesalahan", error });
      });
  }

  async unemployed(req, res) {
    // Mencari alumni dengan status unemployed
    Alumni.findByStatus("Unemployed")
      .then((alumni) => {
        if (alumni.length > 0) {
          res.status(200).json({
            message: "Get Unemployed Resource",
            total: alumni.length,
            data: alumni,
          });
        } else {
          res.status(404).json({
            message: "Resource not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Terjadi kesalahan", error });
      });
  }
}

// Membuat object AlumniController
const object = new AlumniController();

// Export object AlumniController
module.exports = object;
