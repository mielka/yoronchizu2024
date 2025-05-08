import { FC } from "react";
import { cache_index } from "./data";
import { Link, VStack, Text } from "@chakra-ui/react";

const topics = [
  "keizai",
  "seijisikin",
  "kenpou",
  "syakaihosyou",
  "zeisei",
  "energy",
  "digital",
].map((key) => {
  const title = cache_index[key]!.title!;
  return { key, title };
});

export const TopicSelect: FC = () => {
  return (
    <VStack spacing={4} mb={6}>
      {topics.map((topic) => (
        <Link
          key={topic.key}
          href={`/polis/${topic.key}`}
          w="280px"
          p="2"
          textAlign="center"
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: "gray.50" }}
        >
          <Text>{topic.title}</Text>
        </Link>
      ))}
    </VStack>
  );
};
