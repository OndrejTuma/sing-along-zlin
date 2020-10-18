import cn from 'classnames'
import PaginationWrapper from 'reactstrap/lib/Pagination'
import PaginationItem from 'reactstrap/lib/PaginationItem'
import PaginationLink from 'reactstrap/lib/PaginationLink'

const Pagination = ({ activePage, className, navigateBy = 10, pageCount, setActivePage, showExtremes = 1, showPages = 11 }) => {
  const allPages = [...Array(pageCount).keys()]
  let pages

  if (pageCount <= showPages + showExtremes) {
    pages = allPages
  } else if (activePage + 1 < showPages + showExtremes) {
    pages = [
      ...allPages.slice(0, showExtremes + showPages),
      '...',
      ...allPages.slice(pageCount - showExtremes),
    ]
  } else if (activePage + showPages + showExtremes > pageCount) {
    pages = [
      ...allPages.slice(0, showExtremes),
      '...',
      ...allPages.slice(Math.min(pageCount - showExtremes - showPages, activePage + Math.ceil(showPages / 2))),
    ]
  } else {
    pages = [
      ...allPages.slice(0, showExtremes),
      '...',
      ...allPages.slice(activePage - Math.floor(showPages / 2), activePage + Math.ceil(showPages / 2)),
      '...',
      ...allPages.slice(pageCount - showExtremes),
    ]
  }

  const handleFastBackward = () => {
    const to = activePage - navigateBy < 0 ? 0 : activePage - navigateBy

    setActivePage(to)
  }
  const handleFastForward = () => {
    const to = activePage + navigateBy > pageCount - 1 ? pageCount - 1 : activePage + navigateBy

    setActivePage(to)
  }

  return (
    <PaginationWrapper size={'sm'} className={cn('d-flex justify-content-center', className)}>
      <PaginationItem disabled={activePage === 0}>
        <PaginationLink
          first
          onClick={handleFastBackward}
          aria-label={'První strana'}
          className={'arrow'}
        />
      </PaginationItem>
      {pages.map((num, index) => {
        if (typeof num !== 'number') {
          return (
            <PaginationItem key={index} disabled>
              <PaginationLink>{num}</PaginationLink>
            </PaginationItem>
          )
        }

        return (
          <PaginationItem active={activePage === num} key={index}>
            <PaginationLink onClick={() => setActivePage(num)}>
              {num + 1}
            </PaginationLink>
          </PaginationItem>
        )
      })}
      <PaginationItem disabled={activePage === pageCount - 1}>
        <PaginationLink
          last
          onClick={handleFastForward}
          aria-label={'Poslední strana'}
          className={'arrow'}
        />
      </PaginationItem>
    </PaginationWrapper>
  )
}

export default Pagination