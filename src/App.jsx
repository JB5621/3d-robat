import { useEffect, useState } from 'react'
import './App.css'

const features = [
  {
    number: '01',
    title: 'Learns your rhythm',
    text: 'An adaptive companion that gets better at the things you do every day.',
  },
  {
    number: '02',
    title: 'Moves with purpose',
    text: 'Thoughtful autonomy, designed to be useful without ever getting in your way.',
  },
  {
    number: '03',
    title: 'Feels like the future',
    text: 'A familiar presence with a curious mind and an unmistakable point of view.',
  },
]

const currentYear = new Date().getFullYear()

const marqueeWords = ['Curious', 'Capable', 'Built to move with you', 'Designed for the everyday']

const navLinks = [
  { href: '#story', label: 'Our story' },
  { href: '#features', label: 'Capabilities' },
  { href: '#waitlist', label: 'Early access' },
]

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Roba home">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span>roba</span>
    </a>
  )
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [joined, setJoined] = useState(false)
  useReveal()

  return (
    <div className="site">
      <div className="bg-grid" aria-hidden="true" />

      <header className="nav-wrap">
        <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
          <Brand />
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
          </div>
          <a className="nav-cta" href="#waitlist">Meet Roba</a>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="chip"><span className="pulse" /> The next kind of companion</p>
            <h1 id="hero-title">
              More human.
              <em>More alive.</em>
            </h1>
            <p className="hero-description">
              Roba is a new kind of robot for the rhythm of real life. Curious,
              capable, and built to move with you.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#waitlist">
                Join the waitlist <span aria-hidden="true">→</span>
              </a>
              <a className="button button-ghost" href="#story">Discover Roba</a>
            </div>
          </div>

          <div className="stage" aria-label="Interactive 3D model of Roba">
            <div className="stage-glow" aria-hidden="true" />
            <span className="corner tl" aria-hidden="true" />
            <span className="corner tr" aria-hidden="true" />
            <span className="corner bl" aria-hidden="true" />
            <span className="corner br" aria-hidden="true" />
            <div className="stage-hud top">
              <span>RB—01</span>
              <span className="live"><span className="pulse" /> Live model</span>
            </div>
            <spline-viewer
              url="https://prod.spline.design/vbOMy8wHGRAdJJDJ/scene.splinecode"
              loading-anim-type="spinner-small-light"
            />
            <div className="stage-hud bottom">
              <span>Interactive</span>
              <span>Drag to explore ⟲</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {marqueeWords.map((word) => (
                  <span key={word}>{word}<i>✦</i></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="manifesto container" id="story">
          <p className="kicker reveal">( A little more wonder )</p>
          <h2 className="reveal">
            Technology should feel like <em>a little magic.</em>
          </h2>
          <p className="manifesto-text reveal">
            We believe the best technology doesn’t ask you to change. It meets
            you where you are, makes space for what matters, and adds a little
            wonder to the ordinary.
          </p>
        </section>

        <section className="features container" id="features" aria-labelledby="features-title">
          <div className="section-head reveal">
            <p className="kicker">( Capabilities )</p>
            <h2 id="features-title">Built around <em>you.</em></h2>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <article
                className="feature-card reveal"
                key={feature.number}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="feature-top">
                  <span className="feature-number">{feature.number}</span>
                  <span className="feature-arrow" aria-hidden="true">↗</span>
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="waitlist container" id="waitlist">
          <div className="waitlist-card reveal">
            <div className="waitlist-glow" aria-hidden="true" />
            <div className="waitlist-copy">
              <p className="kicker">( Be part of what’s next )</p>
              <h2>Roba is almost <em>ready to meet you.</em></h2>
            </div>
            <form
              className="signup-form"
              onSubmit={(event) => {
                event.preventDefault()
                setJoined(true)
              }}
            >
              <label htmlFor="email">Get the first look</label>
              {joined ? (
                <p className="success" role="status">✓ You’re on the list. We’ll be in touch.</p>
              ) : (
                <div className="input-row">
                  <input id="email" type="email" placeholder="you@example.com" required />
                  <button type="submit">Join <span aria-hidden="true">→</span></button>
                </div>
              )}
              <p className="form-note">Be the first to know when Roba arrives.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <Brand />
        <p>Built for the beautifully human.</p>
        <span>© {currentYear} Roba Lab</span>
      </footer>
    </div>
  )
}

export default App
