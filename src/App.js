import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Transaction from './components/Transaction';
import Form from './components/Form';
import DataContext from './data/DataContext';
import Report from './components/Report';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


function App() {
  const design = {color:"rgb(66, 66, 66)", textAlign:"center",fontSize:"1.5rem"}
  const [items, setItems] = useState([]);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItem = (newItem)=> {
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
  }
  useEffect(()=>{
    const amounts = items.map(items=> items.amount)
    const income = amounts.filter(element=> element > 0).reduce((total, element)=>total += element,0)
    const expense = amounts.filter(element => element < 0).reduce((total, element)=>total+=element ,0)*-1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
    console.log("รายได้ = ", income)
    console.log("รายจ่าย = ", expense)
  },[items, reportIncome, reportExpense])
  
  return (
    <DataContext.Provider value={
      {
        income: reportIncome,
        expense: reportExpense
      }
    }>
      <div className="main-container">
        <h1 style={design}>โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
          <ul className="horizontal-menu">
            <li>
              <Link to="/" className="report-nav">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Switch>
             <Router path="/" exact>
               <Report/>
             </Router>
             <Route path="/insert">
               <Form onAddItem = {onAddNewItem}/>
               <Transaction items={items}/>
             </Route>
          </Switch>
          </div>
        </Router>
      </div> 
    </DataContext.Provider>
  )
}

export default App;
