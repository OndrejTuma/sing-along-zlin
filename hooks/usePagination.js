import { useEffect, useState } from 'react'

const usePagination = (items, initialItemsPerPage = 10, initialPage = 0) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [activePage, setActivePage] = useState(initialPage)

  const pageCount = Math.ceil(items.length / itemsPerPage)
  const itemsSlice = items.slice(activePage * itemsPerPage, activePage * itemsPerPage + itemsPerPage)

  useEffect(() => {
    if (activePage >= pageCount) {
      setActivePage(pageCount - 1)
    }
  }, [activePage, pageCount])

  return [
    itemsSlice,
    {
      activePage,
      pageCount,
      setItemsPerPage,
      setActivePage,
    },
  ]
}

export default usePagination