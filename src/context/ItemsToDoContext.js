import React, {useState} from "react";
const ItemsToDoContext = React.createContext({});

function ItemsToDoProvider(props){
    const [isCompleted,setIsCompleted] = useState(false);
    const [items,setItems] = useState([]);
    const [activeItems,setActiveItems] = useState([]);
    const [completedItems,setCompletedItems] = useState([]);
    const [category,setCategory] = useState(0);
    function toggleEdit(id, status){
        setItems(todoItems =>{
            return todoItems.map(item => {
                // if(item.id === id && status == true){
                //     item.editing = true;
                // }
                // else{
                //     item.editing = false;
                // }
                item.editing = item.id === id && status === true;
                return item;
            });
        })
    }
    function addItem(item){
        const newItems = items.concat({
            id: Math.random() % 100000,
            value: item,
            completed: false,
            editing:false
        });
        setItems(newItems);
        const newActiveItems = items.filter(item => item.completed === false);
        setActiveItems(newActiveItems);

    }
    function removeItem(id){
        let itemToRemoveIndex = items.findIndex(item => item.id === id);
        if(category === 1){
            itemToRemoveIndex = activeItems.findIndex(item => item.id === id);
        }
        if(category === 2){
            itemToRemoveIndex = completedItems.findIndex(item => item.id === id);
        }
        const itemToRemove = items[itemToRemoveIndex];
        const newItems = items.filter((item) => item.id !== id);
        const itemsLeftToComplete = completedItems.filter((item) => item.id !== id);
        if(itemToRemove.completed === false){
            setItems(newItems);
            setActiveItems(newItems);
        }
        if(itemToRemove.completed === true){
            setCompletedItems(itemsLeftToComplete);
            setItems(newItems);

        }
    }
    const itemsLeft = items.filter(item => item.completed === false);//not completed items - active
    let nrOfItemsToComplete = itemsLeft.length;

    function completeItem(id){
        nrOfItemsToComplete = nrOfItemsToComplete - 1;
        let itemActiveToCompleteIndex = items[id].id;
        if(category === 1){
            itemActiveToCompleteIndex = activeItems[id].id;
            const newActiveUpdatedItems = activeItems.map(item => {
                if(item.id === itemActiveToCompleteIndex){
                    return {
                        id: item.id,
                        value: item.value,
                        completed: true,
                        editing:false
                    };
                }
                else{
                    return {
                        id: item.id,
                        value: item.value,
                        completed: item.completed,
                        editing:false
                    };
                }

            })
            setActiveItems(newActiveUpdatedItems);
        }
        const newUpdatedItems = items.map(item => {
            if(item.id === itemActiveToCompleteIndex){
                return {
                    id: item.id,
                    value: item.value,
                    completed: true,
                    editing:false
                };
            }
            else{
                return {
                    id: item.id,
                    value: item.value,
                    completed: item.completed,
                    editing:false
                };
            }

        })
        setItems(newUpdatedItems);

        const newActiveItems = newUpdatedItems.filter(item => item.completed === false);
        setActiveItems(newActiveItems);

    }

    function showActiveItems(){
        const activeItems = items.filter(item => item.completed === false);
        setActiveItems(activeItems);
    }
    function showAllItems(){
        setItems(items);
    }
    function showCompletedItems(){
        const itemsCompleted = items.filter(item => item.completed === true);
        setCompletedItems(itemsCompleted);
    }
    function clearCompletedItems(){
        const itemsLeftToComplete = items.filter(item => item.completed === false);
        setItems(itemsLeftToComplete);
        setCompletedItems([]);
    }
    function editItem(value,id){
        if(category === 0){
            let itemToEditIndex = items.findIndex(item => item.id === id);
            let itemToEdit = items.filter(item => item.id === id)[0];
            const newItem = {...itemToEdit,value:value};
            const updatedItems = [...items];
            updatedItems[itemToEditIndex] = newItem;
            setItems(updatedItems);
        }
        else if(category === 1){
            let itemToEditIndex = activeItems.findIndex(item => item.id === id);
            let itemToEdit = activeItems.filter(item => item.id === id)[0];

            const itemAllIndex = items.findIndex(item => item.id === id);

            const newItem = {...itemToEdit,value:value};
            const updatedItems = [...activeItems];
            updatedItems[itemToEditIndex] = newItem;
            setActiveItems(updatedItems);

            const updatedAllItems = [...items];
            updatedAllItems[itemAllIndex] = newItem;
            setItems(updatedAllItems);
        }
        else if(category === 2){
            let itemToEditIndex = completedItems.findIndex(item => item.id === id);
            let itemToEdit = completedItems.filter(item => item.id === id)[0];

            const itemAllIndex = items.findIndex(item => item.id === id);

            const newItem = {...itemToEdit,value:value};
            const updatedItems = [...completedItems];
            updatedItems[itemToEditIndex] = newItem;
            setCompletedItems(updatedItems);

            const updatedAllItems = [...items];
            updatedAllItems[itemAllIndex] = newItem;
            setItems(updatedAllItems);
        }
    }
    function completeAllItems(){
        setIsCompleted(true);
        const completeItems = items.map(item =>
                ({...item,completed:true})
        );
        setItems(completeItems);
        setActiveItems([]);
        setCompletedItems(completeItems);
    }
    function uncompleteAllItems(){
        if(category === 0){
            const completedItems = items.map(item =>
                ({...item,completed: false})
            );
            setItems(completedItems);
        }
        else if(category === 1){
            const completedActiveItems = activeItems.map(item =>
                ({...item,completed: false})
            );
            setActiveItems(completedActiveItems);
            const completedAllItems = items.map(item =>
                ({...item,completed: false})
            );
            setItems(completedAllItems);

        }
        else if(category === 2){
            setCompletedItems([]);

            const completedAllItems = items.map(item =>
                ({...item,completed: false})
            );
            setItems(completedAllItems);
        }
        setIsCompleted(false);
    }
    function uncompleteItem(id){
        nrOfItemsToComplete = nrOfItemsToComplete + 1;
        let itemCompletedToCompleteIndex = items[id].id;
        if(category === 2){
            itemCompletedToCompleteIndex = completedItems[id].id;
            const newCompletedUpdatedItems = completedItems.map(item => {
                if(item.id === itemCompletedToCompleteIndex){
                    return {
                        id: item.id,
                        value: item.value,
                        completed: false,
                        editing:false
                    };
                }
                else{
                    return {
                        id: item.id,
                        value: item.value,
                        completed: item.completed,
                        editing:false
                    };
                }

            })
            setCompletedItems(newCompletedUpdatedItems);
        }
        const newUpdatedItems = items.map(item => {
            if(item.id === itemCompletedToCompleteIndex){
                return {
                    id: item.id,
                    value: item.value,
                    completed: false,
                    editing:false
                };
            }
            else{
                return {
                    id: item.id,
                    value: item.value,
                    completed: item.completed,
                    editing:false
                };
            }

        })
        setItems(newUpdatedItems);

        const newCompletedItems = newUpdatedItems.filter(item => item.completed === true);
        setCompletedItems(newCompletedItems);
    }

    const itemsToDoContext = {
        category,
        setCategory,
        items,
        activeItems,
        completedItems,
        numberOfItemsToComplete:nrOfItemsToComplete,
        addItem,
        removeItem,
        completeItem,
        showActiveItems,
        showAllItems,
        showCompletedItems,
        clearCompletedItems,
        editItem,
        completeAllItems,
        uncompleteAllItems,
        toggleEdit,
        completeAll:isCompleted,
        uncompleteItem
    }
    return <ItemsToDoContext.Provider value={itemsToDoContext}>
        {props.children}
            </ItemsToDoContext.Provider>
}
export {ItemsToDoContext,ItemsToDoProvider};