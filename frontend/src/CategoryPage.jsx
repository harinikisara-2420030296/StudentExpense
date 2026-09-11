import { formatMoney } from './expenseData'

function CategoryPage({ category, title, transactions, onAddTransaction }) {
  const expenses = transactions.filter((item) => item.type === 'expense')
  const total = expenses.reduce((sum, item) => sum + Math.abs(item.amount), 0)

  return <>
    <div className={`category-hero ${category}`}><div><span className="hero-kicker">September 2026</span><h2>{title} spending</h2><p>Every transaction in one clear view.</p></div><span className={`category-image large ${category}`} /></div>
    <div className="category-page-actions"><h1>{title}</h1><button className="primary-button" onClick={onAddTransaction}><span>+</span> Add transaction</button></div>
    <div className="category-stats"><div><small>This month</small><strong>{formatMoney(total)}</strong></div><div><small>Daily average</small><strong>{formatMoney(total / 10)}</strong></div><div><small>Transactions</small><strong>{transactions.length}</strong></div></div>
    <div className="panel transactions-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Your latest {title.toLowerCase()} transactions</p></div><button className="filter-button">This month⌄</button></div>{transactions.length ? <div className="transaction-list">{transactions.map((transaction) => <div className="transaction" key={transaction.id}><span className={`transaction-icon ${category}`}>{category === 'hospitals' ? '+' : category === 'transport' ? '↗' : '◇'}</span><span className="transaction-info"><strong>{transaction.title}</strong><small>{transaction.note}</small></span><strong className={transaction.amount > 0 ? 'income' : ''}>{transaction.amount > 0 ? '+' : '-'}{formatMoney(transaction.amount)}</strong></div>)}</div> : <p className="empty-state">No transactions in this category yet.</p>}</div>
  </>
}

export default CategoryPage
