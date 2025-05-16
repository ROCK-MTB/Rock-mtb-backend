const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡ROCK-MTB backend funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
app.get("/salud", (req, res) => {
  res.status(200).send("El servidor ROCK-MTB está activo.");
});
