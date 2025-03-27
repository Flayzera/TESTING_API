const express = require("express");
const cors = require("cors"); 
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Logs para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors()); 
app.use("/users", userRoutes);
app.use(productRoutes);

// Rota de teste para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Para ambiente local
if (process.env.NODE_ENV !== 'production') {
  app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
  });
}

// Para ambiente de produção (Vercel)
module.exports = app;
