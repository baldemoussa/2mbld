export function WorkspaceArt({ tagline }: { tagline: string }) {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#07111f] shadow-card" aria-hidden="true">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-sm text-slate-300">workspace.ts</span>
        </div>
        <pre className="whitespace-pre-wrap px-5 py-4 text-left font-mono text-xs leading-6 text-slate-200">
          <code>
            <span className="text-sky-300">const</span> solution = {'{'}
            {'\n'}
            {'  '}stack: <span className="text-emerald-300">'React, Node.js, TypeScript, Express'</span>,{'\n'}
            {'  '}oracle: <span className="text-emerald-300">'Forms, Reports, APEX, PL/SQL, Database, Weblogic'</span>,{'\n'}
            {'  '}data: <span className="text-emerald-300">'PostgreSQL, SQL, MongoDB'</span>,{'\n'}
            {'}'}
            {'\n\n'}
            <span className="text-sky-300">function</span> deliver(work) {'{'}
            {'\n'}
            {'  '}return work.reliable && work.maintainable{'\n'}
            {'}'}
          </code>
        </pre>
      </div>
      <p className="mt-5 text-center font-serif text-2xl italic text-white sm:text-3xl">
        {tagline}
      </p>
    </div>
  )
}
