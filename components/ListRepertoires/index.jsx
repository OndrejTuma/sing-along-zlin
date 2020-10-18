import React from 'react'
import ListGroup from 'reactstrap/lib/ListGroup'
import ListGroupItem from 'reactstrap/lib/ListGroupItem'

import Repertoire from '../Repertoire'
import Pagination from '../Pagination'

import usePagination from '../../hooks/usePagination'
import { sortByDate } from '../../helpers/sorting'

function ListRepertoires({ repertoires }) {
  const [repertoiresSlice, { activePage, pageCount, setActivePage }] = usePagination(sortByDate('date')([...repertoires.values()], -1))

  return (
    <div>
      {repertoires.size > 0 ? (
        <ListGroup>
          {repertoiresSlice.map(repertoire => (
            <ListGroupItem key={repertoire._id}>
              <Repertoire repertoire={repertoire}/>
            </ListGroupItem>
          ))}
          <Pagination
            activePage={activePage}
            className={'mt-4'}
            pageCount={pageCount}
            setActivePage={setActivePage}
          />
        </ListGroup>
      ) : (
        <p className={'text-center'}><i>Zatím žádné repertoáry nejsou</i></p>
      )}
    </div>
  )
}

export default ListRepertoires