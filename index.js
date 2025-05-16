require('dotenv').config();
const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

app.get('/', (req, res) => {
  res.send('¡ROCK-MTB backend funcionando!');
});

app.post('/create_preference', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Suscripción Premium ROCK-MTB',
          unit_price: 1000,
          quantity: 1,
        },
      ],
      back_urls: {
        success: 'https://rock-mtb-backend.onrender.com/success',
        failure: 'https://rock-mtb-backend.onrender.com/failure',
        pending: 'https://rock-mtb-backend.onrender.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la preferencia');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
