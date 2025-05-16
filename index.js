const express = require('express');
const dotenv = require('dotenv');
const app = express();
const puerto = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Backend ROCK-MTB funcionando!');
});

app.get('/verificar-token', async (req, res) => {
  const axios = require('axios');
  try {
    const respuesta = await axios.get('https://api.mercadopago.com/users/me', {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_DE_ACCESO}`
      }
    });
    res.json({
      mensaje: 'Token válido',
      datos: respuesta.data
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Token inválido',
      error: error.response?.data || error.message
    });
  }
});

app.post('/webhook', require('./webhook'));

app.listen(puerto, () => {
  console.log(`Servidor ROCK-MTB escuchando en puerto ${puerto}`);
});
