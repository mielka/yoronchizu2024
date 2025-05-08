import { Center, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { getAssetsPath } from "../../utils/getAssetPath";
import Link from "next/link";
import { useMenuModalDialog } from "../../hooks/menu/useMenuModalDialog";

export const MenuNavigation = () => {
  const { dialog } = useMenuModalDialog();
  return (
    <SimpleGrid as="nav" columns={1}>
      <Link href="/polis">
        <Center flexDirection="column">
          <Image
            src={getAssetsPath("/images/service-icons-line/polis.svg")}
            alt=""
            w="7"
            h="7"
          />
          <Text fontSize="9.5px" mt="4px">
            世論地図(β版)
          </Text>
        </Center>
      </Link>
      {dialog}
    </SimpleGrid>
  );
};
