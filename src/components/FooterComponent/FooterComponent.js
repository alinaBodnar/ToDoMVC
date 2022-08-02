import React, {useContext} from "react";
import './FooterComponent.css'
import {ItemsToDoContext} from "../../context/ItemsToDoContext";
function FooterComponent(){
    const itemsContext = useContext(ItemsToDoContext);

    function showAllItemsHandler(){
        itemsContext.setCategory(0);
        itemsContext.showAllItems();
    }
    function showActiveItemsHandler(){
        itemsContext.setCategory(1);
        itemsContext.showActiveItems();
    }

    function showCompletedItemsHandler(){
        itemsContext.setCategory(2);
        itemsContext.showCompletedItems();
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

    let spanAll =  <span className={'default-button all-button'} onClick={showAllItemsHandler}>All</span>;
    let spanActive =  <span className={'active-button'} onClick={showActiveItemsHandler}>Active</span>;
    let spanCompleted = <span className={'complete-button'} onClick={showCompletedItemsHandler}>Completed</span>;

    if(itemsContext.category === 1){
        spanAll =  <span className={'all-button'} onClick={showAllItemsHandler}>All</span>;
        spanActive = <span className={'default-button active-button'} onClick={showActiveItemsHandler}>Active</span>;
        spanCompleted = <span className={'complete-button'} onClick={showCompletedItemsHandler}>Completed</span>;
    }
    else if(itemsContext.category === 2){
        spanAll =  <span className={'all-button'} onClick={showAllItemsHandler}>All</span>;
        spanActive = <span  className={'all-button'} onClick={showActiveItemsHandler}>Active</span>;
        spanCompleted = <span className={'default-button complete-button'} onClick={showCompletedItemsHandler}>Completed</span>;
    }
    const clearCompletedItemsHandler = () => {
        itemsContext.clearCompletedItems();
    }
    function renderContent(){
        const nrItemToComplete = setItemsList().length;
        const completedItems = itemsContext.items.filter(item => item.completed === true).length;
        const nrItemCompleted = itemsContext.numberOfItemsToComplete;
        if(nrItemToComplete === 0 && itemsContext.category === 0){
            return <></>;
        }
        else if(completedItems > 0){
            return(
                <>
                    {/*<div className={'footer'}>*/}
                    {/*   */}
                    {/*</div>*/}
                    <footer> <label>{nrItemCompleted} items left</label>
                        <div className={'buttons-container'}>
                            {spanAll}
                            {spanActive}
                            {spanCompleted}
                        </div>
                        <span className={'clear-completed-items'} onClick={clearCompletedItemsHandler}>Clear completed</span></footer>
                </>

            );
        }
        else if(nrItemCompleted > 0 || itemsContext.category > 0){
            return(
                <>
                    {/*<div className={'footer'}>*/}
                    {/*   */}
                    {/*</div>*/}
                    <footer>
                        <label>{nrItemCompleted} items left</label>
                        <div className={'buttons-container'}>
                            {spanAll}
                            {spanActive}
                            {spanCompleted}
                        </div>
                    </footer>
                </>

            );
        }
    }

    return renderContent();
}
export default FooterComponent;