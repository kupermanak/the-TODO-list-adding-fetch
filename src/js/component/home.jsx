import React, { useEffect } from "react";

function Home() {
	const [pendientes, setPendientes] = React.useState([]);
	const [tarea, setTarea] = React.useState("");

	function getTarea() {
		const Url =
			"https://assets.breatheco.de/apis/fake/todos/user/Arielkuperman";
		fetch(Url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((response) => {
				console.log(response);
				setPendientes(response);
			})
			.catch((err) => console.log(err));
	}

	const agregarTarea = (e) => {
		e.preventDefault();
		if (!tarea.trim()) {
			console.log("campo vacio");
			return;
		}

		setPendientes([...pendientes, { label: tarea, done: false }]);

		setTarea("");
	};

	function actualizarTarea(nuevoPendiente) {
		const Url =
			"https://assets.breatheco.de/apis/fake/todos/user/Arielkuperman";
		fetch(Url, {
			method: "PUT",
			body: JSON.stringify(nuevoPendiente),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log("error", error));
	}

	function eliminarTarea(id) {
		const arrayFilter = pendientes.filter((item, indice) => indice !== id);
		console.log(arrayFilter);
		setPendientes(arrayFilter);
	}

	function tareaRealizada(indice, isDone) {
		let copiaPendientes = pendientes;
		copiaPendientes[indice].done = !isDone;

		actualizarTarea(copiaPendientes);
		setPendientes([...copiaPendientes]);
	}

	const cantLista = () => {
		let cantidad = 0;
		cantidad = pendientes.length;
		return cantidad;
	};

	let styleBox = {
		width: "500px",
		height: "auto",
		margin: "auto",
	};

	useEffect(() => {
		if (pendientes.lenght > 0) {
			actualizarTarea(pendientes);
		}
	}, []);

	useEffect(() => {
		getTarea();
	}, []);

	return (
		<div className="row flex-fill vh-100">
			<div className="col-3 bg-dark"></div>
			<div className="col-6 bg-light">
				<h1 className="text-center mt-3 fw-italic todosSize">Todos</h1>
				<div className="bg-light shadow p-3 mb-5" style={styleBox}>
					<form
						action=""
						className="d-flex flex-row align-items-center"
						onSubmit={agregarTarea}>
						<input
							type="text"
							className="form-control mb-2 border-0 w-75 mx-auto"
							placeholder="What needs to be done?"
							onChange={(e) => setTarea(e.target.value)}
							value={tarea}></input>
					</form>
					<ul className="list-group list-group-flush w-75 mx-auto">
						{pendientes.map((item, indice) => (
							<li
								className="list-group-item d-flex justify-content-between"
								key={indice}>
								<span
									className="lead"
									style={
										item.done
											? { textDecoration: "line-through" }
											: {}
									}>
									{item.label}
								</span>
								<button
									className="btn btn-success float-right"
									onClick={() =>
										tareaRealizada(indice, item.done)
									}>
									done
								</button>
								<button
									className="btn btn-sm btn-close float-right"
									aria-label="Close"
									onClick={() =>
										eliminarTarea(indice)
									}></button>
							</li>
						))}
					</ul>
					<div>
						<hr className="mb-1"></hr>
						<p className="mt-0">{cantLista()} item left</p>
					</div>
				</div>
			</div>
			<div className="col-3 bg-dark"></div>
		</div>
	);
}

export default Home;
