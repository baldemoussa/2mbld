import { Fragment, type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle.tsx'
import {
  adminLogin,
  adminLogout,
  getMessages,
  getVisits,
  updateMessageStatus,
} from '../services/api.ts'
import type { ContactMessage, MonthlyVisit } from '../types/index.ts'
import { monthYear } from '../utils/dates.ts'

function locationLabel(city: string, country: string) {
  if (city && country) return `${city}, ${country}`
  return city || country || 'Unknown'
}

export function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [visits, setVisits] = useState<MonthlyVisit[]>([])
  const [visitError, setVisitError] = useState('')
  const [loading, setLoading] = useState(false)

  function applyInbox(nextMessages: ContactMessage[], nextVisits: MonthlyVisit[], nextVisitError: string) {
    setMessages(nextMessages)
    setVisits(nextVisits)
    setVisitError(nextVisitError)
    setAuthed(true)
  }

  async function loadInbox() {
    const [messageResult, visitResult] = await Promise.allSettled([getMessages(), getVisits()])
    if (messageResult.status === 'rejected') throw messageResult.reason
    const nextVisits = visitResult.status === 'fulfilled' ? visitResult.value.visits : []
    const nextVisitError = visitResult.status === 'rejected' ? 'Visitor counts could not be loaded.' : ''
    return { messages: messageResult.value.messages, visits: nextVisits, visitError: nextVisitError }
  }

  useEffect(() => {
    let active = true
    loadInbox()
      .then((result) => {
        if (!active) return
        applyInbox(result.messages, result.visits, result.visitError)
      })
      .catch(() => {
        if (active) setAuthed(false)
      })
    return () => {
      active = false
    }
  }, [])

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(email, password)
      const result = await loadInbox()
      applyInbox(result.messages, result.visits, result.visitError)
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.')
    } finally {
      setLoading(false)
    }
  }

  async function onStatus(id: string, status: ContactMessage['status']) {
    const result = await updateMessageStatus(id, status)
    setMessages((current) => current.map((item) => (item.id === id ? result.message : item)))
  }

  async function onLogout() {
    await adminLogout()
    setAuthed(false)
    setMessages([])
    setVisits([])
    setVisitError('')
  }

  return (
    <main className="min-h-screen bg-paper">
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <h1 className="text-lg font-semibold">Admin</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {authed ? (
              <button type="button" className="text-sm text-slate-200 hover:text-white" onClick={() => void onLogout()}>
                Sign out
              </button>
            ) : null}
            <Link to="/" className="text-sm text-slate-200 hover:text-white">
              Back to portfolio
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8">
        {authed ? (
          <>
          <section aria-labelledby="visitors-heading" className="mb-10">
            <h2 id="visitors-heading" className="text-xl font-bold text-navy">
              Visitors by month
            </h2>
            <p className="mt-1 text-sm text-muted">
              Each browser is counted once during a calendar month. Country and city are read from the network address
              when it can be identified. The address itself is not stored.
            </p>
            {visitError ? (
              <p role="alert" className="mt-4 text-sm text-rose-700 dark:text-rose-300">
                {visitError}
              </p>
            ) : null}
            {!visitError && visits.length === 0 ? <p className="mt-4 text-sm text-muted">No visitors yet.</p> : null}
            {visits.length > 0 ? (
              <table className="mt-4 w-full overflow-hidden rounded-2xl border border-line bg-surface text-sm shadow-card">
                <caption className="sr-only">Visitor counts grouped by month, country, and city</caption>
                <thead className="bg-paper text-left text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Month
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Location
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Visitors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => (
                    <Fragment key={visit.month}>
                      <tr className="border-t border-line">
                        <th scope="row" className="px-4 py-3 text-left font-medium text-navy">
                          {monthYear(`${visit.month}-01T00:00:00.000Z`)}
                        </th>
                        <td className="px-4 py-3 text-muted">All locations</td>
                        <td className="px-4 py-3 text-right tabular-nums text-ink">{visit.count}</td>
                      </tr>
                      {visit.locations.map((location) => (
                        <tr key={`${visit.month}-${location.country}-${location.city}`} className="border-t border-line">
                          <td className="px-4 py-3" />
                          <td className="px-4 py-3 text-ink">{locationLabel(location.city, location.country)}</td>
                          <td className="px-4 py-3 text-right tabular-nums text-ink">{location.count}</td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            ) : null}
          </section>
          <section aria-labelledby="inbox-heading">
            <div className="mb-4">
              <h2 id="inbox-heading" className="text-xl font-bold text-navy">
                Contact messages
              </h2>
            </div>
            {messages.length === 0 ? <p className="text-sm text-muted">No messages yet.</p> : null}
            <ul className="space-y-4">
              {messages.map((message) => (
                <li key={message.id} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy">{message.name}</p>
                      <p className="text-sm text-muted">{message.email}</p>
                    </div>
                    <label className="text-sm text-muted">
                      Status
                      <select
                        className="ml-2 rounded-md border border-line bg-surface px-2 py-1 text-ink"
                        aria-label={`Status for ${message.name}`}
                        value={message.status}
                        onChange={(event) => void onStatus(message.id, event.target.value as ContactMessage['status'])}
                      >
                        {['New', 'Read', 'Replied', 'Archived'].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {message.subject ? <p className="mt-3 text-sm font-medium">{message.subject}</p> : null}
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{message.message}</p>
                </li>
              ))}
            </ul>
          </section>
          </>
        ) : (
          <form onSubmit={onLogin} className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 className="text-xl font-bold text-navy">Administrator sign in</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="admin-email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-1 block text-sm font-medium">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
                />
              </div>
              {error ? (
                <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
