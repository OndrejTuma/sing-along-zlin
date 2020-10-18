import React from 'react'
import ListGroup from 'reactstrap/lib/ListGroup'
import ListGroupItem from 'reactstrap/lib/ListGroupItem'

import usePagination from '../../hooks/usePagination'
import Song from '../Song'

import Pagination from '../Pagination'
import Repertoire from '../Repertoire'

/**
 * @param [object[]] songs
 * @return {*}
 * @constructor
 */
function ListSongs({ songs }) {
  const sortedSongs = songs.slice().sort(function (a, b) {
    if (a.title.trim() < b.title.trim()) {
      return -1
    }
    if (a.title.trim() > b.title.trim()) {
      return 1
    }
    return 0
  })

  const [songsSlice, { activePage, pageCount, setActivePage }] = usePagination(sortedSongs)
  return (
    <div>
      {songs.length > 0 ? (
        <ListGroup>
          {songsSlice.map(song => (
            <ListGroupItem key={song._id}>
              <Song song={song}/>
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
        <p className={'text-center'}><i>Zatím žádné písničky nejsou</i></p>
      )}
    </div>
  )
}

export default ListSongs