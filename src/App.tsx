import { Button, Input } from "@chakra-ui/react";
import { useRef } from "react";
import Header from "./components/Header";
import usePersistedState from "./hooks/usePersistedState";

import { Task } from "./types/Task";

export default function App() {
  const [taskList, setTaskList] = usePersistedState<Task[]>("tasks", []);
  const inputRef = useRef<HTMLInputElement>(null);
  const addTask = () => {
    const inputValue = inputRef.current!.value;
    if (inputValue === "") {
      alert("Please, type something!");
    } else {
      const list = [...taskList];
      const newTask = (name: string): Task => {
        return {
          name,
          isDone: false,
        };
      };
      list.push(newTask(inputValue));
      setTaskList(list);
    }
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
    <>
      <Header />
      <Input ref={inputRef} />
      <Button type="submit" onClick={addTask} colorScheme="purple">
        Add task
      </Button>
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
    </>
  );
}
