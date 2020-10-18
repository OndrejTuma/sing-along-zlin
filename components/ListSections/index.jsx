import { DndProvider } from 'react-dnd-cjs'
import HTML5Backend from 'react-dnd-html5-backend-cjs'
import ListGroup from 'reactstrap/lib/ListGroup'
import ListGroupItem from 'reactstrap/lib/ListGroupItem'

import Section from '../Section'

import useGlobalMap from '../../hooks/useGlobalMap'

function ListSections({ sections, onDrop }) {
  const [songs] = useGlobalMap('songs')

  return (
    <DndProvider backend={HTML5Backend}>
      {sections && sections.length > 0 ? (
        <>
          <p><small>*tip: Můžete měnit pořadí sekcí tažením myši</small></p>
          <ListGroup>
            {sections.map(section => (
              <ListGroupItem key={section._id}>
                <Section
                  section={section}
                  songs={section.songs.map(id => songs.get(id))}
                  onDrop={onDrop}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      ) : (
        <p className={'text-center'}><i>Žádné sekce zatím nejsou</i></p>
      )}
    </DndProvider>
  )
}

export default ListSections