import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { useMenuModalDialog } from "../../hooks/menu/useMenuModalDialog";

export const NavMenuButton: FC = () => {
  const { onOpen, dialog } = useMenuModalDialog();
  return (
    <>
      <IconButton
        size="sm"
        aria-label="menu"
        icon={<HamburgerIcon boxSize="5" />}
        backgroundColor="transparent"
        onClick={onOpen}
      />
      {dialog}
    </>
  );
};
