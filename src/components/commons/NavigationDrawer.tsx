import {
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import { MenuNavigation } from "./MenuNavigation";

export const NavigationDrawer: FC = () => {
  const isSmallerThanMD = useBreakpointValue({ base: true, md: false });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollPosition = useRef(0);
  useEffect(() => {
    if (isSmallerThanMD) {
      onOpen();
      const listener = () => {
        if (scrollPosition.current < window.scrollY) {
          onClose();
        } else {
          onOpen();
        }
        scrollPosition.current = window.scrollY;
      };
      document.addEventListener("scroll", listener);
      return () => {
        document.removeEventListener("scroll", listener);
      };
    } else {
      onClose();
      return;
    }
  }, [isSmallerThanMD, onOpen, onClose]);
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      closeOnEsc={false}
      placement="bottom"
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      lockFocusAcrossFrames={false}
      variant="activeMainContent"
      trapFocus={false}
    >
      <DrawerContent>
        <DrawerBody
          backgroundColor="contentBackground"
          boxShadow="0 1px 6px rgba(0,0,0,0.2)"
          px="0"
        >
          <Container maxW="container.sm" px="xs">
            <MenuNavigation />
          </Container>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
