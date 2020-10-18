import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import Card from 'reactstrap/lib/Card'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardBody from 'reactstrap/lib/CardBody'
import Button from 'reactstrap/lib/Button'

import EditRepertoire from '../EditRepertoire'
import FormNewRepertoar from '../FormNewRepertoar'
import ListRepertoires from '../ListRepertoires'
import Loading from '../Loading'

import useGlobalMap from '../../hooks/useGlobalMap'
import { fetchRepertoires } from '../../api/client'
import { ADD_REPERTOIRE } from '../../consts/visibility'

function AdminRepertoire() {
  const [fetching, setFetching] = useState(false)
  const [currentRepertoireId, setEditingRepertoireId] = useGlobal('editingRepertoireId')
  const [visibility, addVisibility, removeVisibility] = useGlobalMap('visibility')
  const [repertoires, addRepertoire] = useGlobalMap('repertoires')
  const [, addNotification] = useGlobalMap('notifications')

  const addRepertoireVisible = visibility.has(ADD_REPERTOIRE)

  function handleAddRepertoireVisibility(visibility) {
    setEditingRepertoireId('')

    visibility
      ? addVisibility(ADD_REPERTOIRE, true)
      : removeVisibility(ADD_REPERTOIRE)
  }

  const addRepertoireToggle = () => addRepertoireVisible
    ? removeVisibility(ADD_REPERTOIRE)
    : addVisibility(ADD_REPERTOIRE, true)
  const currentRepertoireClose = () => setEditingRepertoireId('')

  useEffect(() => {
    setFetching(true)
    fetchRepertoires()
      .then(({ repertoires }) => {
        repertoires.forEach(repertoire => addRepertoire(repertoire._id, repertoire))
      })
      .catch(e => addNotification(e.message, 'error'))
      .finally(() => setFetching(false))
  }, [])

  return (
    <Card className={'mb-5'}>
      <CardHeader className={'d-flex justify-content-between'}>
        <h2 className={'h3'}>Správa repertoárů</h2>
        <Button
          color={'secondary'}
          outline
          onClick={() => handleAddRepertoireVisibility(true)}
        >Přidat repertoár</Button>
      </CardHeader>
      <FormNewRepertoar
        isOpen={addRepertoireVisible}
        toggle={addRepertoireToggle}
      />
      <EditRepertoire
        isOpen={!!currentRepertoireId}
        toggle={currentRepertoireClose}
      />
      <CardBody>
        {fetching ? <Loading/> : <ListRepertoires repertoires={repertoires}/>}
      </CardBody>
    </Card>
  )
}

export default AdminRepertoire