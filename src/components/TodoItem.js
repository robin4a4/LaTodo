/*  component/TodoItem.js
    Robin Marillia

    classe qui affiche une tache
*/

import React, { Component } from 'react';
import '../App.css';

class TodoItem extends Component {


    render(){

        var item = this.props.item
        
        // on créé l'affichage des tags et des marques "important" 
        var tag = item.tag ? (
            <div className={"tag " + item.tag}>
                {item.tag}
            </div>
        ) : null
        var important = item.important ? (
            <div className="important">
                ⚑
            </div>
        ) : null

        return(
            <li key={item.id} className={item.done ? 'item-done' : 'item-undone'} >
                
                
                <div className="item-left">
                    <span 
                    className={item.done ? 'radio-done' : 'radio-undone'} 
                    onClick={()=>this.props.handleDone(item.id)}>
                        &#9675;
                    </span>
                    {item.text}
                </div>
                <div className="item-right">
                    {important}
                    {tag}
                    <span 
                    className="remove"
                    onClick={()=>this.props.handleRemove(item.id)}>
                        ✕
                    </span>
                </div>
            </li>
        )
    }
}

export default TodoItem;