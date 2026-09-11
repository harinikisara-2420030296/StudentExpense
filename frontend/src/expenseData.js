export const startingTransactions = [
  { id: 1, category: 'transport', title: 'Metro card top-up', note: 'Today, 8:42 AM', amount: -18.5, type: 'expense' },
  { id: 2, category: 'shopping', title: 'Campus bookstore', note: 'Yesterday, 4:10 PM', amount: -42.25, type: 'expense' },
  { id: 3, category: 'hospitals', title: 'Pharmacy', note: 'Sep 06, 11:25 AM', amount: -24.75, type: 'expense' },
  { id: 4, category: 'transfer', title: 'Money from Alex', note: 'Sep 05, 6:32 PM', amount: 120, type: 'income' },
  { id: 5, category: 'shopping', title: 'Grocery run', note: 'Sep 03, 1:15 PM', amount: -67.8, type: 'expense' },
]

export const formatMoney = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
}).format(Math.abs(value))
