import { ArrowUpRight } from 'lucide-react'
import MarketingLayout from '~/layouts/marketing'

export default function Home() {
  return (
    <div className="home">
      <article className="prose-card">
        <div className="pc-top">
          <span className="pc-status mono tag" style={{ color: 'var(--ok)' }}>
            <span className="dot" /> Server ready
          </span>
        </div>

        <div className="pc-lead">Welcome to the power of a full-stack React app.</div>

        <p className="pc-para">
          Powered by Inertia and React, this setup blends server-driven routing with rich
          client-side interactivity that feels seamless, fast, and cohesive.
        </p>

        <p className="pc-para">
          This page is simply proof the engine started. Everything from here is yours to build.
        </p>

        <ul className="links">
          <li>
            <a className="lrow" href="https://docs.adonisjs.com" target="_blank" rel="noreferrer">
              <span className="lrow__bullet" />
              <span className="lrow__title">Documentation</span>
              <span className="lrow__desc">Guides & API reference</span>
              <span className="lrow__arrow">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </li>
          <li>
            <a className="lrow" href="https://plus.adonisjs.com" target="_blank" rel="noreferrer">
              <span className="lrow__bullet" />
              <span className="lrow__title">AdonisJS Plus</span>
              <span className="lrow__desc">Feature packs and Flow AI</span>
              <span className="lrow__arrow">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </li>
          <li>
            <a
              className="lrow"
              href="https://discord.com/invite/vDcEjq6"
              target="_blank"
              rel="noreferrer"
            >
              <span className="lrow__bullet" />
              <span className="lrow__title">Discord</span>
              <span className="lrow__desc">Meet fellow AdonisJS developers</span>
              <span className="lrow__arrow">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </li>
        </ul>

        <div className="stack">
          <span className="tag">Built with</span>
          <div className="pile" role="list" aria-label="Tech stack">
            <span
              className="tile"
              role="listitem"
              title="AdonisJS"
              style={{ background: '#5A45FF' }}
            >
              <svg viewBox="0 0 160 160" fill="#fff" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 80.0001C0 144.521 15.4786 160 79.9999 160 144.521 160 160 144.521 160 80.0001 160 15.4786 144.521 0 79.9999 0 15.4786 0 0 15.4786 0 80.0001zm32.2607 16.6191l25.0918-57.0266c4.2361-9.613 12.3825-14.8268 22.6474-14.8268 10.265 0 18.4113 5.2138 22.6481 14.8268l25.091 57.0266c1.141 2.77 2.118 6.3538 2.118 9.4498 0 14.175-9.939 24.114-24.114 24.114-4.828 0-8.6629-1.232-12.5444-2.479-3.9771-1.278-8.0036-2.572-13.1987-2.572-5.1349 0-9.2597 1.306-13.3154 2.589-3.9233 1.241-7.7814 2.462-12.4279 2.462-14.1752 0-24.1141-9.939-24.1141-24.114 0-3.096.9776-6.6798 2.1182-9.4498zm47.7392-47.0871L55.2344 105.581c7.332-3.422 15.8043-5.051 24.7655-5.051 8.6358 0 17.434 1.629 24.4401 5.051L79.9999 49.5321z"
                />
              </svg>
            </span>
            <span
              className="tile"
              role="listitem"
              title="Inertia"
              style={{ background: '#9061F9' }}
            >
              <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M12.5 8l4 4l-4 4h4.5l4 -4l-4 -4z" />
                <path d="M3.5 8l4 4l-4 4h4.5l4 -4l-4 -4z" />
              </svg>
            </span>
            <span className="tile" role="listitem" title="React" style={{ background: '#23272F' }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g fill="none" stroke="#61DAFB" strokeWidth="1">
                  <ellipse cx="12" cy="12" rx="11" ry="4.2" />
                  <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
                </g>
                <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
              </svg>
            </span>
            <span
              className="tile"
              role="listitem"
              title="TypeScript"
              style={{ background: '#3178C6' }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <text
                  x="12"
                  y="17"
                  textAnchor="middle"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontWeight="700"
                  fontSize="10"
                  fill="#fff"
                  letterSpacing="-0.5"
                >
                  TS
                </text>
              </svg>
            </span>
            <span className="tile" role="listitem" title="Vite" style={{ background: '#1E1B2E' }}>
              <svg viewBox="0 0 410 404" aria-hidden="true">
                <defs>
                  <linearGradient
                    id="viteA"
                    x1="6"
                    y1="33"
                    x2="235"
                    y2="344"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#41D1FF" />
                    <stop offset="1" stopColor="#BD34FE" />
                  </linearGradient>
                  <linearGradient
                    id="viteB"
                    x1="194"
                    y1="8"
                    x2="236"
                    y2="292"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFEA83" />
                    <stop offset=".083" stopColor="#FFDD35" />
                    <stop offset="1" stopColor="#FFA800" />
                  </linearGradient>
                </defs>
                <path
                  d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z"
                  fill="url(#viteA)"
                />
                <path
                  d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9233L279.014 102.452C275.347 103.159 272.227 99.7398 273.262 96.1457L298.731 7.66608C299.767 4.06956 296.642 0.649737 292.965 1.5744Z"
                  fill="url(#viteB)"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </div>
  )
}

Home.layout = [MarketingLayout]
