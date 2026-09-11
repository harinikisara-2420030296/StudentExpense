import CategoryPage from './CategoryPage'

function Shopping({ transactions, onAddTransaction }) {
  return <CategoryPage category="shopping" title="Shopping" transactions={transactions} onAddTransaction={onAddTransaction} />
}

export default Shopping
