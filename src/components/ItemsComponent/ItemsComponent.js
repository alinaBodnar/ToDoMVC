import React,{useContext} from "react";
import {ItemsToDoContext} from "../../context/ItemsToDoContext";
import ItemComponent from "../ItemComponent/ItemComponent";
function ItemsComponent(){
    const itemContext = useContext(ItemsToDoContext);
    function setItemsList(){
        switch (itemContext.category){
            case 0:
                return itemContext.items
            case 1:
                return itemContext.items.filter(item => item.completed === false)
            case 2:
                return itemContext.completedItems
            default:
                return
        }
    }
    const items = setItemsList().map((item) =>{
        return <ItemComponent value={item.value} key={item.id} id={item.id} completed={item.completed} isEditing={item.editing}></ItemComponent>
        });

    return(
        <div className={'todos-container'}>
            {items}
        </div>

    );
}
export default ItemsComponent;