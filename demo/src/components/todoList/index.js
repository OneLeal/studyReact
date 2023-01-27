import "../../styles/index.css";
import "./index.css";

export const TodoList = (props) => {
  return (
    <ul className="todo-list">
      {props.list.map((item, index) => (
        <li className="todo-list-item" key={item.text}>
          <span className={item.flag ? "disabled" : ""}>
            {`${index + 1}. ${item.text}`}
          </span>

          <div>
            <button
              className={item.flag ? "disabled info" : "info"}
              style={{ width: 60 }}
              onClick={() => props.doneItem(item, index)}
            >
              完 成
            </button>

            <button
              className="danger ml-10"
              style={{ width: 60 }}
              onClick={() => props.delItem(item, index)}
            >
              删 除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
