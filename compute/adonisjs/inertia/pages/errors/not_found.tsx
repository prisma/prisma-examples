import MarketingLayout from '~/layouts/marketing'

export default function NotFound() {
  return (
    <div className="home">
      <article className="prose-card">
        <div className="pc-top">
          <span className="pc-status mono tag" style={{ color: 'var(--subtle)' }}>
            <span className="dot" /> 404
          </span>
        </div>
        <div className="pc-lead">
          <span>Not found.</span>
          <em>That route hasn&apos;t been built yet.</em>
        </div>
        <p className="pc-para">
          The page you tried to reach doesn&apos;t exist. Check the URL or head back home.
        </p>
      </article>
    </div>
  )
}

NotFound.layout = [MarketingLayout]
