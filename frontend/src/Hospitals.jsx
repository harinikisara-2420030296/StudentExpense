import CategoryPage from './CategoryPage'

function Hospitals({ transactions, onAddTransaction }) {
  return <CategoryPage category="hospitals" title="Hospitals" transactions={transactions} onAddTransaction={onAddTransaction} />
}

export default Hospitals
