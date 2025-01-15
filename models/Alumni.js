// import database
const db = require("../config/database");

// membuat class Model Student
class Alumni {
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from alumni";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";

      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results.insertId); // Mengembalikan data yang baru diinsert dengan id yang dihasilkan
      });
    });

    const student = this.find(id); // Mengembalikan data yang baru diinsert dengan id yang dihasilkan menggunakan find
    return student;
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";

      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Mengembalikan data yang ditemukan
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) return reject(err);

        // Kembalikan data yang baru diperbarui
        resolve({ id, ...data });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";

      db.query(sql, id, (err, results) => {
        resolve({ results }); // Mengembalikan data yang dihapus
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";

      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Mengembalikan data yang ditemukan
      });
    });
  }

  // Find alumni by name using LIKE
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE name LIKE ?";
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) reject(err);
        resolve(results); // Mengembalikan hasil pencarian
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE status = ?";
      db.query(sql, [status], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
