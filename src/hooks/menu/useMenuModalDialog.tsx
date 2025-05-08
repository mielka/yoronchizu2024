import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { ServiceNavigation } from "../../components/commons/ServiceNavigation";

export const useMenuModalDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dialog = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top="-50px">
        <ModalCloseButton color="white" size="lg" />
        <ModalBody bg="black">
          <Box mb={5}>
            <ServiceNavigation />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  return { onOpen, dialog };
};
