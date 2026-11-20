import MarketingLayout from '~/layouts/marketing'

export default function ServerError() {
  return (
    <div className="home">
      <article className="prose-card">
        <div className="pc-top">
          <span className="pc-status mono tag" style={{ color: '#c0392b' }}>
            <span className="dot" /> 500
          </span>
        </div>
        <div className="pc-lead">
          <span>Something broke.</span>
          <em>The server hit an unexpected error.</em>
        </div>
        <p className="pc-para">
          Try again in a moment. If the problem persists, check the server logs for the underlying
          exception.
        </p>
      </article>
    </div>
  )
}

ServerError.layout = [MarketingLayout]
