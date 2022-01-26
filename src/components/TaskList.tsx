import { useRef } from "react";
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import usePersistedState from "../hooks/usePersistedState";
import { Task } from "../types/Task";

export default function TaskList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [taskList, setTaskList] = usePersistedState<Task[]>("tasks", []);
  const addTask = () => {
    const inputValue = inputRef.current!.value;
    if (inputValue === "") {
      toast({
        title: "Error",
        description: "Please, type something!",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top-right",
      });
      inputRef.current!.focus();
    } else {
      const list = [...taskList];
      const newTask = (name: string): Task => {
        return {
          name,
          isDone: false,
        };
      };
      list.push(newTask(inputValue));
      toast({
        title: "Success",
        description: "Your task has been added.",
        status: "success",
        duration: 3500,
        isClosable: true,
        position: "top-right",
      });
      inputRef.current!.value = "";
      setTaskList(list);
    }
  };

  return (
    <>
      <Flex marginX="20" marginTop="5" h="5vh">
        <Input ref={inputRef} />
        <Button type="submit" onClick={addTask} colorScheme="purple">
          Add task
        </Button>
      </Flex>
      <Flex
        flexDir="column"
        alignItems="center"
        as="main"
        minH="51.9vh"
        paddingY="5"
      >
        {taskList.map((task: Task, index: number) => (
          <TaskItem
            key={index}
            index={index}
            task={task}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        ))}
      </Flex>
    </>
  );
}
