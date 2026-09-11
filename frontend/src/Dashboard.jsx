import { formatMoney } from './expenseData'

function Dashboard({ transactions, balance, onNavigate, onAddTransaction }) {
  const spent = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Math.abs(item.amount), 0)
  const received = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const categories = ['transport', 'shopping', 'hospitals']

  return (
    <>
      <PageHeading title="Good morning, Alex" subtitle="Here is your money at a glance." onAdd={onAddTransaction} />
      <section className="balance-grid">
        <div className="balance-card"><div className="card-topline"><span>Available balance</span><span className="balance-status">● On track</span></div><strong className="balance-value">{formatMoney(balance)}</strong><div className="balance-footer"><span>Updated just now</span><span className="balance-change">↑ 8.4% this month</span></div></div>
        <StatCard icon="↘" tone="spent" label="Spent this month" value={formatMoney(spent)} note="Across all categories" />
        <StatCard icon="↗" tone="received" label="Money received" value={formatMoney(received)} note="Since your account opened" />
      </section>
      <section className="dashboard-grid">
        <div className="panel category-panel"><div className="panel-heading"><div><h2>Where your money goes</h2><p>September 2026</p></div></div><div className="category-list">{categories.map((category) => { const total = transactions.filter((item) => item.category === category).reduce((sum, item) => sum + Math.abs(item.amount), 0); return <button className="category-row" key={category} onClick={() => onNavigate(category)}><span className={`category-image ${category}`} /><span className="category-name"><strong>{category[0].toUpperCase() + category.slice(1)}</strong><small>{transactions.filter((item) => item.category === category).length} transactions</small></span><span className="category-total">{formatMoney(total)}</span><span className="row-arrow">→</span></button> })}</div></div>
        <div className="panel spending-panel"><div className="panel-heading"><div><h2>Spending trend</h2><p>Last 7 days</p></div><span className="trend-value">{formatMoney(153.30)} <small>spent</small></span></div><div className="chart"><div className="chart-bars">{[34, 52, 43, 70, 46, 88, 62].map((height, index) => <i className={index === 6 ? 'today' : ''} style={{ height: `${height}%` }} key={height} />)}</div><div className="chart-labels"><span>04 Sep</span><span>05 Sep</span><span>06 Sep</span><span>07 Sep</span><span>08 Sep</span><span>09 Sep</span><span>Today</span></div></div></div>
      </section>
    </>
  )
}

function PageHeading({ title, subtitle, onAdd }) { return <div className="page-heading"><div><p className="eyebrow">Monday, September 10, 2026</p><h1>{title}</h1><p className="subheading">{subtitle}</p></div><button className="primary-button" onClick={onAdd}><span>+</span> Add transaction</button></div> }
function StatCard({ icon, tone, label, value, note }) { return <div className="stat-card"><span className={`stat-icon ${tone}`}>{icon}</span><span className="stat-label">{label}</span><strong>{value}</strong><small>{note}</small></div> }

export default Dashboard
