import { useRef } from "react";
import usePersistedState from "./hooks/usePersistedState";

import { Task } from "./types/Task";

export default function App() {
  const [taskList, setTaskList] = usePersistedState<Task[]>("tasks", []);
  const inputRef = useRef<HTMLInputElement>(null);
  const addTask = () => {
    const inputValue = inputRef.current!.value;
    const list = [...taskList];
    const newTask = (name: string): Task => {
      return {
        name,
        isDone: false,
      };
    };
    list.push(newTask(inputValue));
    setTaskList(list);
  };
  const toggleTask = (index: number) => {
    const list = [...taskList];
    list[index].isDone = !list[index].isDone;
    setTaskList(list);
  };
  const deleteTask = (index: number) => {
    const list = [...taskList];
    list.splice(index, 1);
    setTaskList(list);
  };
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button type="submit" onClick={addTask}>
        Add task
      </button>
      <div id="TaskList">
        {taskList.map((task: Task, index: number) => (
          <div className="task">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => toggleTask(index)}
            />
            <span>{task.name}</span>
            <button onClick={() => deleteTask(index)}>Delete task</button>
          </div>
        ))}
      </div>
    </div>
  );
}
