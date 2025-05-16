const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const evento = req.body;

  if (evento && evento.type === 'payment') {
    console.log('Pago recibido:', evento.data);
    // Acá podés activar usuario premium, guardar en la base de datos, etc.
  }

  res.sendStatus(200); // Mercado Pago espera 200 OK
});

module.exports = router;
