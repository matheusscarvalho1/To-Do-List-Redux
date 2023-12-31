import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";

function App() {
  const [inputTask, setInputTask] = useState("");
  const inputTaskRef = useRef(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputTask(inputTaskRef.current.value);
  };

  const handleSubmit = (e) => {
    if (!inputTaskRef.current.value.trim()) {
      alert("Por favor, insira uma tarefa");
      return;
    }

    const taskId = uuidv4();
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: taskId,
        text: inputTaskRef.current.value,
      },
    });
    setInputTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleRemove = (taskId) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: taskId,
    });
  };

  const handleToggleComplete = (task) => {
    const updatedCompletedTasks = completedTasks.includes(task)
      ? completedTasks.filter((completedTask) => completedTask !== task)
      : [...completedTasks, task];

    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className={styles.todoList}>
      <header className={styles.customHeader}>Lista de Tarefas</header>
      <section className={styles.wrapperList}>
        <ul className={styles.list}>
          {tasks &&
            tasks.map((task) => (
              <li
                key={task.id}
                className={`${styles.listItem} ${
                  completedTasks.includes(task.text) ? styles.done : ""
                }`}
                data-task={task.text}
              >
                <div
                  className={`${styles.check} ${styles.listCheck}`}
                  onClick={() => handleToggleComplete(task.text)}
                ></div>
                <label className={styles.task}>{task.text}</label>
                <button
                  className={`${styles.remove} ${styles.listRemove}`}
                  onClick={() => handleRemove(task.id)}
                ></button>
              </li>
            ))}
        </ul>
      </section>
      <footer>
        <input
          type="text"
          placeholder="Digite uma tarefa e aperte 'Enter'."
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          ref={inputTaskRef}
          value={inputTask}
          className={styles.footerInput}
        />
      </footer>
    </div>
  );
}

export default App;
