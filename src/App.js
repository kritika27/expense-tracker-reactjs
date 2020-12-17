import React, { useState } from "react";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const arr = () => {
  let data = localStorage.getItem("expense");
  if (data) return JSON.parse(localStorage.getItem("expense"));
  else return [];
};

const App = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [income, setIncome] = useState(0);

  const [list, setList] = useState(arr);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      name: name,
      amount: amount,
    };
    if (name && amount) {
      setList([...list, newItem]);
      console.log(list);
      setName("");
      setAmount(0);
    }
  };

  React.useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(list));
  }, [list]);

  const reducer = (accumulator, item) => {
    return (accumulator = accumulator + parseInt(item.amount));
  };

  const total = list.reduce(reducer, 0).toFixed(2);

  const deleteItem = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  return (
    <div>
      <Header />
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">${total}</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Enter Your Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <br></br>
      <h4>Total Balance:${income - total}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Item</label>
          <input
            type="text"
            placeholder="Enter Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn">Add Expense</button>
      </form>
      <div className="list">
        {list.map((item, id) => {
          return (
            <div key={id}>
              <li className="plus">
                {item.name} <span>${Math.abs(item.amount)}</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="delete-btn"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
