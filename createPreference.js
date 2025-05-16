const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

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

mercadopago.preferences
  .create(preference)
  .then((response) => {
    console.log("ID de preferencia:", response.body.id);
  })
  .catch((error) => {
    console.error("Error al crear preferencia:", error);
  });
Crear createPreference.js
