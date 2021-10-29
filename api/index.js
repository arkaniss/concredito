const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'concredito'
});

const fs = require('fs');

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

//#region   prospectos

app.get('/api/prospectos/Download', (req, res) => {
	console.log(req.query);
	const name = req.query.nombre;
	res.download('files/' + name, (err) => {
		if (err) throw err;
	});
});

app.post('/api/prospectos/Upload', (req, res) => {
	const file = req.files.documento;

	console.log(file);
	fs.writeFile('files/' + file.name, file.data, (err) => {
		if (err) throw err;

		console.log('se guardo');
	});
});

app.get('/api/prospectos', (req, res) => {
	const sql =
		"Select id,nombre,apellido,segundoApellido,calle,numero,colonia,codigopostal,telefono,rfc,documentos,case when estatus = 0 then 'Por Aprobar' when estatus = 1 then 'Aprobado' when estatus = 2 then 'Rechazado' end estatus from prospectos;";
	db.query(sql, (err, resul) => {
		res.send(resul);
	});
});

app.get('/api/prospecto', (req, res) => {
	const id = req.query.id;
	const sql =
		"Select id,nombre,apellido,segundoApellido,calle,numero,colonia,codigopostal,telefono,rfc,documentos,case when estatus = 0 then 'Por Aprobar' when estatus = 1 then 'Aprobado' when estatus = 2 then 'Rechazado' end estatus,estatus as estatusId, motivo from prospectos where id = ?;";

	db.query(sql, [ id ], (err, resul) => {
		res.send(resul);
	});
});

app.post('/api/prospectos/Insert', (req, res) => {
	const nombre = req.body.nombre;
	const apellido = req.body.apellido;
	const segundo = req.body.segundo;
	const calle = req.body.calle;
	const numero = req.body.numero;
	const colonia = req.body.colonia;
	const codigopostal = req.body.codigopostal;
	const telefono = req.body.telefono;
	const rfc = req.body.rfc;
	const documento = req.body.documento;

	const sql =
		'INSERT INTO prospectos( nombre, apellido, segundoApellido, calle, numero, colonia, codigopostal, telefono, rfc, estatus,documentos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	db.query(
		sql,
		[ nombre, apellido, segundo, calle, numero, colonia, codigopostal, telefono, rfc, 0, documento ],
		(err, resul) => {
			res.send(resul);
			console.log('error' + err);
			console.log('result' + resul);
		}
	);
});

app.post('/api/prospectos/Update', (req, res) => {
	const estatus = req.body.estatus;
	const motivo = req.body.motivo;
	const id = req.body.id;

	const sql = 'update prospectos set  estatus = ? ,motivo = ? where id = ?;';
	db.query(sql, [ estatus, motivo, id ], (err, resul) => {
		res.send(resul);
		console.log('error' + err);
		console.log('result' + resul);
	});
});
//#endregion

//#region   Login
app.post('/api/login', (req, res) => {
	const user = req.body.user;
	const password = req.body.password;
	const sql = 'Select * from usuarios where user = ? and password = ? limit 1;';
	db.query(sql, [ user, password ], (err, resul) => {
		console.log(resul);
		res.send(resul[0]);
	});
});
//#endregion

app.listen(3001, () => {});
