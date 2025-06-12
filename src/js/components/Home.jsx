import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


const Home = () => {

	const [tarea, setTarea] = useState(0);
	const [listadoTareas, setListado] = useState([]);
	const [user, setUser] = useState([])

	//METODO GET CON EL CUAL HACEMOS EL LLAMADO DE INFO DE LA API A NUESTRA WEB

	

	
		
	
	const getApiTodos = async () => {
		try {
			const responsive = await fetch("https://playground.4geeks.com/todo/users/adrian_beneroso");
			const data = await responsive.json();
			setListado(data.todos);
		}
		catch (error) {
			console.log(error)
		}
	}
	// PARA CARGAR LOS DATOS DE LA API UNA VEZ RECARGUE
	useEffect(() => {
		getApiTodos();
	}, [])




	//METODO POST- AÑADIR 
	const addTask = async (event) => {
		try {
			let newTarea = {
				label: tarea,
				is_done: false

			}
			await fetch("https://playground.4geeks.com/todo/todos/adrian_beneroso", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTarea)

			});
			getApiTodos();
		}
		catch (error) {
			console.log(error);
		}
	}
	const deleteApiTodos = async (id) => {

		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
			});
			getApiTodos();
		}
		catch (error) {
			console.log(error)

		}

	}



	return (

		<div className="content">

			<header className="encabezado">
				<div className="izquierda">
					<h1>Monday</h1>
					<p>October 16</p>

				</div>
				<div className="derecha">
					<img className="user" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg==" alt="" />

				</div>


			</header>
			<main>
				<form onSubmit={(e) => addTask(e)}>
					<label htmlFor="tarea" className="label-tarea">Tarea</label>
					<input type="text"
						className="input-tarea"
						id="tarea"
						onChange={(e) => setTarea(e.target.value)}
						placeholder="Escribe una tarea para añadirla y presione Enter"
					/>
				</form>
				<div className="contain-tareas">
					{
						listadoTareas.map((listadoTareas, index) => {
							return (
								<div className="tarea" key={index}>
									<div className="id-tareas">nº{listadoTareas.id}</div>
									<div className="description-tarea">

										<p>{listadoTareas.label}</p>
									</div>
									<div className="icon-delete">
										{<i onClick={(e) => deleteApiTodos(listadoTareas.id)}>X</i>}
									</div>
								</div>
							)
						})
					}
					<div className="cantidad-tareas">
						<p>{listadoTareas.length} tarea por terminar</p>
					</div>
				</div>
			</main>

		</div>

	);
};
export default Home;


