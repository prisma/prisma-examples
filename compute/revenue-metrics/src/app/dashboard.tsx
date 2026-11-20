'use client'

import { useRef, useState } from 'react'

import type { MetricKey } from '../queries'

// The interactive part of the page: which metric's SQL the side panel shows.
// Every value arrives already formatted from the server component.

export type Card = {
  key: Exclude<MetricKey, 'chart'>
  label: string
  value: string
  delta: string
  tone: 'up' | 'down' | 'flat'
  sub: string
}

export type Bar = { month: string; label: string; height: number; current: boolean }

export type Panel = { title: string; sql: string; returns: string; note: string }

type Props = {
  cards: Card[]
  bars: Bar[]
  chartLabel: string
  panels: Record<MetricKey, Panel>
}

function CodeIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6l-6 6 6 6" />
    </svg>
  )
}

export function Dashboard({ cards, bars, chartLabel, panels }: Props) {
  const [picked, setPicked] = useState<MetricKey>('mrr')
  const [copyLabel, setCopyLabel] = useState('Copy')
  const sqlRef = useRef<HTMLPreElement>(null)
  const panel = panels[picked]

  function showCopyLabel(label: string) {
    setCopyLabel(label)
    setTimeout(() => setCopyLabel('Copy'), 2000)
  }

  async function copySql() {
    try {
      await navigator.clipboard.writeText(panel.sql)
      showCopyLabel('Copied')
    } catch {
      // The clipboard API needs a secure context (HTTPS or localhost). Without
      // it, select the SQL so the user can copy it with the keyboard.
      const sql = sqlRef.current
      const selection = window.getSelection()
      if (!sql || !selection) return
      selection.selectAllChildren(sql)
      showCopyLabel('Press Ctrl+C')
    }
  }

  const sqlButton = (key: MetricKey) => (
    <button
      type="button"
      className="sql-button"
      aria-pressed={picked === key}
      aria-controls="sql-panel"
      onClick={() => setPicked(key)}
    >
      <CodeIcon />
      View SQL
    </button>
  )

  return (
    <div className="layout">
      <main className="main">
        <div className="cards">
          {cards.map((card) => (
            <section key={card.key} className="card" data-picked={picked === card.key}>
              <div className="card-head">
                <h2 className="label">{card.label}</h2>
                <span className="delta" data-tone={card.tone}>
                  {card.delta}
                </span>
              </div>
              <p className="figure">{card.value}</p>
              <p className="sub">{card.sub}</p>
              {sqlButton(card.key)}
            </section>
          ))}
        </div>

        <section className="card" data-picked={picked === 'chart'}>
          <div className="chart-head">
            <div>
              <h2>Revenue by month</h2>
              <p className="sub">Paid invoices, by invoice date (UTC). *Current month to date.</p>
            </div>
            {sqlButton('chart')}
          </div>
          <div className="chart-scroll">
            <div className="bars" role="img" aria-label={chartLabel}>
              {bars.map((bar) => (
                <div key={bar.month} className="bar">
                  <span>{bar.label}</span>
                  <div className="bar-fill" data-current={bar.current} style={{ height: bar.height }} />
                </div>
              ))}
            </div>
            <div className="months" aria-hidden="true">
              {bars.map((bar) => (
                <span key={bar.month}>{bar.month}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <aside id="sql-panel" className="panel" aria-live="polite">
        <div>
          <div className="panel-head">
            <p className="panel-label">Query behind</p>
            <code className="panel-file">src/queries.ts</code>
          </div>
          <h2>{panel.title}</h2>
        </div>
        <div className="code-wrap">
          <button type="button" className="copy-button" onClick={copySql}>
            {copyLabel}
          </button>
          <pre ref={sqlRef} className="code">
            {panel.sql}
          </pre>
        </div>
        <div>
          <p className="panel-label">Returns</p>
          <pre className="code" data-kind="returns" style={{ marginTop: 6 }}>
            {panel.returns}
          </pre>
        </div>
        <p className="note">{panel.note}</p>
      </aside>
    </div>
  )
}
