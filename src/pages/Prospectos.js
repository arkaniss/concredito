import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Prospectos() {
	const [ prospectosList, setProspectosList ] = useState([]);
	let history = useHistory();
	useEffect(() => {
		axios.get('http://localhost:3001/api/prospectos').then((response) => {
			setProspectosList(response.data);
		});
	}, []);

	const DownloadDocument = (e) => {
		console.log(e);
		const nombreDocumento = e.documentos;
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

	const VerProspecto = (e) => {
		history.push('/prospecto/' + e);
	};

	return (
		<div className="container">
			<table className="table ">
				<thead>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Apellidos</th>
						<th>Estatus</th>
						<th>Documento</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{prospectosList.map((val) => {
						return (
							<tr key={val.id}>
								<th>{val.id}</th>
								<td>{val.nombre}</td>
								<td>{val.apellido + ' ' + val.segundoApellido}</td>
								<td>{val.estatus}</td>
								<td>
									<button className="btn " onClick={() => DownloadDocument(val)}>
										{val.documentos}
									</button>
								</td>
								<td>
									<button className="btn btn-primary" onClick={() => VerProspecto(val.id)}>
										Revisar
									</button>
								</td>
							</tr>
						);
					}, this)}
				</tbody>
			</table>
		</div>
	);
}

export default Prospectos;
