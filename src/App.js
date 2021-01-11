import {React,useState} from "react";
import {BrowserRouter,Route,Link} from "react-router-dom";
import DailyPlanComponent from "./Components/DailyPlanComponent";
import ChoosingPlanComponent from "./Components/ChoosingPlanComponent";
import HeaderComponent from "./Components/HeaderComponent";


function App() {
  
  return (
    <>
      <HeaderComponent/>
      <BrowserRouter>
         <Route path="/" exact component={ChoosingPlanComponent}/>
         <Route path="/create/daily" component={DailyPlanComponent}/>
      </BrowserRouter>
    </>
  );
}

export default App;
