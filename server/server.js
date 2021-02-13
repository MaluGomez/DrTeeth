var express = require ('express'); 
var ruta = require ('ruta'); 
var serveStatic = require ('servicio-estático');
aplicación = express (); 
app.use (serveStatic (__ dirname + "/ dist"));
var port = process.env.PORT || 5000; 
app.listen (puerto);
console.log ('servidor iniciado' + puerto);