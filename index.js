const express = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configurar credenciales de Mercado Pago
mercadopago.configure({
  access_token: process.env.TOKEN_DE_ACCESO
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend ROCK-MTB funcionando");
});

// Ruta para crear preferencia
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

// Webhook para recibir notificaciones
app.post("/webhook", (req, res) => {
  const payment = req.body;
  console.log("Webhook recibido:", payment);

  // Aquí podés validar el pago y activar el usuario premium

  res.sendStatus(200);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
