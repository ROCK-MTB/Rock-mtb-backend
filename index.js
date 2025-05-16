require('dotenv').config();
const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

app.use(express.json());

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

app.get('/', (req, res) => {
  res.send('Servidor ROCK-MTB activo');
});

app.post('/crear-preferencia', async (req, res) => {
  try {
    const preferencia = {
      items: [
        {
          title: 'Suscripción Premium - ROCK-MTB',
          unit_price: 525,
          quantity: 1,
          currency_id: 'ARS'
        }
      ],
      back_urls: {
        success: 'https://rock-mtb.com/success',
        failure: 'https://rock-mtb.com/failure',
        pending: 'https://rock-mtb.com/pending'
      },
      auto_return: 'approved',
      notification_url: 'https://rock-mtb-backend.onrender.com/webhook'
    };

    const respuesta = await mercadopago.preferences.create(preferencia);
    res.json({ init_point: respuesta.body.init_point });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia' });
  }
});

app.get('/pagar', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Suscripción ROCK-MTB</title>
    </head>
    <body>
      <h1>Suscripción Premium - ROCK-MTB</h1>
      <button onclick="iniciarPago()">Pagar con Mercado Pago</button>

      <script>
        async function iniciarPago() {
          const res = await fetch('/crear-preferencia', { method: 'POST' });
          const data = await res.json();
          if (data.init_point) {
            window.location.href = data.init_point;
          } else {
            alert("Error al generar link de pago.");
          }
        }
      </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
