import CategoryPage from './CategoryPage'

function Transport({ transactions, onAddTransaction }) {
  return <CategoryPage category="transport" title="Transport" transactions={transactions} onAddTransaction={onAddTransaction} />
}

export default Transport
