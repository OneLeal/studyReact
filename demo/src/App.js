import "./App.css";
import { useState } from "react";
import { TodoEnter } from "./components/todoEnter";
import { TodoList } from "./components/todoList";

function App() {
  const [list, setListItem] = useState([]);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value || "";
    setValue(value);
  };

  const addItem = () => {
    setListItem(list.concat([{ text: value, flag: false }]));
    setValue("");
  };

  const doneItem = (item, index) => {
    if (!item.flag) {
      const arr = list.map((el, i) => {
        const temp = {};
        Object.assign(temp, el);
        i === index && (temp.flag = true);
        return temp;
      });
      setListItem(arr);
    }
  };

  const delItem = (item, index) => {
    const result = list.filter((el, i) => i !== index);
    setListItem(result);
  };

  return (
    <div className="layout-wrap">
      <p className="title">TODOLIST</p>

      <div className="layout-top">
        <TodoEnter value={value} onChange={onChange} addItem={addItem} />
      </div>

      <div className="layout-list-wrap">
        {list.length ? (
          <TodoList list={list} doneItem={doneItem} delItem={delItem} />
        ) : (
          <div className="empty-list">
            <em>无数据</em>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
