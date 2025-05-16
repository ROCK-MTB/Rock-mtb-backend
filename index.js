const express = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();

const app = express();
app.use(express.json());

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// Ruta de verificación simple
app.get("/", (req, res) => {
  res.send("¡Backend ROCK-MTB funcionando!");
});

// Ruta webhook para Mercado Pago
app.post("/webhook", (req, res) => {
  console.log("Webhook recibido:", req.body);

  const payment = req.body;

  if (payment.action === "payment.created" || payment.action === "payment.updated") {
    // Aquí podrías verificar el pago y actualizar estado del usuario
    console.log("Pago recibido, procesar usuario Premium");
  }

  res.status(200).send("OK");
});

// NUEVA ruta para crear una preferencia de pago
app.get("/crear-preferencia", async (req, res) => {
  const preference = {
    items: [
      {
        title: "Suscripción Premium ROCK-MTB",
        quantity: 1,
        unit_price: 1000
      }
    ],
    notification_url: "https://rock-mtb-backend.onrender.com/webhook",
    back_urls: {
      success: "https://rock-mtb.com/success",
      failure: "https://rock-mtb.com/failure",
      pending: "https://rock-mtb.com/pending"
    },
    auto_return: "approved"
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id, init_point: response.body.init_point });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).send("Error al crear preferencia");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
