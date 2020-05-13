import React, { Component } from 'react';

import './App.css';

import getTodos from './API/getTodos'

// import des composants
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: null,
        
        }
    }

    componentDidMount(){
        // on récupère les resultats du fetch une fois que le composant a été monté 
        getTodos((result)=>{
            
            // on modifie le state todos en lui donnant les données de l'api
            this.setState({
                todos: result
            })
        })
    }

    handleSubmit(task){

        // récupération des infos
        var text = task.text
        var tag = task.tag 
        var isImportant = task.isImportant 

        // on récupère le max id de la liste pour éviter des problèmes lors de la suppression puis de l'ajout d'un item. 
        var maxid = 0;
        this.state.todos.forEach(obj => {
            if (obj.id > maxid) maxid = obj.id;
        });
     
            
        // on créé un nouvel object item
        var item = {
            id: maxid+1,
            done: false,
            text: text,
            tag: tag,
            important: isImportant
        }

        // on met à jour le tableau des todo
        this.setState(prevState => ({
            todos: [...prevState.todos, item]
        }))

    }

    handleDone(id){
        
        // on créé d'abord une copie du state car un state est censé etre immuable        
        var todos = this.state.todos
        
        // on cherche la tache dont l'id est l'argument id
        todos.find(item => item.id === id).done = !todos.find(item => item.id === id).done

        // on met à jour le tableau des todo
        this.setState({
            todos: todos
        });
    }

    handleRemove(id){
        
        // on créé d'abord une copie du state car un state est censé etre immuable
        var todos = this.state.todos
        var index = todos.findIndex(item => item.id === id)
        
        // on supprime l'item dont l'id est égal à l'argument id 
        todos.splice(index, 1);

        // on met à jour le tableau des todo
        this.setState({
            todos: todos
        });
    }

    render() {
            
        const { todos } = this.state;

        // si les données ne sont pas encore récupérées on affiche un indicateur de chargement et sinon on affiche les données
        var list = this.state.todos ? (
            <TodoList 
            todos={todos} 
            handleDone={(id)=>this.handleDone(id)}
            handleRemove={(id)=>this.handleRemove(id)}
            />
        ) : (
            <div className="loading">
                Chargement des taches
            </div>
        )
        return (
        <div className="App">
            <div className="wrapper">
                <img className="logo" src="./logo.png" alt="logo todo"/>
                <h1>Entrer une tache</h1>
                <TodoForm handleSubmit={(value)=>this.handleSubmit(value)}/>
                {list}
            </div>
        </div>
        );
    }
}

export default App;
