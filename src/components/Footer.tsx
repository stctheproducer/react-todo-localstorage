import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      bg="purple.700"
      h="10vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="md">
        Developed by{" "}
        <Link href="https://github.com/fellipeutaka" isExternal>
          Fellipe Utaka <ExternalLinkIcon mx="2px" />
        </Link>
      </Heading>
    </Flex>
  );
}
