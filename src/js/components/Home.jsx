import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component


const Home = () => {

	const [tarea, setTarea] = useState(0);
	const [listadoTareas, setListado] = useState([]);


//METODO GET CON EL CUAL HACEMOS EL LLAMADO DE INFO DE LA API A NUESTRA WEB
	const getApiTodos = async () => {
		const responsive = await fetch();
		const data = responsive.json();
		setListado(data.name);
		setListado(data.todos);

	}

// PARA CARGAR LOS DATOS DE LA API UNA VEZ RECARGUE
	useEffect(() => {
		getApiTodos();
	}, [])

//PARA AÑADIR UNA TAREA A LA WEB
	const handlelAddTarea = (event) => {
		event.preventDefault();
		if (tarea.length === 0) {
			alert("debes rellenar el campo")
		}
		else {
			//creaos un nuevo objeto dado a su propiedad el valor de la tarea introducida en el input
			let newTarea = {
				name: tarea
			};
			// le indicamos el nuevo valor de pasandole el anterior listado mas el nuevo objeto generado
			setListado(prev => [...prev, newTarea]);
			alert("La tarea ha sido correctamente añadida")
		}
	

	}




	//PARA ELIMINAR LA TAREA
	const handleDeleteTarea = (name) => {

		// array				pre array	array + objeto+ propiedad no es = a la propiedad
		const newListado = listadoTareas.filter(listadoTareas => listadoTareas.name !== name)
		setListado(newListado);
		alert("La tarea ha sido eliminada")

	}


	//METODO POST- PREGUNTAR A HORACIO EL OBJETO SI REUTILIZO EL CREADO.
	const addTask = async () =>{
		let newTarea = {
			
  label: tarea
  


		}
		await fetch("https://playground.4geeks.com/todo/todos/adrian_beneroso",{
			method:"POST",
			body: JSON.stringify(newTarea),
			headers:{"Content-Type" : "application/json"}
		});
	

	}


	//HTML PREGUNTAR A HORACIO SI EL MAPEADO DEL ARRAY DE LA API HARIA QUE ACTUALIZASE LAS NUEVAS Q VAMOS EMTIENDO
	return (
		<div className="contain">
			<h1>LISTADO DE TAREAS</h1>

			<form onSubmit={(e) => handlelAddTarea(e)}>
				<label htmlFor="tarea" className="label-tarea">Tarea</label>
				<input type="text"
					className="input-tarea"
					id="tarea"
					onChange={(e) => setTarea(e.target.value)}
					placeholder="Escribe una tarea para añadirla Y presione Enter"
				/>
			</form>

			<div className="contain-tareas">
				{
					listadoTareas.map(listadoTareas => {
						return (
							<div className="tarea">
								<div className="description-tarea">
									<p>{listadoTareas.name}</p>
								</div>
								<div className="icon-delete">
									<i onClick={(e) => handleDeleteTarea(listadoTareas.name)}><CircleX /></i>
								</div>
							</div>
						)
					})
				}
				<div className="cantidad-tareas">
					<p>{listadoTareas.length} tarea por terminar</p>
				</div>
			</div>
		</div>
	);
};
export default Home;






//CLASE APIS

// const Home = () => {
// 	const [name,setName] = useState("")
// 	const [lista,setLista] = useState([])


// 	const getUser = async() =>{
// 		const response = await fetch("url");
// 		const data = await response.json();
// 		console.log(data);
// 		setLista(data.todos);
// 		setName(data.name)

// 	}
// 	useEffect(()=>{
// 		getUser();
// 	},[])

// const [lista, setLista] = useState([])//creamos un hook-array para guardar la informacion que queremos obtener




// useEffect(() => {
// 	getApiRickAndMorty();
// }, [])


// const getApiRickAndMorty = async () => {
// 	const response = await fetch("https://rickandmortyapi.com/api/character"); // la promesa
// 	const data = await response.json();//convierte la info en codigo legible en js
// 	console.log(data); //debemos conseguir qyue cuando llegue la info guardarla en response
// 		setLista(data.results);// //asi se daria el valor de la info en el array
// }

// //PARA CARGAR ESTA FUNCION INMEDIANTAMENTE DESPUESD DE CARGAR LA PAGINA

// console.log(lista);





