import { Flex, Heading } from "@chakra-ui/react";

export default function Header() {
  const today = new Date();
  return (
    <Flex
      as="header"
      w="100%"
      h="40vh"
      bg="purple.700"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1">Today</Heading>
      <Heading as="h2">{today.toDateString()}</Heading>
    </Flex>
  );
}
