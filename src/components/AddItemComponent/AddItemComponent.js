import React, {useContext, useRef} from "react";
import {ItemsToDoContext} from "../../context/ItemsToDoContext";
import './AddItemComponent.css';
import {Icon} from "semantic-ui-react";
function AddItemComponent(){
    const inputRef = useRef();
    const itemsContext = useContext(ItemsToDoContext);
    function addItemHandler(event){
        if(event.key === 'Enter'){
            if(inputRef.current.value.trim().length > 0){
                itemsContext.addItem(inputRef.current.value);
                inputRef.current.value = '';
            }
        }
    }
    function completeAllItemsHandler(){
        itemsContext.completeAllItems();
    }
    function uncompleteAllItemsHandler(){
        itemsContext.uncompleteAllItems();
    }
    return (
        <div className={'add-item-container'}>
            <Icon link name='angle down' className={'icon-style'} onClick={itemsContext.completeAll ? uncompleteAllItemsHandler : completeAllItemsHandler}/>
            <input ref={inputRef} type={"text"} className={"input-style"} placeholder={"What needs to be done?"} onKeyPress={addItemHandler}/>
        </div>

    );
}
export default AddItemComponent;