import { Button, Link, VStack, Text } from "@chakra-ui/react";

const items = [
  {
    copy: "世論地図の仕組みや魅力について解説",
    title: "NPO法人 Mielka｜note",
    url: "https://note.com/mielka/n/n54313c84a5e5?sub_rt=share_pb",
  },
];

export const LinksToOtherService = () => {
  return (
    <VStack spacing={4} mb={6}>
      {items.map((item) => (
        <div key={item.title}>
          <Text
            fontSize="sm"
            textAlign="center"
            color={"#8E959E"}
            fontWeight={"bold"}
          >
            {item.copy}
          </Text>
          <Link href={item.url}>
            <Button background="#3BE385" w="350px" h="56px" borderRadius="27px">
              <Text fontWeight="bold" fontSize="lg" color="white">
                {item.title}
              </Text>
            </Button>
          </Link>
        </div>
      ))}
    </VStack>
  );
};
