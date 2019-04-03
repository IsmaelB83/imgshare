const express = require('express');
const config = require('./server/config');
const mongoose = require('./database');

const app = config(express());

app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en puerto: ${app.get('port')}`);
})