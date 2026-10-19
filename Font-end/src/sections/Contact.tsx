import { Send, SendHorizontal } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { sendContact } from '../services/api.ts'

const initial = { name: '', email: '', message: '', website: '' }

export function ContactForm({ email }: { email: string }) {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [notice, setNotice] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setNotice('')
    try {
      const result = await sendContact(form)
      setStatus('sent')
      setNotice(result.message)
      setForm(initial)
    } catch {
      setStatus('error')
      setNotice('The message was not saved. You can email directly instead.')
    }
  }

  return (
    <section id="contact" className="scroll-mt-24" aria-labelledby="contact-heading">
      <SectionHeading
        id="contact-heading"
        compact
        title="Let's build something great together!"
        icon={<Send className="h-7 w-7" aria-hidden="true" />}
      />
      <p className="text-sm leading-6 text-muted">
        I'm open to professional opportunities and technical collaborations involving Oracle technologies,
        enterprise modernization, databases, and full-stack software engineering.
      </p>
      <p className="mt-3 text-sm">
        <a className="font-medium text-accent hover:underline" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      {status === 'sent' ? (
        <p
          role="status"
          className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-6 text-sm leading-6 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
        >
          {notice}
        </p>
      ) : (
      <form className="mt-5 space-y-3" onSubmit={onSubmit}>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-70"
        >
          <SendHorizontal className="h-4 w-4" aria-hidden="true" />
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {notice ? (
          <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">
            {notice}
          </p>
        ) : null}
      </form>
      )}
    </section>
  )
}
