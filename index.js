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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
