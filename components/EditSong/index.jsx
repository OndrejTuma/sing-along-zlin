import React from 'react'
import Button from 'reactstrap/lib/Button'

import Form from '../Form'
import Input from '../Input'
import Wysiwyg from '../Wysiwyg'

import { updateSong } from '../../api/client'
import useGlobalMap from '../../hooks/useGlobalMap'

function EditSong({ song }) {
  const [, , deleteEditingSongs] = useGlobalMap('editingSongs')
  const [, addSong] = useGlobalMap('songs')
  const [, setNotification] = useGlobalMap('notifications')

  async function handleEditSong(refs) {
    const title = refs.get('title').current
    const text = refs.get('text').current

    try {
      const data = {
        title: title.value(),
        text: text.value(),
      }

      await updateSong(song._id, data)

      addSong(song._id, Object.assign({}, song, data))
      setNotification('Písnička je uložená', 'success')

      deleteEditingSongs(song._id)
    } catch (e) {
      setNotification(e.message, 'error')
    }
  }

  return (
    <div>
      <Form onSubmit={handleEditSong}>
        <Input name={'title'} value={song.title}/>
        <Wysiwyg label={'Text'} name={'text'} formattedValue={song.text}/>
        <div className={'text-center'}>
          <Button color={'primary'} size={'lg'}>Uložit</Button>
        </div>
      </Form>
    </div>
  )
}

export default EditSong