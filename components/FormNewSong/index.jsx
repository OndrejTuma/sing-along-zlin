import React, { useState } from 'react'
import Button from 'reactstrap/lib/Button'

import Form from '../Form'
import Input from '../Input'
import Wysiwyg from '../Wysiwyg'

import { createSong } from '../../api/client'
import { AppError, ERR_FORM, ERR_FORM_MSG } from '../../api/errors'
import useGlobalMap from '../../hooks/useGlobalMap'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import Modal from 'reactstrap/lib/Modal'

function FormNewSong({ isOpen, toggle }) {
  const [fetching, setFetching] = useState(false)
  const [, addNotification] = useGlobalMap('notifications')
  const [, addSong] = useGlobalMap('songs')

  async function handleOnSubmit(refs) {
    const title = refs.get('title').current
    const text = refs.get('text').current

    try {
      if (text.isEmpty() || title.isEmpty()) {
        throw new AppError(ERR_FORM, ERR_FORM_MSG)
      }
      setFetching(true)

      const { song } = await createSong(title.value(), text.value())

      addSong(song._id, song)
      title.reset()
      text.reset()
      addNotification('Písnička je uložená', 'success')
      toggle()
    } catch (e) {
      addNotification(e.message, 'error')
    } finally {
      setFetching(false)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Přidat písničku</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleOnSubmit}>
          <Input label={'Název'} name={'title'}/>
          <Wysiwyg label={'Text'} name={'text'}/>
          <div className={'text-center'}>
            <Button color={'primary'} size={'lg'} disabled={fetching}>Uložit</Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default FormNewSong