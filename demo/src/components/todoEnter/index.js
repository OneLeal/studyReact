import "../../styles/index.css";
import './index.css'

export const TodoEnter = (props) => {
  return (
    <div className="todo-enter">
      <input
        type="text"
        placeholder="请输入"
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />

      <button className="primary" onClick={props.addItem}>
        添 加
      </button>
    </div>
  );
};
