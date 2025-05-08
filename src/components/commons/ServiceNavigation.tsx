import { Center, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { type FC } from "react";
import { getAssetsPath } from "../../utils/getAssetPath";
import { NavigationHead } from "./NavigationHead";
import Link from "next/link";

interface ServiceNavigationProps {}

export const ServiceNavigation: FC<ServiceNavigationProps> = () => {
  const color = "brand";
  return (
    <Center w="100%" flexDirection="column">
      <Center w="100%" maxW="450px" flexDirection="column" mt="8">
        <NavigationHead color={color}>世論地図</NavigationHead>
        <SimpleGrid columns={1} spacing={[5, 12]} mt="6">
          <Link
            href="/polis"
            data-gtm-event-click="TOP__polis"
            data-gtm-param-service-name="TOP"
            data-gtm-param-service-action="click_to_polis"
          >
            <Center flexDirection="column">
              <Image
                src={getAssetsPath("/images/service-icons-line/polis.svg")}
                alt="世論地図(β版)"
                w="7"
                h="7"
              />
              <Text
                fontWeight="medium"
                fontSize="xs"
                color={color}
                mt="3"
                textAlign="center"
              >
                世論地図(β版)
              </Text>
            </Center>
          </Link>
        </SimpleGrid>
      </Center>
    </Center>
  );
};
