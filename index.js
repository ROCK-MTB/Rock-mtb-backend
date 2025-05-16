const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡ROCK-MTB backend funcionando!');
});

app.get('/salud', (req, res) => {
  res.send('OK');
});

// NUEVO: Webhook
app.post('/webhook', (req, res) => {
  console.log('Webhook recibido:', JSON.stringify(req.body, null, 2));

  // Si la notificación es de un pago
  if (req.body.type === 'payment') {
    const paymentId = req.body.data.id;
    console.log('Pago recibido. ID:', paymentId);

    // Aquí deberías consultar la API de Mercado Pago si querés más info
    // y activar la cuenta premium del usuario correspondiente
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
