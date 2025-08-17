const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//importe Express para mas chevere
app.use(express.json());

//rutas tipo GET
app.get("/", (req, res) => {
  res.status(200).json({ ok: true, message: "Hola desde Express" });
});

app.get("/ping", (req, res) => {
  res.status(200).json({ pong: true, time: new Date().toISOString() });
});

app.post("/echo", (req, res) => {
  //Ruta tipo Post
  res.status(201).json({ received: req.body || null });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

//revivan el server
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
