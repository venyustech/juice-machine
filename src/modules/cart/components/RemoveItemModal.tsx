import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text
} from '@chakra-ui/react'
import { JuiceById } from '@/modules/cart/types'

interface RemoveItemModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  juice: JuiceById | null
}

export const RemoveItemModal: React.FC<RemoveItemModalProps> = ({ isOpen, onClose, onConfirm, juice }) => {
  if (!juice) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remover Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Tem certeza que deseja remover {juice.name} do seu carrinho?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirm}>
            Remover
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
