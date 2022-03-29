const { Transactions } = require('../models');

module.exports = {
  getAllTransaction: (req, res) => {
    Transactions.findAll().then((transactions) => {
      res.json(transactions);
    });
  },

  createTransaction: (req, res) => {
    const { namaBarang, harga, jumlah } = req.body;
    const now = Date.now();
    Transactions.create({ namaBarang, harga, jumlah, tanggal: now })
      .then((transacation) => {
        res.json(transacation);
      })
      .catch((error) => console.log(error));
  },

  updateTransaction: (req, res) => {
    const { namaBarang, harga, jumlah } = req.body;
    Transactions.update(
      { namaBarang, harga, jumlah },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.json({ namaBarang, harga, jumlah });
      })
      .catch((error) => console.log(error));
  },

  destroyTransaction: (req, res) => {
    Transactions.destroy({ where: { id: req.params.id } })
      .then((transaction) => {
        res.json('success menghapus');
      })
      .catch((error) => console.log(error));
  },
};
