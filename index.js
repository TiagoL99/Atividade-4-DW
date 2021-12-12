const PORTA =  8050                                         
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./rotas/rotas")(app);
app.listen(PORTA, () => console.log(`Servidor a correr na porta ${PORTA}`));
app.use(express.static('public'));