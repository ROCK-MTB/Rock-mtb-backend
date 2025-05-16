const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Notificación de Mercado Pago:');
  console.log(JSON.stringify(req.body, null, 2));

  // Lógica futura: actualizar usuario a "premium"
  res.status(200).send('Webhook recibido');
});

module.exports = router;
