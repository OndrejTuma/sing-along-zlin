import React from 'react'

import usePagination from '../../hooks/usePagination'
import Song from '../Song'

import styles from './styles.scss'
import Pagination from '../Pagination'

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
    <>
      <h3>Uložené písničky</h3>
      <ul className={styles.wrapper}>
        {songsSlice.length > 0 ? songsSlice.map(song => (
          <li key={song._id}>
            <Song song={song}/>
          </li>
        )) : (
          <li><i>zatím žádné nejsou</i></li>
        )}
      </ul>
      <Pagination
        activePage={activePage}
        pageCount={pageCount}
        setActivePage={setActivePage}
      />
    </>
  )
}

export default ListSongs