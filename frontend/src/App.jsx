import { useMemo, useState } from 'react'
import Dashboard from './Dashboard'
import Hospitals from './Hospitals'
import Shopping from './Shopping'
import Transport from './Transport'
import { startingTransactions } from './expenseData'
import './App.css'

const pages = {
  dashboard: { label: 'Overview', icon: '⌂' },
  transport: { label: 'Transport', icon: '↗' },
  shopping: { label: 'Shopping', icon: '◇' },
  hospitals: { label: 'Hospitals', icon: '+' },
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [transactions, setTransactions] = useState(startingTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ title: '', amount: '', category: 'transport', type: 'expense' })
  const balance = useMemo(() => 1248.4 + transactions.reduce((sum, item) => sum + item.amount, 0), [transactions])

  const addTransaction = (event) => {
    event.preventDefault()
    const amount = Number(form.amount)
    if (!form.title.trim() || !amount || amount < 0) return
    setTransactions((current) => [{ id: Date.now(), category: form.type === 'income' ? 'transfer' : form.category, title: form.title.trim(), note: 'Just now', amount: form.type === 'income' ? amount : -amount, type: form.type }, ...current])
    setForm({ title: '', amount: '', category: 'transport', type: 'expense' })
    setIsModalOpen(false)
  }

  const page = activePage === 'dashboard' ? <Dashboard transactions={transactions} balance={balance} onNavigate={setActivePage} onAddTransaction={() => setIsModalOpen(true)} />
    : activePage === 'transport' ? <Transport transactions={transactions.filter((item) => item.category === 'transport')} onAddTransaction={() => setIsModalOpen(true)} />
      : activePage === 'shopping' ? <Shopping transactions={transactions.filter((item) => item.category === 'shopping')} onAddTransaction={() => setIsModalOpen(true)} />
        : <Hospitals transactions={transactions.filter((item) => item.category === 'hospitals')} onAddTransaction={() => setIsModalOpen(true)} />

  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">+</span><span>nest<span className="brand-dot">.</span></span></div><p className="nav-label">Your money</p><nav>{Object.entries(pages).map(([key, item]) => <button key={key} className={`nav-item ${activePage === key ? 'active' : ''}`} onClick={() => setActivePage(key)}><span className="nav-icon">{item.icon}</span>{item.label}</button>)}</nav><div className="sidebar-bottom"><div className="avatar">AS</div><div><strong>Alex Smith</strong><small>Student account</small></div><span className="more">•••</span></div></aside>
    <main className="main-content"><header className="topbar"><div className="mobile-brand">nest<span className="brand-dot">.</span></div><div className="topbar-actions"><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot" /></button><button className="profile-button"><span className="avatar small">AS</span><span>Alex Smith</span><span>⌄</span></button></div></header><div className="content-wrap">{page}</div></main>
    {isModalOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setIsModalOpen(false)}><form className="modal" onSubmit={addTransaction}><button type="button" className="modal-close" onClick={() => setIsModalOpen(false)}>×</button><p className="eyebrow">New activity</p><h2>Add a transaction</h2><div className="type-toggle"><button type="button" className={form.type === 'expense' ? 'selected' : ''} onClick={() => setForm({ ...form, type: 'expense' })}>I spent</button><button type="button" className={form.type === 'income' ? 'selected income-tab' : ''} onClick={() => setForm({ ...form, type: 'income' })}>I received</button></div><label>Description<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Lunch with friends" required /></label><label>Amount<input type="number" min="0.01" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" required /></label>{form.type === 'expense' && <label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option value="transport">Transport</option><option value="shopping">Shopping</option><option value="hospitals">Hospitals</option></select></label>}<button className="primary-button full" type="submit">Save transaction</button></form></div>}
  </div>
}

export default App
