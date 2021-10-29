import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Prospectos from './pages/Prospectos';
import Prospecto from './pages/Prospecto';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
    <>


		<Router>
		<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/prospecto" exact component={Prospecto} />
				
				<div id="divNav">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container-fluid">
							<Link className="navbar-brand" to="/prospectos">Prospectos</Link>
							<button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link active" to="/prospectos">Prospectos</Link>
								</li>
								{/* <li className="nav-item">
									<Link className="nav-link active" to="/prospecto">Nuevo</Link>
								</li> */}
								
							</ul>
							
							</div>
							<div className="d-flex">
								<Link className="nav-link active" to="/">Cerrar Sesion</Link>
							</div>
						</div>
					</nav>
				
				
					<Route path="/prospecto/:id" exact component={Prospecto} />
			
				<Route path="/prospectos" exact component={Prospectos} />
				</div>
				
			</Switch>
		</Router>
    </>
	);
}

export default App;
