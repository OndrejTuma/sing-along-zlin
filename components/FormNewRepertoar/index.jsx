import React from 'react'
import { useGlobal } from 'reactn'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalFooter from 'reactstrap/lib/ModalFooter'
import Modal from 'reactstrap/lib/Modal'
import Button from 'reactstrap/lib/Button'

import Form from '../Form'
import Input from '../Input'

import { createRepertoir } from '../../api/client'
import { ADD_REPERTOIRE } from '../../consts/visibility'
import useGlobalMap from '../../hooks/useGlobalMap'

function FormNewRepertoar({ isOpen, toggle }) {
  const [, setEditingRepertoireId] = useGlobal('editingRepertoireId')
  const [, addNotification] = useGlobalMap('notifications')
  const [, addRepertoire] = useGlobalMap('repertoires')
  const [, , removeVisibility] = useGlobalMap('visibility')

  async function handleOnSubmit(refs) {
    const title = refs.get('title').current

    try {
      const { repertoire } = await createRepertoir(title.value())

      addRepertoire(repertoire._id, repertoire)
      setEditingRepertoireId(repertoire._id)
      removeVisibility(ADD_REPERTOIRE)
      toggle()
    } catch (e) {
      addNotification(e.message, 'error')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Přidat repertoár</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleOnSubmit}>
          <Input name={'title'} label={'Název repertoáru'}/>
          <div className={'text-right'}>
            <Button color={'primary'}>Vytvořit</Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default FormNewRepertoar