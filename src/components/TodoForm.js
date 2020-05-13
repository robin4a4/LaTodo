/*  component/TodoForm.js
    Robin Marillia

    classe qui affiche le formulaire d'upload d'une tache
*/

import React, { Component } from 'react';
import '../App.css';


class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isOptionsOpen: false,
            tagSelection: null,
            isImportant: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        // dès que l'on écrit une lettre on change l'état de value
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // on envoit le texte et les informations du tag au parent
        var task = {
            text: this.state.value,
            tag: this.state.tagSelection,
            isImportant: this.state.isImportant
        }

        // on repasse à l'état par défaut 
        this.setState({
            value: '',
            isOptionsOpen: false,
            tagSelection: null,
            isImportant: false
        })
        this.props.handleSubmit(task)

        // on empeche le rechargement de la page
        event.preventDefault();
    }

    handleOptions(){
        // on affiche ou enlève la fenêtre d'options 
        this.setState(prevState => ({
            isOptionsOpen: !prevState.isOptionsOpen
        }))
    }

    handleTagSelection(tag){

        // on regarde si on reclic sur un tag ou si on clic sur un nouveau
        var currentTag = this.state.tagSelection
        if(currentTag===tag){
             // on défocus le tag
            this.setState({
                tagSelection: null,
            })
        }
        else{
            // on focus le tag
            this.setState({
                tagSelection: tag,

            })
        }
        
    }

    handleMarkImportant(tag){
        // on toogle le isImportant
        this.setState(prevState => ({
            isImportant: !prevState.isImportant
        }))

    }

    render(){
        // classe pour le toogle de la fenetre options
        var isOptionsOpen = this.state.isOptionsOpen ? null : "hide"

        // tableau des tags disponibles 
        var tagsArray = ['art', 'courrant', 'travail', 'etudes']
        var tags = tagsArray.map((tag, index)=>{

            // on créé la classe qui permet d'entourer un tag lorsqu'il est séléctionné
            var isTagSelected = this.state.tagSelection === tag ? "tag-focus" : null
        
            return(
                <span 
                key={index}
                className={isTagSelected+ " tag "+tag}
                onClick={()=>this.handleTagSelection(tag)}
                >
                    {tag}
                </span>
        )})


        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-searchBar">

                    
                    <input
                    type="text"
                    placeholder="Ajouter une tache"
                    value={this.state.value} 
                    onChange={this.handleChange}
                    />
                    <div 
                    className="more-options-button"
                    onClick={()=>this.handleOptions()}
                    >
                    Options ▼
                    </div>
                    <button type="submit">+</button>

                </div>
                <div className={"form-options-container "+ isOptionsOpen }>
                    <div className="form-options">
                        <div className="form-options-tags">
                            <p>Choisir un tag</p>
                            <div>
                                {tags}
                            </div>
                        </div>
                        <div className="form-options-important">
                            <span 
                            className={this.state.isImportant ? 'important-focus' : null}
                            onClick={()=>this.handleMarkImportant()}>
                                Marquer comme important ⚑
                            </span>
                        </div>
                        
                    </div>
                </div>
            </form>
        )
    }
}

export default TodoForm;