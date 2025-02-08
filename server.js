const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./src/middlewares/errorHandler'); 
const vehicleRoutes = require('./src/routes/vehicleRoutes'); 
const driverRoutes = require('./src/routes/driverRoutes'); 

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors());

// Rota de teste inicial
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Rotas principais
app.use('/api/vehicles', vehicleRoutes); 
app.use('/api/drivers', driverRoutes); 

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
