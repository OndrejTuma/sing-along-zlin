import React  from 'react'
import { useGlobal } from 'reactn'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import Button from 'reactstrap/lib/Button'
import Modal from 'reactstrap/lib/Modal'
import UncontrolledCollapse from 'reactstrap/lib/UncontrolledCollapse'

import ListSections from '../ListSections'
import FormNewSection from '../FormNewSection'

import { updateSection } from 'Api/client'
import useGlobalMap from 'Hooks/useGlobalMap'

function EditRepertoire({ isOpen, toggle }) {
  const [currentRepertoireId] = useGlobal('editingRepertoireId')
  const [repertoires] = useGlobalMap('repertoires')
  const [sections, , , , setSections] = useGlobalMap('sections')
  const repertoireName = repertoires.has(currentRepertoireId) ? repertoires.get(currentRepertoireId).title : ''

  const currentSections = [...sections.values()].filter(section => section.belongsTo === currentRepertoireId).sort(function (a, b) {
    if (a.position < b.position) {
      return -1
    }
    if (a.position > b.position) {
      return 1
    }
    return 0
  })

  function handleOnDrop(fromId, toId) {
    const from = { position: 0, index: -1 }
    const to = { ...from }

    currentSections.forEach(({ _id: id, position }, index) => {
      id === fromId && Object.assign(from, { position, index })
      id === toId && Object.assign(to, { position, index })
    })

    if (from.index === to.index) {
      return
    }

    const startIndex = from.index < to.index ? from.index : to.index
    const endIndex = from.index < to.index ? to.index : from.index

    const newSections = []
    let isInRange = false

    for (let i = 0; i < currentSections.length; i++) {
      isInRange = i >= startIndex && i <= endIndex

      if (isInRange) {
        if (to.index < from.index && i === from.index) {
          newSections.push({ ...currentSections[i], position: to.position })
          updateSection(currentSections[i]._id, { position: to.position })
        } else if (to.index > from.index && i === from.index) {
          newSections.push({ ...currentSections[i], position: to.position })
          updateSection(currentSections[i]._id, { position: to.position })
        } else {
          const swapSection = to.index < from.index ? currentSections[i + 1] : currentSections[i - 1]

          newSections.push({ ...currentSections[i], position: swapSection.position })
          updateSection(currentSections[i]._id, { position: swapSection.position })
        }
      } else {
        newSections.push(currentSections[i])
      }
    }

    setSections(new Map(newSections.map(section => [section._id, section])))
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Upravujete repertoár: <strong>{repertoireName}</strong>
      </ModalHeader>
      <ModalBody>
        <div className={'text-right'}>
          <Button color={'secondary'} outline id={'new_section'}>Přidat sekci</Button>
        </div>
        <UncontrolledCollapse toggler={'#new_section'}>
          <FormNewSection/>
        </UncontrolledCollapse>
        <ListSections
          sections={currentSections}
          onDrop={handleOnDrop}
        />
      </ModalBody>
    </Modal>
  )
}

export default EditRepertoire