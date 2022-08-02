import React from "react";
import AddItemComponent from "./components/AddItemComponent/AddItemComponent";
import {ItemsToDoProvider} from "./context/ItemsToDoContext";
import ItemsComponent from "./components/ItemsComponent/ItemsComponent";
import './App.css';
import FooterComponent from "./components/FooterComponent/FooterComponent";
function App() {
  return(
          <ItemsToDoProvider>
              <h1>todos</h1>
              <div className={'toDo-container'}>
                  <AddItemComponent></AddItemComponent>
                  <ItemsComponent></ItemsComponent>
                  <FooterComponent></FooterComponent>
              </div>
          </ItemsToDoProvider>
 );
}

export default App;
