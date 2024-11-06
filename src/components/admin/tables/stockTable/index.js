export default function StockTable ({ stock }) {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table  text-d-dark-dark-purple table-zebra'>
          <thead>
            <tr className='bg-d-dark-dark-purple text-d-white'>
              <th />
              <th>Producto</th>
              <th>Categoría</th>
              <th>Layout Despnsa Dieciocho 715</th>
              <th>Stock Despnsa Dieciocho 715</th>
              <th>Solicitado Despnsa Dieciocho 715</th>
              <th>Layout Despnsa Calle Nueva 120</th>
              <th>Stock Despnsa Calle Nueva 120</th>
              <th>Solicitado Despnsa Calle Nueva 120</th>
              <th>Layout Despnsa HubCenco</th>
              <th>Stock Despnsa HubCenco</th>
              <th>Solicitado Despnsa HubCenco</th>
              <th>Total</th>

            </tr>
          </thead>
          <tbody>
            {stock.map((item) => {
              return (
                <tr key={item.producto}>
                  <td />
                  <td>{item.producto}</td>
                  <td>{item.categoría}</td>
                  <td>{item['layout Despnsa Dieciocho 715']}</td>
                  <td>{item['stock Despnsa Dieciocho 715']}</td>
                  <td>{item['solictado Despnsa Dieciocho 715']}</td>
                  <td>{item['layout Despnsa Calle Nueva 120']}</td>
                  <td>{item['stock Despnsa Calle Nueva 120']}</td>
                  <td>{item['solictado Despnsa Calle Nueva 120']}</td>
                  <td>{item['layout Despnsa HubCenco']}</td>
                  <td>{item['stock Despnsa HubCenco']}</td>
                  <td>{item['solictado Despnsa HubCenco']}</td>
                  <td>{item.total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
