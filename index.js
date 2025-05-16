const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

app.get("/", (req, res) => {
  res.send("¡Backend ROCK-MTB funcionando!");
});

app.get("/success", (req, res) => {
  res.send("¡Pago exitoso! Gracias por apoyar ROCK-MTB.");
});

app.get("/failure", (req, res) => {
  res.send("El pago no se completó. Intentalo de nuevo.");
});

app.post("/create_preference", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Suscripción Premium ROCK-MTB",
          unit_price: 1000,
          quantity: 1,
        },
      ],
      back_urls: {
        success: "https://rock-mtb-backend.onrender.com/success",
        failure: "https://rock-mtb-backend.onrender.com/failure",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
