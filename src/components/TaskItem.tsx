import { Task } from "../types/Task";
import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, Flex, Text } from "@chakra-ui/react";

interface TaskProps {
  task: Task;
  index: number;
  taskList: Task[];
  setTaskList: Function;
}

export default function TaskItem({
  task,
  index,
  taskList,
  setTaskList,
}: TaskProps) {
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
    <Flex
      bg="purple.600"
      w="400px"
      minH="40px"
      paddingX="5"
      alignItems="center"
      borderRadius="15"
      marginY="5"
    >
      <Checkbox
        aria-label={`Check ${task.name}`}
        isChecked={task.isDone}
        onChange={() => toggleTask(index)}
      />
      <Text
        textDecor={task.isDone ? "line-through" : "none"}
        opacity={task.isDone ? "0.5" : "1"}
        marginRight="auto"
        marginLeft="5"
        paddingRight="2.5"
        wordBreak="break-all"
      >
        {task.name}
      </Text>
      <button onClick={() => deleteTask(index)}>
        <DeleteIcon />
      </button>
    </Flex>
  );
}
