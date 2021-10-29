import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
	const [ usuario, setUsuario ] = useState('');
	const [ password, setPassword ] = useState('');

	let history = useHistory();

	const LoginUser = () => {
		Axios.post('http://localhost:3001/api/login', {
			user: usuario,
			password: password
		}).then((res) => {
			if (res.data === '') alert('Usuario o contraseña incorrecta');
			else history.push('/prospectos');
		});
	};

	const NuevoProspecto = () => {
		history.push('/prospecto');
	};

	return (
		<div className="container">
			<br />
			<br />
			<br />
			<div className="col-4 offset-md-4">
				<div className="row ">
					<h2> Login</h2>
					<label>Usuario</label>
					<input
						type="text"
						className="form-control"
						name="usuario"
						onChange={(e) => {
							setUsuario(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Contraseña</label>
					<input
						type="password"
						className="form-control"
						name="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<br />
				<div className="row">
					<button className="btn btn-primary" onClick={LoginUser}>
						Ingresar
					</button>
				</div>
				<br />
				<br />
				<div className="row">
					<button className="btn btn-primary" onClick={NuevoProspecto}>
						Nuevo Prospecto
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
