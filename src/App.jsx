import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import koalaImg from './assets/pngegg.png'
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeDollarSign,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Download,
  Edit3,
  Eye,
  EyeOff,
  Filter,
  Flag,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Trash2,
  WalletCards,
  X,
} from 'lucide-react'
import './App.css'

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const compactCurrency = new Intl.NumberFormat('pt-BR', {
  notation: 'compact',
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 1,
})

const categoryPalette = {
  Alimentação: '#00c2a8',
  Transporte: '#6c8cff',
  Moradia: '#ffb020',
  Saúde: '#ff5c8a',
  Lazer: '#a855f7',
  Educação: '#38bdf8',
  Investimentos: '#20c997',
  Contas: '#f97316',
  Freelance: '#14b8a6',
  'Renda extra': '#f59e0b',
  Outros: '#94a3b8',
}

const defaultState = {
  salary: {
    current: 7200,
    recurring: true,
    nextPayment: '2026-06-01',
    history: [
      { id: 'sal-1', month: 'Jan', amount: 6900 },
      { id: 'sal-2', month: 'Fev', amount: 7000 },
      { id: 'sal-3', month: 'Mar', amount: 7000 },
      { id: 'sal-4', month: 'Abr', amount: 7100 },
      { id: 'sal-5', month: 'Mai', amount: 7200 },
      { id: 'sal-6', month: 'Jun', amount: 7200 },
    ],
  },
  incomes: [
    {
      id: 'inc-1',
      title: 'Consultoria de produto',
      amount: 1400,
      category: 'Freelance',
      date: '2026-05-09',
      note: 'Auditoria de design system',
    },
    {
      id: 'inc-2',
      title: 'Pagamento de dividendos',
      amount: 520,
      category: 'Investimentos',
      date: '2026-05-14',
      note: 'Distribuição trimestral',
    },
    {
      id: 'inc-3',
      title: 'Venda no marketplace',
      amount: 290,
      category: 'Renda extra',
      date: '2026-05-20',
      note: 'Pacote de ativos digitais',
    },
  ],
  expenses: [
    {
      id: 'exp-1',
      title: 'Aluguel do apartamento',
      amount: 2200,
      category: 'Moradia',
      dueDate: '2026-05-05',
      paid: true,
      recurring: true,
      installments: 1,
      note: 'Apartamento no centro',
    },
    {
      id: 'exp-2',
      title: 'Mercado e café',
      amount: 720,
      category: 'Alimentação',
      dueDate: '2026-05-12',
      paid: true,
      recurring: false,
      installments: 1,
      note: 'Inclui reposição da despensa',
    },
    {
      id: 'exp-3',
      title: 'Plano premium da academia',
      amount: 130,
      category: 'Saúde',
      dueDate: '2026-05-16',
      paid: false,
      recurring: true,
      installments: 1,
      note: 'Renova mensalmente',
    },
    {
      id: 'exp-4',
      title: 'Parcela do notebook',
      amount: 410,
      category: 'Educação',
      dueDate: '2026-05-21',
      paid: false,
      recurring: false,
      installments: 6,
      note: 'Parcela 3 de 6',
    },
    {
      id: 'exp-5',
      title: 'Metrô e aplicativo',
      amount: 260,
      category: 'Transporte',
      dueDate: '2026-05-23',
      paid: true,
      recurring: false,
      installments: 1,
      note: 'Deslocamentos',
    },
    {
      id: 'exp-6',
      title: 'Pacote de streamings',
      amount: 94,
      category: 'Lazer',
      dueDate: '2026-05-28',
      paid: false,
      recurring: true,
      installments: 1,
      note: 'Música, filmes e jogos em nuvem',
    },
  ],
  categories: [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Lazer',
    'Educação',
    'Investimentos',
    'Contas',
    'Freelance',
    'Renda extra',
    'Outros',
  ],
  budgets: {
    Alimentação: 900,
    Transporte: 420,
    Moradia: 2500,
    Saúde: 420,
    Lazer: 280,
    Educação: 620,
    Investimentos: 1500,
    Contas: 380,
    Freelance: 0,
    'Renda extra': 0,
    Outros: 450,
  },
  goals: [
    {
      id: 'goal-1',
      name: 'Reserva de emergência',
      target: 18000,
      saved: 12450,
      deadline: '2026-10-31',
      color: '#00c2a8',
    },
    {
      id: 'goal-2',
      name: 'Viagem para Tóquio',
      target: 8500,
      saved: 3260,
      deadline: '2027-03-12',
      color: '#6c8cff',
    },
    {
      id: 'goal-3',
      name: 'Carteira de longo prazo',
      target: 50000,
      saved: 19400,
      deadline: '2028-01-01',
      color: '#a855f7',
    },
  ],
  notifications: [
    'Plano da academia vence em 3 dias',
    'Gastos com alimentação chegaram a 80% do orçamento',
    'Reserva de emergência está acima da previsão',
  ],
  profile: {
    name: 'Bruno Koala',
    email: 'bruno@example.com',
    plan: 'Premium',
  },
}

const navItems = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
  { id: 'expenses', label: 'Despesas', icon: CreditCard },
  { id: 'income', label: 'Receitas', icon: ArrowUpRight },
  { id: 'salary', label: 'Salário', icon: BadgeDollarSign },
  { id: 'reports', label: 'Relatórios', icon: LineChart },
  { id: 'goals', label: 'Metas', icon: Target },
  { id: 'calendar', label: 'Calendário', icon: CalendarDays },
  { id: 'settings', label: 'Ajustes', icon: Settings },
]

const monthlyTrend = [
  { month: 'Jan', income: 7600, expenses: 4750, balance: 2850 },
  { month: 'Fev', income: 8200, expenses: 5210, balance: 2990 },
  { month: 'Mar', income: 7900, expenses: 4890, balance: 3010 },
  { month: 'Abr', income: 8450, expenses: 5340, balance: 3110 },
  { month: 'Mai', income: 9410, expenses: 3814, balance: 5596 },
  { month: 'Jun', income: 9020, expenses: 4480, balance: 4540 },
]

function loadState() {
  try {
    const stored = localStorage.getItem('koala-state')
    return stored ? { ...defaultState, ...JSON.parse(stored) } : defaultState
  } catch {
    return defaultState
  }
}

function withNotification(state, message) {
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

  return {
    ...state,
    notifications: [`${time} - ${message}`, ...(state.notifications || [])].slice(0, 12),
  }
}

function App() {
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('koala-authed') === 'true')
  const [data, setData] = useState(loadState)
  const [view, setView] = useState('dashboard')
  const [theme, setTheme] = useState(() => localStorage.getItem('koala-theme') || 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Todos')
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey)

  useEffect(() => {
    localStorage.setItem('koala-state', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('koala-theme', theme)
  }, [theme])

  const monthOptions = useMemo(() => getMonthOptions(data), [data])
  const filteredData = useMemo(() => getDataForMonth(data, selectedMonth), [data, selectedMonth])
  const analytics = useMemo(() => getAnalytics(filteredData), [filteredData])

  function authenticate(profile) {
    localStorage.setItem('koala-authed', 'true')
    setData((current) => ({
      ...current,
      profile: { ...current.profile, ...profile },
    }))
    setIsAuthed(true)
  }

  function logout() {
    localStorage.removeItem('koala-authed')
    setIsAuthed(false)
  }

  function upsertExpense(expense) {
    const isEdit = Boolean(expense.id)
    const installments = Math.max(1, Number(expense.installments || 1))
    setData((current) => {
      if (isEdit) {
        return {
          ...withNotification(current, `Despesa atualizada: ${expense.title}`),
          expenses: current.expenses.map((item) => (item.id === expense.id ? expense : item)),
        }
      }

      const newExpenses =
        installments > 1 ? createInstallmentExpenses(expense, installments) : [{ ...expense, id: crypto.randomUUID() }]

      return {
        ...withNotification(
          current,
          installments > 1
            ? `Despesa parcelada adicionada: ${expense.title} (${installments} parcelas)`
            : `Despesa adicionada: ${expense.title}`,
        ),
        expenses: [...newExpenses, ...current.expenses],
      }
    })
  }

  function upsertIncome(income) {
    const isEdit = Boolean(income.id)
    setData((current) => ({
      ...withNotification(current, `Receita ${isEdit ? 'atualizada' : 'adicionada'}: ${income.title}`),
      incomes: income.id
        ? current.incomes.map((item) => (item.id === income.id ? income : item))
        : [{ ...income, id: crypto.randomUUID() }, ...current.incomes],
    }))
  }

  function upsertGoal(goal) {
    const isEdit = Boolean(goal.id)
    setData((current) => ({
      ...withNotification(current, `Meta ${isEdit ? 'atualizada' : 'adicionada'}: ${goal.name}`),
      goals: goal.id
        ? current.goals.map((item) => (item.id === goal.id ? goal : item))
        : [{ ...goal, id: crypto.randomUUID() }, ...current.goals],
    }))
  }

  function remove(type, id) {
    const item = data[type].find((entry) => entry.id === id)
    setPendingDelete({ type, id, item })
  }

  function confirmRemove() {
    if (!pendingDelete) return
    setData((current) => {
      const { type, id } = pendingDelete
      const item = current[type].find((entry) => entry.id === id)
      const label = getDeleteLabel(type)
      const name = item?.title || item?.name || 'registro'
      return {
        ...withNotification(current, `${label} excluída: ${name}`),
        [type]: current[type].filter((entry) => entry.id !== id),
      }
    })
    setPendingDelete(null)
  }

  function markPaid(id) {
    setData((current) => {
      const target = current.expenses.find((expense) => expense.id === id)
      const nextPaid = !target?.paid
      return {
        ...withNotification(current, `${target?.title || 'Despesa'} marcada como ${nextPaid ? 'paga' : 'em aberto'}`),
        expenses: current.expenses.map((expense) =>
          expense.id === id ? { ...expense, paid: nextPaid } : expense,
        ),
      }
    })
  }

  function updateSalary(payload) {
    const month = new Date().toLocaleString('pt-BR', { month: 'short' })
    setData((current) => ({
      ...withNotification(current, `Salário do mês atualizado para ${currency.format(Number(payload.current))}`),
      salary: {
        ...current.salary,
        ...payload,
        history: [
          ...current.salary.history.slice(-5),
          { id: crypto.randomUUID(), month, amount: Number(payload.current) },
        ],
      },
    }))
  }

  function addCategory(name) {
    const clean = name.trim()
    if (!clean || data.categories.includes(clean)) return
    setData((current) => ({
      ...current,
      categories: [...current.categories, clean],
      budgets: { ...current.budgets, [clean]: 500 },
    }))
  }

  function removeCategory(name) {
    const inUse = [...data.expenses, ...data.incomes].some((item) => item.category === name)
    if (inUse) {
      setData((current) =>
        withNotification(current, `A categoria "${name}" não pode ser removida porque está em uso.`),
      )
      return
    }

    setData((current) => {
      const budgets = { ...current.budgets }
      delete budgets[name]
      return {
        ...withNotification(current, `Categoria removida: ${name}`),
        categories: current.categories.filter((category) => category !== name),
        budgets,
      }
    })
  }

  function exportCsv(type) {
    const rows = type === 'expenses' ? data.expenses : data.incomes
    const headers = Object.keys(rows[0] || {})
    const csv = [
      headers.join(','),
      ...rows.map((row) => headers.map((key) => JSON.stringify(row[key] ?? '')).join(',')),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${type === 'expenses' ? 'despesas' : 'receitas'}-relatorio.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  if (!isAuthed) {
    return <AuthScreen onAuth={authenticate} theme={theme} setTheme={setTheme} />
  }

  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        setView={setView}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        profile={data.profile}
        logout={logout}
      />

      <main className="main-area">
        <Topbar
          view={view}
          profile={data.profile}
          theme={theme}
          setTheme={setTheme}
          setSidebarOpen={setSidebarOpen}
          notifications={data.notifications}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          monthOptions={monthOptions}
          clearNotifications={() =>
            setData((current) => ({
              ...current,
              notifications: [],
            }))
          }
        />

        <AnimatePresence mode="wait">
          <motion.section
            key={view}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="content-view"
          >
            {view === 'dashboard' && (
              <Dashboard
                data={data}
                filteredData={filteredData}
                analytics={analytics}
                selectedMonth={selectedMonth}
                setModal={setModal}
                markPaid={markPaid}
                remove={remove}
                updateSalary={updateSalary}
                exportCsv={exportCsv}
              />
            )}
            {view === 'expenses' && (
              <Ledger
                title="Gestão de despesas"
                subtitle="Controle contas, assinaturas, parcelas, vencimentos e compromissos recorrentes."
                type="expenses"
                rows={filteredRows(filteredData.expenses, query, categoryFilter)}
                categories={data.categories}
                query={query}
                setQuery={setQuery}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                setModal={setModal}
                remove={remove}
                markPaid={markPaid}
                exportCsv={exportCsv}
              />
            )}
            {view === 'income' && (
              <Ledger
                title="Gestão de receitas"
                subtitle="Organize renda extra, retornos de investimentos, projetos paralelos e entradas recorrentes."
                type="incomes"
                rows={filteredRows(filteredData.incomes, query, categoryFilter)}
                categories={['Todos', ...data.categories]}
                query={query}
                setQuery={setQuery}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                setModal={setModal}
                remove={remove}
                exportCsv={exportCsv}
              />
            )}
            {view === 'salary' && <SalaryPanel salary={data.salary} updateSalary={updateSalary} />}
            {view === 'reports' && (
              <Reports data={filteredData} analytics={analytics} exportCsv={exportCsv} />
            )}
            {view === 'goals' && (
              <Goals goals={data.goals} setModal={setModal} remove={remove} analytics={analytics} />
            )}
            {view === 'calendar' && <CalendarView expenses={filteredData.expenses} incomes={filteredData.incomes} />}
            {view === 'settings' && (
              <SettingsView
                data={data}
                setData={setData}
                addCategory={addCategory}
                removeCategory={removeCategory}
                setTheme={setTheme}
                theme={theme}
              />
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <MobileNav view={view} setView={setView} />

      <FloatingAction setModal={setModal} />

      <AnimatePresence>
        {modal && (
          <EditorModal
            modal={modal}
            categories={data.categories}
            selectedMonth={selectedMonth}
            onClose={() => setModal(null)}
            onExpense={upsertExpense}
            onIncome={upsertIncome}
            onGoal={upsertGoal}
            onSalary={updateSalary}
          />
        )}
        {pendingDelete && (
          <ConfirmDeleteModal
            pendingDelete={pendingDelete}
            onCancel={() => setPendingDelete(null)}
            onConfirm={confirmRemove}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function AuthScreen({ onAuth, theme, setTheme }) {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    setError('')
    if (!form.email.includes('@')) {
      setError('Digite um e-mail válido.')
      return
    }
    if (mode !== 'forgot' && form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      if (mode === 'forgot') {
        setError('Link de recuperação enviado. Você já pode entrar.')
        setMode('login')
        return
      }
      onAuth({ name: form.name || 'Bruno Koala', email: form.email })
    }, 800)
  }

  return (
    <main className="auth-shell">
      <div className="auth-aurora" />
      <button className="theme-chip auth-theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <section className="auth-copy">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow">
            <Sparkles size={16} /> Koala
          </span>
          <h1>Comande seu dinheiro em um painel financeiro premium.</h1>
          <p>
            Salário, gastos, metas, previsões, lembretes, relatórios e fluxo de caixa recorrente
            em uma experiência moderna, bonita e fácil de usar.
          </p>
          <div className="trust-row">
            <span>
              <ShieldCheck size={17} /> Dados locais com autosalvamento
            </span>
            <span>
              <LineChart size={17} /> Análises em tempo real
            </span>
          </div>
        </motion.div>
      </section>
      <motion.section
        className="auth-card"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="auth-card-head">
          <div>
            <span className="mini-label">{mode === 'register' ? 'Criar conta' : mode === 'forgot' ? 'Recuperação' : 'Bem-vindo de volta'}</span>
            <h2>{mode === 'register' ? 'Comece seu hub financeiro' : mode === 'forgot' ? 'Redefinir senha' : 'Entrar com segurança'}</h2>
          </div>
          <HolographicKoala />
        </div>

        <form onSubmit={submit} className="auth-form">
          {mode === 'register' && (
            <label>
              Nome completo
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Alex Morgan"
              />
            </label>
          )}
          <label>
              E-mail
            <input
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@company.com"
              type="email"
            />
          </label>
          {mode !== 'forgot' && (
            <label>
              Senha
              <div className="password-field">
                <input
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="6+ caracteres"
                  type={showPassword ? 'text' : 'password'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Alternar visibilidade da senha">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>
          )}
          {error && <div className={clsx('form-feedback', error.includes('enviado') && 'success')}>{error}</div>}
          <button className="primary-action" disabled={loading}>
            {loading ? <span className="loader" /> : mode === 'forgot' ? 'Enviar link de recuperação' : mode === 'register' ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <button className="google-action" onClick={() => onAuth({ name: 'Usuário Google', email: 'google.user@example.com' })}>
          <ShieldCheck size={17} /> Continuar com Google
        </button>

        <div className="auth-switcher">
          {mode !== 'login' && <button onClick={() => setMode('login')}>Voltar para entrar</button>}
          {mode === 'login' && <button onClick={() => setMode('register')}>Criar conta</button>}
          {mode === 'login' && <button onClick={() => setMode('forgot')}>Esqueceu a senha?</button>}
        </div>
      </motion.section>
    </main>
  )
}

function HolographicKoala({ compact = false, className }) {
  return (
    <div className={clsx('koala-mark', compact && 'compact', className)} role="img" aria-label="Koala holográfico">
      <img src={koalaImg} alt="" />
    </div>
  )
}

function Sidebar({ view, setView, open, setOpen, profile, logout }) {
  return (
    <>
      <aside className={clsx('sidebar', open && 'open')}>
        <div className="logo-row">
          <HolographicKoala compact />
          <div>
            <strong>Koala</strong>
            <span>Gestão financeira pessoal</span>
          </div>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={clsx(view === item.id && 'active')}
                onClick={() => {
                  setView(item.id)
                  setOpen(false)
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="sidebar-card">
          <span>Previsão premium</span>
          <strong>12,4% de ganho no fluxo de caixa</strong>
          <p>Baseado em contas recorrentes, velocidade de economia e histórico de receitas.</p>
        </div>
        <div className="profile-mini">
          <div className="avatar">{initials(profile.name)}</div>
          <div>
            <strong>{profile.name}</strong>
            <span>Plano {profile.plan}</span>
          </div>
          <button onClick={logout} aria-label="Sair">
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      {open && <button className="scrim" onClick={() => setOpen(false)} aria-label="Fechar menu" />}
    </>
  )
}

function Topbar({
  view,
  profile,
  theme,
  setTheme,
  setSidebarOpen,
  notifications,
  selectedMonth,
  setSelectedMonth,
  monthOptions,
  clearNotifications,
}) {
  const title = navItems.find((item) => item.id === view)?.label || 'Painel'
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [monthOpen, setMonthOpen] = useState(false)

  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
        <Menu size={20} />
      </button>
      <div>
        <span className="mini-label">Bom dia, {profile.name.split(' ')[0]}</span>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <div className="month-picker">
          <button
            type="button"
            className="month-picker-trigger"
            onClick={() => setMonthOpen((open) => !open)}
            aria-label="Selecionar mês"
          >
            <CalendarDays size={16} />
            <span>{formatMonthLabel(selectedMonth)}</span>
            <ChevronDown className={clsx('month-chevron', monthOpen && 'open')} size={16} />
          </button>
          {monthOpen && (
            <div className="month-menu">
              {monthOptions.map((month) => (
                <button
                  key={month}
                  type="button"
                  className={clsx(month === selectedMonth && 'active')}
                  onClick={() => {
                    setSelectedMonth(month)
                    setMonthOpen(false)
                  }}
                >
                  <span>{formatMonthLabel(month)}</span>
                  {month === selectedMonth && <Check size={15} />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="notification-center">
          <button
            className="notify-button"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label="Abrir notificações"
          >
            <Bell size={18} />
          </button>
          {notificationsOpen && (
            <div className="notification-popover">
              <div className="notification-popover-head">
                <strong>Notificações</strong>
                <span>{notifications.length}</span>
              </div>
              {!!notifications.length && (
                <button className="clear-notifications" onClick={clearNotifications}>
                  Limpar notificações
                </button>
              )}
              <div className="notification-popover-list">
                {notifications.length ? (
                  notifications.map((item, index) => (
                    <div key={`${item}-${index}`}>
                      <Bell size={15} />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p>Nenhuma notificação ainda.</p>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          className="theme-chip icon-only"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <HolographicKoala compact className="topbar-koala" />
      </div>
    </header>
  )
}

function Dashboard({ data, filteredData, analytics, selectedMonth, setModal, markPaid, remove, updateSalary, exportCsv }) {
  return (
    <div className="dashboard-grid">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">
            <WalletCards size={16} /> Saldo atual
          </span>
          <h2>{currency.format(analytics.balance)}</h2>
          <p>{analytics.savingsRate}% de taxa de economia neste mês. A previsão indica que você pode adicionar {currency.format(analytics.forecast)} às metas.</p>
        </div>
        <div className="hero-actions">
          <button onClick={() => setModal({ type: 'expense' })}>
            <Plus size={17} /> Despesa
          </button>
          <button onClick={() => setModal({ type: 'income' })}>
            <ArrowUpRight size={17} /> Receita
          </button>
        </div>
      </section>

      <div className="metric-grid">
        <MetricCard icon={ArrowUpRight} label="Receita mensal" value={analytics.income} trend="+8,2%" />
        <MetricCard icon={ArrowDownLeft} label="Despesas mensais" value={analytics.expenses} trend="-4,1%" />
        <MetricCard icon={CircleDollarSign} label="Saldo restante" value={analytics.remaining} trend="Saudável" />
        <MetricCard icon={ReceiptText} label="Contas em aberto" value={analytics.unpaid} trend={`${analytics.dueSoon} vencem em breve`} />
      </div>

      <Panel
        className="salary-summary-panel"
        title="Salário do mês"
        action={
          <button onClick={() => setModal({ type: 'salary', item: data.salary })}>
            <Edit3 size={16} /> Editar
          </button>
        }
      >
        <div className="salary-summary">
          <div>
            <span>Valor atual</span>
            <strong>{currency.format(filteredData.salary.current)}</strong>
            <p>
              {filteredData.salary.current
                ? data.salary.recurring
                  ? `Recorrente em ${formatMonthLabel(selectedMonth)}`
                  : `Pagamento em ${formatDate(data.salary.nextPayment)}`
                : `Sem salário em ${formatMonthLabel(selectedMonth)}`}
            </p>
          </div>
          <button
            className="danger-action"
            onClick={() => updateSalary({ current: 0, recurring: false, nextPayment: data.salary.nextPayment })}
          >
            <Trash2 size={16} /> Zerar salário
          </button>
        </div>
      </Panel>

      <Panel className="chart-panel large" title="Evolução mensal" action={<button onClick={() => exportCsv('expenses')}><Download size={16} /> Exportar</button>}>
        <ResponsiveContainer width="100%" height={310}>
          <AreaChart data={monthlyTrend} margin={{ top: 10, right: 18, left: 28, bottom: 0 }}>
            <defs>
              <linearGradient id="income" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#00c2a8" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#00c2a8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenses" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#ff5c8a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ff5c8a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" stroke="var(--muted)" />
            <YAxis width={72} stroke="var(--muted)" tickFormatter={(value) => compactCurrency.format(value)} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="income" stroke="#00c2a8" fill="url(#income)" strokeWidth={3} />
            <Area type="monotone" dataKey="expenses" stroke="#ff5c8a" fill="url(#expenses)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="chart-panel" title="Análise de despesas">
        <ResponsiveContainer width="100%" height={270}>
          <PieChart>
            <Pie data={analytics.breakdown} dataKey="value" nameKey="name" innerRadius={64} outerRadius={98} paddingAngle={3}>
              {analytics.breakdown.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="legend-list">
          {analytics.breakdown.slice(0, 5).map((item) => (
            <span key={item.name}>
              <i style={{ background: item.color }} />
              {item.name}
              <strong>{currency.format(item.value)}</strong>
            </span>
          ))}
        </div>
      </Panel>

      <Panel className="transactions-panel" title="Transações recentes" action={<button onClick={() => setModal({ type: 'expense' })}><Plus size={16} /> Adicionar</button>}>
        <div className="transaction-list">
          {filteredData.expenses.slice(0, 6).map((expense) => (
            <TransactionRow
              key={expense.id}
              item={expense}
              onPaid={() => markPaid(expense.id)}
              onEdit={() => setModal({ type: 'expense', item: expense })}
              onDelete={() => remove('expenses', expense.id)}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Notificações inteligentes">
        <div className="notification-list">
          {data.notifications.map((item, index) => (
            <div key={`${item}-${index}`}>
              <Bell size={17} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, trend }) {
  return (
    <motion.div className="metric-card" whileHover={{ y: -4 }}>
      <div className="metric-icon">
        <Icon size={19} />
      </div>
      <span>{label}</span>
      <strong>{currency.format(value)}</strong>
      <small>{trend}</small>
    </motion.div>
  )
}

function Ledger({
  title,
  subtitle,
  type,
  rows,
  categories,
  query,
  setQuery,
  categoryFilter,
  setCategoryFilter,
  setModal,
  remove,
  markPaid,
  exportCsv,
}) {
  const isExpense = type === 'expenses'
  return (
    <div className="page-stack">
      <section className="section-head">
        <div>
          <span className="eyebrow">
            {isExpense ? <CreditCard size={16} /> : <ArrowUpRight size={16} />}
            {isExpense ? 'Contas, parcelas e custos recorrentes' : 'Renda extra e histórico'}
          </span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button className="primary-action compact" onClick={() => setModal({ type: isExpense ? 'expense' : 'income' })}>
          <Plus size={17} /> Adicionar {isExpense ? 'despesa' : 'receita'}
        </button>
      </section>

      <div className="toolbar">
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título, nota ou categoria..." />
        </label>
        <label className="select-box">
          <Filter size={17} />
          <CustomSelect
            ariaLabel="Filtrar categoria"
            className="toolbar-select"
            value={categoryFilter}
            options={categories[0] === 'Todos' ? categories : ['Todos', ...categories]}
            onChange={setCategoryFilter}
          />
        </label>
        <button onClick={() => exportCsv(type)}>
          <Download size={17} /> CSV
        </button>
      </div>

      <div className="ledger-table">
        <div className="table-head">
          <span>Nome</span>
          <span>Categoria</span>
          <span>{isExpense ? 'Vencimento' : 'Data'}</span>
          <span>Status</span>
          <span>Valor</span>
          <span />
        </div>
        {rows.map((row) => (
          <div className="table-row" key={row.id}>
            <div>
              <strong>{row.title}</strong>
              <small>{row.note || 'Sem notas'}</small>
            </div>
            <span className="category-pill" style={{ '--pill': categoryPalette[row.category] || '#6c8cff' }}>
              {row.category}
            </span>
            <span>{formatDate(row.dueDate || row.date)}</span>
            <span className={clsx('status-pill', row.paid ? 'paid' : 'open')}>
              {isExpense ? (row.paid ? 'Pago' : 'Aberto') : 'Recebido'}
            </span>
            <strong className={isExpense ? 'negative' : 'positive'}>
              {isExpense ? '-' : '+'}
              {currency.format(row.amount)}
            </strong>
            <div className="row-actions">
              {isExpense && (
                <button onClick={() => markPaid(row.id)} aria-label="Alternar pago">
                  <Check size={16} />
                </button>
              )}
              <button onClick={() => setModal({ type: isExpense ? 'expense' : 'income', item: row })} aria-label="Editar">
                <Edit3 size={16} />
              </button>
              <button onClick={() => remove(type, row.id)} aria-label="Excluir">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {!rows.length && <EmptyState title="Nenhum registro encontrado" text="Ajuste os filtros ou crie uma nova transação." />}
      </div>
    </div>
  )
}

function SalaryPanel({ salary, updateSalary }) {
  const [current, setCurrent] = useState(salary.current)
  const [recurring, setRecurring] = useState(salary.recurring)
  const [nextPayment, setNextPayment] = useState(salary.nextPayment)

  return (
    <div className="salary-layout">
      <section className="hero-panel salary-hero">
        <div>
          <span className="eyebrow">
            <BriefcaseBusiness size={16} /> Gestão de salário
          </span>
          <h2>{currency.format(salary.current)}</h2>
          <p>Salário recorrente {salary.recurring ? 'ativado' : 'desativado'} com próximo pagamento em {formatDate(salary.nextPayment)}.</p>
        </div>
      </section>
      <Panel title="Editar salário">
        <div className="form-grid">
          <label>
            Salário mensal
            <input type="number" value={current} onChange={(event) => setCurrent(event.target.value)} />
          </label>
          <label>
            Próximo pagamento
            <input type="date" value={nextPayment} onChange={(event) => setNextPayment(event.target.value)} />
          </label>
          <label className="switch-row">
            Salário mensal recorrente
            <input type="checkbox" checked={recurring} onChange={(event) => setRecurring(event.target.checked)} />
          </label>
          <button className="primary-action compact" onClick={() => updateSalary({ current: Number(current), recurring, nextPayment })}>
            Salvar salário
          </button>
        </div>
      </Panel>
      <Panel className="chart-panel large" title="Histórico salarial">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salary.history} margin={{ top: 10, right: 18, left: 28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" stroke="var(--muted)" />
            <YAxis width={72} stroke="var(--muted)" tickFormatter={(value) => compactCurrency.format(value)} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="amount" fill="#6c8cff" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  )
}

function Reports({ data, analytics, exportCsv }) {
  return (
    <div className="reports-grid">
      <section className="section-head reports-head">
        <div>
          <span className="eyebrow">
            <LineChart size={16} /> Relatórios mensais e anuais
          </span>
          <h2>Central de inteligência financeira</h2>
          <p>Análises interativas, divisão por categorias, evolução mensal e relatórios prontos para exportação.</p>
        </div>
        <div className="button-row">
          <button onClick={() => window.print()}>
            <Download size={17} /> PDF
          </button>
          <button onClick={() => exportCsv('expenses')}>
            <Download size={17} /> Excel
          </button>
        </div>
      </section>
      <Panel className="chart-panel large" title="Receitas vs despesas">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyTrend} margin={{ top: 10, right: 18, left: 28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" stroke="var(--muted)" />
            <YAxis width={72} stroke="var(--muted)" tickFormatter={(value) => compactCurrency.format(value)} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="income" fill="#00c2a8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#ff5c8a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Indicadores financeiros">
        <div className="indicator-list">
          <Indicator label="Taxa de economia" value={`${analytics.savingsRate}%`} tone="good" />
          <Indicator label="Orçamento usado" value={`${analytics.budgetUsed}%`} tone="warn" />
          <Indicator label="Carga recorrente" value={currency.format(analytics.recurring)} tone="neutral" />
          <Indicator label="Sobra prevista" value={currency.format(analytics.forecast)} tone="good" />
        </div>
      </Panel>
      <Panel title="Divisão de despesas">
        <div className="breakdown-bars">
          {analytics.breakdown.map((item) => (
            <div key={item.name}>
              <span>{item.name}</span>
              <div>
                <i style={{ width: `${Math.min(100, (item.value / analytics.expenses) * 100)}%`, background: item.color }} />
              </div>
              <strong>{currency.format(item.value)}</strong>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Resumo mensal">
        <div className="summary-copy">
          <p>A receita total é {currency.format(analytics.income)} contra {currency.format(analytics.expenses)} em despesas. O fluxo restante é {currency.format(analytics.remaining)}.</p>
          <p>{data.expenses.filter((item) => !item.paid).length} despesas ainda estão abertas, com {analytics.dueSoon} vencendo nos próximos 7 dias.</p>
        </div>
      </Panel>
    </div>
  )
}

function Goals({ goals, setModal, remove, analytics }) {
  return (
    <div className="page-stack">
      <section className="section-head">
        <div>
          <span className="eyebrow">
            <Flag size={16} /> Metas financeiras
          </span>
          <h2>Coloque o futuro dentro do plano mensal</h2>
          <p>Acompanhe marcos, prazos, sobra prevista e ritmo de contribuição.</p>
        </div>
        <button className="primary-action compact" onClick={() => setModal({ type: 'goal' })}>
          <Plus size={17} /> Adicionar meta
        </button>
      </section>
      <div className="goal-grid">
        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.saved / goal.target) * 100))
          return (
            <motion.article className="goal-card" key={goal.id} whileHover={{ y: -4 }}>
              <div className="goal-top">
                <div className="goal-icon" style={{ background: goal.color }}>
                  <Target size={19} />
                </div>
                <div className="row-actions">
                  <button onClick={() => setModal({ type: 'goal', item: goal })}>
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => remove('goals', goal.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3>{goal.name}</h3>
              <p>{currency.format(goal.saved)} guardados de {currency.format(goal.target)}</p>
              <div className="progress-track">
                <span style={{ width: `${progress}%`, background: goal.color }} />
              </div>
              <div className="goal-meta">
                <span>{progress}% concluído</span>
                <span>{formatDate(goal.deadline)}</span>
              </div>
            </motion.article>
          )
        })}
        <article className="goal-card forecast-card">
          <Sparkles size={22} />
          <h3>Previsão inteligente</h3>
          <p>No ritmo atual, você pode direcionar {currency.format(analytics.forecast)} para metas este mês.</p>
        </article>
      </div>
    </div>
  )
}

function CalendarView({ expenses, incomes }) {
  const events = [
    ...expenses.map((item) => ({ ...item, type: 'expense', date: item.dueDate })),
    ...incomes.map((item) => ({ ...item, type: 'income' })),
  ].sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date))

  return (
    <div className="calendar-layout">
      <section className="section-head">
        <div>
          <span className="eyebrow">
            <CalendarDays size={16} /> Calendário financeiro
          </span>
          <h2>Vencimentos, lembretes e entradas de dinheiro</h2>
          <p>Veja o que vem pela frente e evite contas esquecidas.</p>
        </div>
      </section>
      <div className="calendar-grid">
        {events.map((event) => (
          <div className="calendar-event" key={`${event.type}-${event.id}`}>
            <time>{formatDate(event.date)}</time>
            <div>
              <strong>{event.title}</strong>
              <span>{event.category}</span>
            </div>
            <b className={event.type === 'income' ? 'positive' : 'negative'}>
              {event.type === 'income' ? '+' : '-'}{currency.format(event.amount)}
            </b>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsView({ data, setData, addCategory, removeCategory, theme, setTheme }) {
  const [category, setCategory] = useState('')

  return (
    <div className="settings-grid">
      <Panel title="Perfil">
        <div className="form-grid">
          <label>
            Nome
            <input
              value={data.profile.name}
              onChange={(event) => setData({ ...data, profile: { ...data.profile, name: event.target.value } })}
            />
          </label>
          <label>
            E-mail
            <input
              value={data.profile.email}
              onChange={(event) => setData({ ...data, profile: { ...data.profile, email: event.target.value } })}
            />
          </label>
        </div>
      </Panel>
      <Panel title="Categorias personalizadas">
        <div className="category-cloud">
          {data.categories.map((item) => (
            <span key={item}>
              {item}
              <button onClick={() => removeCategory(item)} aria-label={`Remover categoria ${item}`}>
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
        <div className="inline-form">
          <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Nova categoria" />
          <button onClick={() => {
            addCategory(category)
            setCategory('')
          }}>
            <Plus size={17} /> Adicionar
          </button>
        </div>
      </Panel>
      <Panel title="Preferências do painel">
        <div className="preference-list">
          <label>
            Modo escuro
            <input type="checkbox" checked={theme === 'dark'} onChange={(event) => setTheme(event.target.checked ? 'dark' : 'light')} />
          </label>
          <label>
            Modo offline
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            Auto-salvar
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            Notificações inteligentes
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </Panel>
    </div>
  )
}

function EditorModal({ modal, categories, selectedMonth, onClose, onExpense, onIncome, onGoal, onSalary }) {
  const isExpense = modal.type === 'expense'
  const isIncome = modal.type === 'income'
  const isGoal = modal.type === 'goal'
  const isSalary = modal.type === 'salary'
  const item = modal.item || {}
  const defaultSelectedDate = getDefaultDateForMonth(selectedMonth)
  const [form, setForm] = useState(() => ({
    id: item.id,
    title: item.title || '',
    amount: item.amount || '',
    category: item.category || categories[0],
    date: item.date || defaultSelectedDate,
    dueDate: item.dueDate || defaultSelectedDate,
    paid: item.paid || false,
    recurring: item.recurring || false,
    installments: item.installments || 1,
    note: item.note || '',
    name: item.name || '',
    target: item.target || '',
    saved: item.saved || '',
    deadline: item.deadline || defaultSelectedDate,
    color: item.color || '#6c8cff',
    current: item.current ?? '',
    nextPayment: isSalary ? defaultSelectedDate : item.nextPayment || defaultSelectedDate,
    salaryRecurring: item.recurring ?? true,
  }))

  function submit(event) {
    event.preventDefault()
    if (isExpense) {
      onExpense({ ...form, amount: Number(form.amount), installments: Number(form.installments) })
    } else if (isIncome) {
      onIncome({ id: form.id, title: form.title, amount: Number(form.amount), category: form.category, date: form.date, note: form.note })
    } else if (isGoal) {
      onGoal({ id: form.id, name: form.name, target: Number(form.target), saved: Number(form.saved), deadline: form.deadline, color: form.color })
    } else if (isSalary) {
      const salaryValue = Number(form.current)
      onSalary({ current: salaryValue, recurring: salaryValue > 0 ? form.salaryRecurring : false, nextPayment: form.nextPayment })
    }
    onClose()
  }

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form className="modal-card" onSubmit={submit} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }}>
        <div className="modal-head">
          <div>
            <span className="mini-label">{isSalary || item.id ? 'Editar' : 'Criar'}</span>
            <h2>{isSalary ? 'Salário do mês' : isGoal ? 'Meta financeira' : isExpense ? 'Despesa' : 'Receita'}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar">
            <X size={19} />
          </button>
        </div>

        <div className="form-grid">
          {isSalary ? (
            <>
              <label>
                Salário mensal
                <input required type="number" value={form.current} onChange={(event) => setForm({ ...form, current: event.target.value })} />
              </label>
              <label>
                Próximo pagamento
                <input type="date" value={form.nextPayment} onChange={(event) => setForm({ ...form, nextPayment: event.target.value })} />
              </label>
              <label className="switch-row">
                Recorrente mensal
                <input type="checkbox" checked={form.salaryRecurring} onChange={(event) => setForm({ ...form, salaryRecurring: event.target.checked })} />
              </label>
            </>
          ) : isGoal ? (
            <>
              <label>
                Nome da meta
                <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Reserva de emergência" />
              </label>
              <label>
                Objetivo
                <input required type="number" value={form.target} onChange={(event) => setForm({ ...form, target: event.target.value })} />
              </label>
              <label>
                Guardado
                <input required type="number" value={form.saved} onChange={(event) => setForm({ ...form, saved: event.target.value })} />
              </label>
              <label>
                Prazo
                <input type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} />
              </label>
              <label>
                Cor de destaque
                <input type="color" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })} />
              </label>
            </>
          ) : (
            <>
              <label>
                Título
                <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder={isExpense ? 'Aluguel, mercado, assinatura...' : 'Freelance, dividendo, venda...'} />
              </label>
              <label>
                Valor
                <input required type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} />
              </label>
              <label>
                Categoria
                <CustomSelect
                  ariaLabel="Selecionar categoria"
                  value={form.category}
                  options={categories}
                  onChange={(category) => setForm({ ...form, category })}
                />
              </label>
              <label>
                {isExpense ? 'Vencimento' : 'Data'}
                <input type="date" value={isExpense ? form.dueDate : form.date} onChange={(event) => setForm({ ...form, [isExpense ? 'dueDate' : 'date']: event.target.value })} />
              </label>
              {isExpense && (
                <>
                  <label>
                    Parcelas
                    <div className="stepper-field">
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            installments: Math.max(1, Number(form.installments || 1) - 1),
                          })
                        }
                        aria-label="Diminuir parcelas"
                      >
                        <Minus size={15} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={form.installments}
                        onChange={(event) => setForm({ ...form, installments: event.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            installments: Number(form.installments || 0) + 1,
                          })
                        }
                        aria-label="Aumentar parcelas"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </label>
                  <label className="switch-row">
                    Recorrente mensal
                    <input type="checkbox" checked={form.recurring} onChange={(event) => setForm({ ...form, recurring: event.target.checked })} />
                  </label>
                  <label className="switch-row">
                    Marcar como pago
                    <input type="checkbox" checked={form.paid} onChange={(event) => setForm({ ...form, paid: event.target.checked })} />
                  </label>
                </>
              )}
              <label className="wide">
                Notas
                <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Descrição, forma de pagamento, lembrete..." />
              </label>
            </>
          )}
        </div>
        <button className="primary-action">Salvar alterações</button>
      </motion.form>
    </motion.div>
  )
}

function Panel({ title, action, className, children }) {
  return (
    <section className={clsx('panel', className)}>
      <div className="panel-head">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

function CustomSelect({ value, options, onChange, ariaLabel, className }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={clsx('custom-select', className)}>
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-label={ariaLabel}
      >
        <span>{value}</span>
        <ChevronDown className={clsx(open && 'open')} size={16} />
      </button>
      {open && (
        <div className="custom-select-menu">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={clsx(option === value && 'active')}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              <span>{option}</span>
              {option === value && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TransactionRow({ item, onPaid, onEdit, onDelete }) {
  return (
    <div className="transaction-row">
      <div className="transaction-icon" style={{ '--icon-bg': categoryPalette[item.category] || '#6c8cff' }}>
        <ReceiptText size={17} />
      </div>
      <div>
        <strong>{item.title}</strong>
        <span>{item.category} - {formatDate(item.dueDate)}</span>
      </div>
      <button className={clsx('status-pill', item.paid ? 'paid' : 'open')} onClick={onPaid}>
        {item.paid ? 'Pago' : 'Aberto'}
      </button>
      <b>-{currency.format(item.amount)}</b>
      <div className="transaction-actions">
        <button onClick={onEdit} aria-label="Editar transação">
          <Edit3 size={15} />
        </button>
        <button onClick={onDelete} aria-label="Excluir transação">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}

function Indicator({ label, value, tone }) {
  return (
    <div className={clsx('indicator', tone)}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function MobileNav({ view, setView }) {
  return (
    <nav className="mobile-nav">
      {navItems.slice(0, 5).map((item) => {
        const Icon = item.icon
        return (
          <button key={item.id} className={clsx(view === item.id && 'active')} onClick={() => setView(item.id)}>
            <Icon size={19} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function FloatingAction({ setModal }) {
  return (
    <div className="fab-menu">
      <button onClick={() => setModal({ type: 'expense' })} aria-label="Adicionar despesa rapidamente">
        <Plus size={21} />
      </button>
      <button onClick={() => setModal({ type: 'income' })} aria-label="Adicionar receita rapidamente">
        <ArrowUpRight size={19} />
      </button>
    </div>
  )
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <MoreHorizontal size={28} />
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  )
}

function ConfirmDeleteModal({ pendingDelete, onCancel, onConfirm }) {
  const label = getDeleteLabel(pendingDelete.type)
  const name = pendingDelete.item?.title || pendingDelete.item?.name || 'registro'

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="confirm-card"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
      >
        <div className="confirm-icon">
          <Trash2 size={22} />
        </div>
        <h2>Excluir {label.toLowerCase()}?</h2>
        <p>Você está prestes a excluir “{name}”. Essa ação não pode ser desfeita.</p>
        <div className="confirm-actions">
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="danger-action" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      {label && <strong>{label}</strong>}
      {payload.map((item) => (
        <span key={item.dataKey || item.name}>
          {translateMetricName(item.name || item.dataKey)}: {currency.format(item.value)}
        </span>
      ))}
    </div>
  )
}

function createInstallmentExpenses(expense, installments) {
  return Array.from({ length: installments }, (_, index) => ({
    ...expense,
    id: crypto.randomUUID(),
    dueDate: addMonths(expense.dueDate, index),
    installments,
    recurring: false,
    title: `${expense.title} (${index + 1}/${installments})`,
    note: [expense.note, `Parcela ${index + 1} de ${installments}`].filter(Boolean).join(' - '),
  }))
}

function addMonths(date, count) {
  const parsed = parseLocalDate(date)
  parsed.setMonth(parsed.getMonth() + count)
  return dateToInputValue(parsed)
}

function getCurrentMonthKey() {
  return dateToInputValue(new Date()).slice(0, 7)
}

function getMonthKey(date) {
  return dateToInputValue(parseLocalDate(date)).slice(0, 7)
}

function getMonthOptions(data) {
  const months = new Set()
  const current = parseLocalDate(`${getCurrentMonthKey()}-01`)

  for (let index = 0; index <= 12; index += 1) {
    months.add(dateToInputValue(addMonthsToDate(current, index)).slice(0, 7))
  }

  data.expenses.forEach((expense) => months.add(getMonthKey(expense.dueDate)))
  data.incomes.forEach((income) => months.add(getMonthKey(income.date)))
  if (data.salary.nextPayment) months.add(getMonthKey(data.salary.nextPayment))

  return [...months].sort()
}

function formatMonthLabel(month) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(parseLocalDate(`${month}-01`))
}

function getDataForMonth(data, month) {
  const salaryApplies = data.salary.recurring || getMonthKey(data.salary.nextPayment) === month

  return {
    ...data,
    salary: {
      ...data.salary,
      current: salaryApplies ? data.salary.current : 0,
    },
    expenses: data.expenses.filter((expense) => getMonthKey(expense.dueDate) === month),
    incomes: data.incomes.filter((income) => getMonthKey(income.date) === month),
  }
}

function getDefaultDateForMonth(month) {
  const today = new Date()
  const [year, monthIndex] = month.split('-').map(Number)
  const lastDay = new Date(year, monthIndex, 0).getDate()
  const day = Math.min(today.getDate(), lastDay)

  return dateToInputValue(new Date(year, monthIndex - 1, day))
}

function addMonthsToDate(date, count) {
  const next = new Date(date)
  next.setMonth(next.getMonth() + count)
  return next
}

function dateToInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDeleteLabel(type) {
  if (type === 'expenses') return 'Despesa'
  if (type === 'incomes') return 'Receita'
  return 'Meta'
}

function getAnalytics(data) {
  const income = data.salary.current + data.incomes.reduce((sum, item) => sum + Number(item.amount), 0)
  const expenses = data.expenses.reduce((sum, item) => sum + Number(item.amount), 0)
  const paid = data.expenses.filter((item) => item.paid).reduce((sum, item) => sum + Number(item.amount), 0)
  const unpaid = expenses - paid
  const remaining = income - expenses
  const balance = remaining
  const dueSoon = data.expenses.filter((item) => {
    const diff = (parseLocalDate(item.dueDate) - new Date()) / 86400000
    return !item.paid && diff >= 0 && diff <= 7
  }).length
  const categoryTotals = data.expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount)
    return acc
  }, {})
  const budgetTotal = Object.values(data.budgets).reduce((sum, item) => sum + Number(item), 0)
  const recurring = data.expenses.filter((item) => item.recurring).reduce((sum, item) => sum + Number(item.amount), 0)

  return {
    income,
    expenses,
    paid,
    unpaid,
    remaining,
    balance,
    dueSoon,
    forecast: Math.max(0, Math.round(remaining * 0.32)),
    savingsRate: Math.max(0, Math.round((remaining / income) * 100)),
    budgetUsed: Math.round((expenses / budgetTotal) * 100),
    recurring,
    breakdown: Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value, color: categoryPalette[name] || '#6c8cff' }))
      .sort((a, b) => b.value - a.value),
  }
}

function filteredRows(rows, query, category) {
  const search = query.toLowerCase()
  return rows.filter((row) => {
    const matchesSearch = [row.title, row.note, row.category].join(' ').toLowerCase().includes(search)
    const matchesCategory = category === 'Todos' || row.category === category
    return matchesSearch && matchesCategory
  })
}

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(parseLocalDate(date))
}

function parseLocalDate(date) {
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T00:00:00`)
  }
  return new Date(date)
}

function translateMetricName(name) {
  const labels = {
    income: 'Receitas',
    expenses: 'Despesas',
    balance: 'Saldo',
    amount: 'Valor',
    value: 'Valor',
  }
  return labels[name] || name
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default App
