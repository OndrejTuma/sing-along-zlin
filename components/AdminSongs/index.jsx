import React, { useState } from 'react'
import CardHeader from 'reactstrap/lib/CardHeader'
import Button from 'reactstrap/lib/Button'
import CardBody from 'reactstrap/lib/CardBody'
import Card from 'reactstrap/lib/Card'

import FormNewSong from '../FormNewSong'
import ListSongs from '../ListSongs'

import useGlobalMap from '../../hooks/useGlobalMap'

function AdminSongs() {
  const [songs] = useGlobalMap('songs')
  const [showNewSong, setShowNewSong] = useState(false)

  function handleAddSongVisibility(visibility) {
    setShowNewSong(visibility)
  }

  return (
    <Card>
      <CardHeader className={'d-flex justify-content-between'}>
        <h2 className={'h3'}>Správa písniček</h2>
        <Button
          color={'secondary'}
          outline
          onClick={() => handleAddSongVisibility(true)}
        >Přidat písničku</Button>
      </CardHeader>
      <FormNewSong
        isOpen={showNewSong}
        toggle={() => handleAddSongVisibility(false)}
      />
      <CardBody>
        <ListSongs songs={[...songs.values()]}/>
      </CardBody>
    </Card>
  )
}

export default AdminSongs