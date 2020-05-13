/*  component/TodoList.js
    Robin Marillia

    classe qui affiche la liste des taches
*/

import React, { Component } from 'react';
import '../App.css';

// import du composant item
import TodoItem from './TodoItem'

class TodoList extends Component {

    render(){
        var importantTasks = []
        var normalTasks = []

        // on sépare les taches importantes des courrantes
        this.props.todos.forEach(task => {
            var item = (
                <TodoItem 
                key={task.id} 
                item={task}
                handleDone={(id)=>this.props.handleDone(id)}
                handleRemove={(id)=>this.props.handleRemove(id)}
                />  
            )
            if(task.important){
                importantTasks.push(item)
            }
            else{
                normalTasks.push(item)  
            }
        });

        // on créé le container important
        var importantContainer = importantTasks.length !== 0 ? (
                <div>
                    <h1>Taches importantes</h1>
                    <ul>
                        {importantTasks}
                    </ul>
                </div>
        ) : null

        // on créé le container taches courrantes
        var normalContainer = normalTasks.length !== 0 ? (
            <div>
                <h1>Vos taches</h1>
                <ul>
                    {normalTasks}
                </ul>
            </div>
        ) : (
            <h1>Pas de taches courrantes pour l'instant !</h1>
        )

        return(
            <div>
                {importantContainer}

                {normalContainer}
            </div>
        )
    }
}

export default TodoList;