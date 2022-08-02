import React, {useContext, useRef} from "react";
import './ItemComponent.css'
import {ItemsToDoContext} from "../../context/ItemsToDoContext";
function ItemComponent(props){
    const inputForEdit = useRef();
    const itemsContext = useContext(ItemsToDoContext);
    function setIsEdited(status){
        itemsContext.toggleEdit(props.id, status);
        // console.log(itemsContext.items.indexOf(item => item.editing) === -1);
        // setIsEdited(itemsContext.items.indexOf(item => item.editing) === -1);
    };
    function removeItemToDoHandler(){
        itemsContext.removeItem(props.id);
    }
    function setItemsList(){
        switch (itemsContext.category){
            case 0:
                return itemsContext.items
            case 1:
                return itemsContext.items.filter(item => item.completed === false)
            case 2:
                return itemsContext.completedItems
            default:
                return
        }
    }
    function completeItemToDoHandler(event){
        const checked = event.target.checked;
        const itemToCompleteIndex = setItemsList().findIndex(item => item.id === props.id);
        if(checked){
            itemsContext.completeItem(itemToCompleteIndex);
        }
        if(!checked){
            itemsContext.uncompleteItem(itemToCompleteIndex);
        }
    }
    function editItem(event){
        if(event.key === 'Enter'){
            if(inputForEdit.current.value.trim().length > 0){
                console.log(props.id);
                itemsContext.editItem(inputForEdit.current.value,props.id);
                inputForEdit.current.value = '';
                setIsEdited(false);
            }
        }
    }
    let itemTodo = <div className={'container-item item-content'} onClick={() => setIsEdited(true)}>{props.value}</div>;
    const idCheckBox = Math.random() % 1000;
    let checkedItem = <div className={'round'}>
        <input type={'checkbox'} onChange={completeItemToDoHandler} checked={props.completed} id={JSON.stringify(idCheckBox)}/>
        <label htmlFor={JSON.stringify(idCheckBox)}></label>
        </div>
    if(props.completed){
        itemTodo = <div className={'container-item item-content item-content-completed'} onClick={() => setIsEdited(true)}>{props.value}</div>;
    }
    return(
        <div className={'container'}>
                {!props.isEditing && checkedItem}
                {props.isEditing && <input defaultValue={props.value} ref={inputForEdit} type={'text'} className={'edit-item'} onKeyUp={editItem}/>}
                {!props.isEditing && itemTodo}
                {!props.isEditing &&<p className={'container-item cancel-button'} onClick={removeItemToDoHandler}>X</p>}
        </div>

    )
}
export default ItemComponent;