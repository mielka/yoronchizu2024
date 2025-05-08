import { Box, Center, Heading, Image } from "@chakra-ui/react";
import { FC } from "react";

interface ServiceHeadProps {
  title: string | JSX.Element;
  imageSrc?: string;
  description: JSX.Element;
}

export const ServiceHead: FC<ServiceHeadProps> = ({
  title,
  imageSrc,
  description,
}) => {
  return (
    <Box w="100%">
      <Center flexDirection="column">
        <Heading as="h1" fontSize="28px">
          {title}
        </Heading>
        {imageSrc && (
          <Box mt="7">
            <Image
              w="97px"
              h="97px"
              src={imageSrc}
              alt={typeof title === "string" ? title : ""}
            />
          </Box>
        )}
        <Box mt={10} textAlign="center">
          {description}
        </Box>
      </Center>
    </Box>
  );
};
