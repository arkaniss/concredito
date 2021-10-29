import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Prospecto() {
	let history = useHistory();
	let params = useParams();
	const [ readonlyTag, setreadonly ] = useState(false);
	const [ hiddenTag, setHidden ] = useState(false);
	useEffect(() => {
		if (params.id !== undefined) {
			axios.get('http://localhost:3001/api/prospecto?id=' + params.id).then((res) => {
				console.log(res);
				setNombre(res.data[0].nombre);
				setApellido(res.data[0].apellido);
				setSegundo(res.data[0].segundoApellido);
				setCalle(res.data[0].calle);
				setNumero(res.data[0].numero);
				setColonia(res.data[0].colonia);
				setCodigopostal(res.data[0].codigopostal);
				setTelefono(res.data[0].telefono);
				setRfc(res.data[0].rfc);
				setDocumento(res.data[0].documentos);
				setEstatus(res.data[0].estatusId);
				setMoptivo(res.data[0].motivo);
				setHidden(res.data[0].estatusId !== 2 ? true : false);
			});
			setreadonly(true);
		}
	}, []);

	const [ nombre, setNombre ] = useState('');
	const [ apellido, setApellido ] = useState('');
	const [ segundo, setSegundo ] = useState('');
	const [ calle, setCalle ] = useState('');
	const [ numero, setNumero ] = useState('');
	const [ colonia, setColonia ] = useState('');
	const [ codigopostal, setCodigopostal ] = useState('');
	const [ telefono, setTelefono ] = useState('');
	const [ rfc, setRfc ] = useState('');
	const [ documento, setDocumento ] = useState('');
	const [ estatus, setEstatus ] = useState(0);
	const [ motivo, setMoptivo ] = useState('');

	const [ selectedFile, setSelectedFile ] = useState();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const InsertUser = () => {
		if (nombre === '') return;
		if (apellido === '') return;
		if (calle === '') return;
		if (numero === '') return;
		if (colonia === '') return;
		if (codigopostal === '') return;
		if (telefono === '') return;
		if (rfc === '') return;

		const formData = new FormData();

		formData.append('documento', selectedFile);

		axios.post('http://localhost:3001/api/prospectos/Upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		axios
			.post('http://localhost:3001/api/prospectos/Insert', {
				nombre: nombre,
				apellido: apellido,
				segundo: segundo,
				calle: calle,
				numero: numero,
				colonia: colonia,
				codigopostal: codigopostal,
				telefono: telefono,
				rfc: rfc,
				documento: selectedFile.name
			})
			.then(() => {
				alert('Gracias por ingresar tus datos, se validaran lo mas pronto posible');
				history.push('/');
			});
	};

	const updateUser = () => {
		axios
			.post('http://localhost:3001/api/prospectos/Update', {
				estatus: estatus,
				motivo: motivo,
				id: params.id
			})
			.then(() => {
				console.log('actualizado');
				history.push('/prospectos');
			});
	};

	const DownloadDocument = (e) => {
		console.log(e);
		const nombreDocumento = e;
		axios({
			url: 'http://localhost:3001/api/prospectos/Download?nombre=' + nombreDocumento, //your url
			method: 'GET',
			responseType: 'blob' // important
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([ response.data ]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', nombreDocumento); //or any other extension
			document.body.appendChild(link);
			link.click();
		});
	};

	const cancelEval = () => {
		history.push('/prospectos');
	};

	const calcelUser = () => {
		const confirm = window.confirm('Al salir se perderan todos los datos. ¿Desea continuar?');
		if (confirm) history.push('/');
	};

	return (
		<div className="container">
			<div className="col-4 offset-md-4">
				{params.id !== undefined ? <h2>Revisa los datos</h2> : <h2>Ingresa tus datos</h2>}
				<div className="row ">
					<label>Nombre</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Nombre"
						value={nombre}
						onChange={(e) => {
							setNombre(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Apellido</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Apellido"
						value={apellido}
						onChange={(e) => {
							setApellido(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Segundo Apellido</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Segundo"
						value={segundo}
						onChange={(e) => {
							setSegundo(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Calle</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Calle"
						value={calle}
						onChange={(e) => {
							setCalle(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Numero</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Numero"
						value={numero}
						onChange={(e) => {
							setNumero(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Colonia</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Colonia"
						value={colonia}
						onChange={(e) => {
							setColonia(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Codigo Postal</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Codigopostal"
						value={codigopostal}
						onChange={(e) => {
							setCodigopostal(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Telefono</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Telefono"
						value={telefono}
						onChange={(e) => {
							setTelefono(e.target.value);
						}}
					/>
				</div>
				<div className="row">
					<label>Rfc</label>
					<input
						type="text"
						readOnly={readonlyTag}
						className="form-control"
						name="Rfc"
						value={rfc}
						onChange={(e) => {
							setRfc(e.target.value);
						}}
					/>
				</div>
				{params.id !== undefined ? (
					<div className="row">
						<label>Estatus</label>
						<select
							value={estatus}
							className="form-control"
							onChange={(e) => {
								setEstatus(e.target.value);
								setHidden(e.target.value !== '2' ? true : false);
							}}
						>
							<option value="0">Enviado</option>
							<option value="1">Autorizado</option>
							<option value="2">Rechazado</option>
						</select>
					</div>
				) : (
					''
				)}
				{params.id !== undefined ? (
					<div className="row" hidden={hiddenTag}>
						<label>Motivo Rechazo</label>
						<input
							type="text"
							className="form-control"
							name="motivo"
							value={motivo}
							onChange={(e) => {
								setMoptivo(e.target.value);
							}}
						/>
					</div>
				) : (
					''
				)}
				<br />
				<div className="row">
					{params.id !== undefined ? (
						<div>
							<label>Documento</label>
							<div className="clearfix" />
							<button className="btn " onClick={() => DownloadDocument(documento)}>
								{documento}
							</button>
						</div>
					) : (
						<div>
							<label>Documento</label>
							<input type="file" name="file" onChange={changeHandler} />
						</div>
					)}
				</div>
				<br />
				<div className="row">
					<div className="col">
						<button className="btn btn-primary" onClick={params.id !== undefined ? updateUser : InsertUser}>
							Guardar
						</button>
					</div>
					<div className="col fluid">
						<button className="btn btn-warning" onClick={params.id !== undefined ? cancelEval : calcelUser}>
							cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Prospecto;
