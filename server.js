const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./src/middlewares/errorHandler'); // Middleware para tratamento de erros
const vehicleRoutes = require('./src/routes/vehicleRoutes'); // Rotas de veículos

dotenv.config(); 

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Rotas
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/vehicles', vehicleRoutes); // Prefixo para rotas de veículos

// Middleware global para tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
