import React, {useEffect, useState} from 'react';
import '../styles/todo-list.css';

const TodoList = () => {

    const [ todos, setTodos ] = React.useState( [] );
    const [ completed, setCompleted ] = React.useState( [] );
    const [ darkMode, setDarkMode ] = React.useState( false );
    const [ windowWidth, setWindowWidth ] = React.useState( window.innerWidth );
    const [userInfo, setUserInfo] = useState({});

    useEffect( () => {
        fetch( 'https://jsonplaceholder.typicode.com/users/1' )
            .then( ( data ) => {
                console.log('data', data);
                return data.json();
            } )
            .then( ( dataJson ) => {
                console.log( 'dataJson', dataJson );
                setUserInfo(dataJson);
            } );
    }, []);

    useEffect( () => {
        console.log( 'efecto', todos.length);
        if( todos.length > 0 ) {
            document.title = `${ todos.length } tareas pendientes`;
        } else {
            document.title = `No tienes tareas pendientes`;
        }
    }, [todos] );



    useEffect( () => {
        console.log( 'Ejecución del efecto' );

        return () => {
            console.log( 'returno del efecto ' );
        };
    } );


    const handleAddTask = () => {
        const task = document.querySelector( '#task' ).value;
        setTodos( prevState => [ ...prevState, task ] );
        document.querySelector( '#task' ).value = '';
    };

    const handleDeleteTask = ( index ) => {
        setTodos( ( prevState ) => {
            return prevState.filter( ( task, i ) => i !== index );
        } );
    };

    const handleCompleteTask = ( index ) => {
        setCompleted( ( prevState ) => [
            ...prevState,
            todos[ index ]
        ] );

        handleDeleteTask( index );
    };


    return (



        <div>

            <div>
                <h1>Informacion del Usuario</h1>
                <ul>
                    <li> <b>Nombre: </b> {userInfo.name}</li>
                    <li><b>Usuario: </b>{userInfo.username}</li>
                    <li><b>E-mail: </b>{userInfo.email}</li>
                    <li><b>Web: </b>{userInfo.website}</li>
                    <li><b>Teléfono: </b>{userInfo.phone}</li>
                </ul>
            </div>


            <div>
                <label htmlFor='task'>Tarea: </label>
                <input type='text' id='task' />

                <button onClick={ handleAddTask }>Agregar tarea</button>
            </div>
            <h1>Lista de tareas pendientes ({ todos.length } en total)</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Eliminar</th>
                    <th>Completar</th>
                </tr>
                </thead>
                <tbody>
                {
                    todos.map( ( task, index ) => (
                            <tr key={ index }>
                                <td>{ task }</td>
                                <td>
                                    <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                                </td>
                                <td>
                                    <button onClick={ () => handleCompleteTask( index ) }>Completada</button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>

            <h1>Lista de tareas completadas ({ completed.length } en total)</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
                </thead>
                <tbody>
                {
                    completed.map( ( task, index ) => (
                            <tr key={ index }>
                                <td>{ task }</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
