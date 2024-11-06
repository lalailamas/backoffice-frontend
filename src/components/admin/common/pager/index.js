export default function Pager (props) {
  const { meta, setPage } = props
  // console.log(meta, 'meta')
  // console.log(meta.pagination.limit, 'limit')
  // console.log(meta.pagination.pages, 'total de paginas')
  // console.log(meta.pagination.total, 'total categorias')

  return (
    <>
      {meta && meta.pagination && (
        <div className='join'>
          <button
            className='join-item btn'
            disabled={meta.pagination.pages === 1 || meta.pagination.page === 1}
            onClick={() => setPage(meta.pagination.page - 1)}
          >
            «
          </button>
          <button className='join-item btn cursor-default'>
            Página {meta.pagination.page} de {meta.pagination.pages}
          </button>
          <button
            className='join-item btn'
            disabled={meta.pagination.pages === 1 || meta.pagination.page === meta.pagination.pages}
            onClick={() => setPage(meta.pagination.page + 1)}
          >
            »
          </button>
        </div>
      )}
    </>
  )
}
