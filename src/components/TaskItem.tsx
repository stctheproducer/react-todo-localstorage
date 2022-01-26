import { Task } from "../types/Task";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

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
  const [popover, setPopover] = useState(false);
  const closePopover = () => setPopover(false);

  const toggleTask = (index: number) => {
    const list = [...taskList];
    list[index].isDone = !list[index].isDone;
    setTaskList(list);
  };
  const deleteTask = (index: number) => {
    const list = [...taskList];
    list.splice(index, 1);
    setTaskList(list);
    closePopover();
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

      <Popover isOpen={popover} onClose={closePopover} closeOnBlur={false}>
        <PopoverTrigger>
          <button onClick={() => setPopover(true)}>
            <DeleteIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>Are you sure you want to delete this task?</PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={closePopover}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => deleteTask(index)}>
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
