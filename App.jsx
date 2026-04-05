import { useState, useEffect, useRef } from 'react'

const PASSWORD = 'mcjhome2026'

const apps = [
  {
    id: '01',
    name: 'Quiz Night',
    nameCn: '家庭问答夜',
    desc: 'AI-powered family trivia with real-time multiplayer.',
    url: 'https://quiz.mcjhome.space',
    domain: 'quiz.mcjhome.space',
    accent: '#7a6e5a',
  },
  {
    id: '02',
    name: 'Closet Compass',
    nameCn: '衣柜罗盘',
    desc: 'AI wardrobe tracking for the whole family.',
    url: 'https://closet.mcjhome.space',
    domain: 'closet.mcjhome.space',
    accent: '#5a6e7a',
  },
  {
    id: '03',
    name: 'Europe 2026',
    nameCn: '欧洲自驾',
    desc: 'Munich round-trip road trip. Aug 16 — 29.',
    url: 'https://trip.mcjhome.space',
    domain: 'trip.mcjhome.space',
    accent: '#5a7a65',
  },
]

function BlueprintBg() {
  return (
    <div className="blueprint-bg">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="currentColor" />
            <circle cx="52" cy="2" r="0.8" fill="currentColor" />
            <circle cx="2" cy="52" r="0.8" fill="currentColor" />
            <circle cx="52" cy="52" r="0.8" fill="currentColor" />
            <line x1="2" y1="2" x2="52" y2="2" stroke="currentColor" strokeWidth="0.2" />
            <line x1="2" y1="2" x2="2" y2="52" stroke="currentColor" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
      <div className="circle-deco c1" />
      <div className="circle-deco c2" />
      <div className="circle-deco c3" />
    </div>
  )
}

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 600)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === PASSWORD) {
      setUnlocking(true)
      sessionStorage.setItem('mcjhome_auth', '1')
      setTimeout(onUnlock, 800)
    } else {
      setError(true)
      setValue('')
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div className={`gate ${unlocking ? 'gate--unlocking' : ''}`}>
      <BlueprintBg />
      <div className="gate-content">
        <div className="gate-brand fade-in" style={{ animationDelay: '0.2s' }}>
          mcjhome.space
        </div>
        <h1 className="gate-title fade-in" style={{ animationDelay: '0.4s' }}>
          Welcome home.
        </h1>
        <p className="gate-sub fade-in" style={{ animationDelay: '0.6s' }}>
          Enter the family passphrase to continue.
        </p>
        <form onSubmit={handleSubmit} className="gate-form fade-in" style={{ animationDelay: '0.8s' }}>
          <div className={`gate-input-wrap ${error ? 'shake' : ''}`}>
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="passphrase"
              className="gate-input"
              autoComplete="off"
            />
            <div className={`gate-input-line ${error ? 'gate-input-line--error' : ''}`} />
          </div>
          <button type="submit" className="gate-btn">
            Enter
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        {error && <p className="gate-error fade-in">incorrect passphrase</p>}
      </div>
    </div>
  )
}

function AppCard({ app, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card fade-in"
      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-inner" style={hovered ? { borderColor: app.accent } : {}}>
        <div className="card-num">{app.id}</div>
        <div className="card-body">
          <h3 className="card-name">{app.name}</h3>
          <span className="card-name-cn">{app.nameCn}</span>
          <p className="card-desc">{app.desc}</p>
        </div>
        <div className="card-footer">
          <span className="card-dot" />
          <span className="card-domain">{app.domain}</span>
          <svg
            className="card-arrow"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translate(0,0)' : 'translate(-4px,4px)',
              transition: 'all 0.3s ease',
            }}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </a>
  )
}

function Portal() {
  return (
    <div className="portal">
      <BlueprintBg />
      <div className="portal-content">
        <header className="header fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="header-brand">mcjhome.space</div>
          <div className="header-tag">family digital hub</div>
        </header>

        <section className="hero">
          <div className="hero-label fade-in" style={{ animationDelay: '0.2s' }}>Home</div>
          <h1 className="hero-title fade-in" style={{ animationDelay: '0.35s' }}>
            A family workspace<br />built with vision.
          </h1>
          <p className="hero-sub fade-in" style={{ animationDelay: '0.5s' }}>
            Every app begins with understanding what a family needs.
          </p>
        </section>

        <section className="apps-section">
          <div className="apps-label fade-in" style={{ animationDelay: '0.2s' }}>Applications</div>
          <div className="apps-grid">
            {apps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
            <div className="card card-placeholder fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="card-inner card-inner--dashed">
                <div className="placeholder-content">
                  <span className="placeholder-plus">+</span>
                  <span className="placeholder-text">Next project</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="footer-left">
            <div className="footer-quote">
              Designed with Claude.<br />Built with Codex.
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-copy">&copy; 2026 mcjhome</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('mcjhome_auth') === '1'
  )

  if (!authed) {
    return (
      <>
        <Styles />
        <PasswordGate onUnlock={() => setAuthed(true)} />
      </>
    )
  }

  return (
    <>
      <Styles />
      <Portal />
    </>
  )
}

function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

      :root {
        --bg: #f0ede6;
        --text: #1a1a1a;
        --text-mid: #6b665c;
        --text-light: #a8a298;
        --text-faint: #c8c3b8;
        --border: #d8d3c8;
        --card-bg: rgba(250, 248, 243, 0.85);
        --serif: 'Cormorant Garamond', Georgia, serif;
        --sans: 'DM Sans', -apple-system, sans-serif;
      }

      html { font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      body { background: var(--bg); color: var(--text); font-family: var(--sans); overflow-x: hidden; }

      .blueprint-bg {
        position: fixed; inset: 0; z-index: 0; pointer-events: none;
        color: rgba(0,0,0,0.05);
      }
      .circle-deco {
        position: absolute; border-radius: 50%;
        border: 0.5px solid rgba(0,0,0,0.04);
      }
      .c1 { width: 420px; height: 420px; top: -100px; right: -80px; }
      .c2 { width: 280px; height: 280px; top: 20px; right: -10px; }
      .c3 { width: 520px; height: 520px; bottom: -140px; left: -120px; }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { opacity: 0; animation: fadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
      }
      .shake { animation: shake 0.4s ease; }

      /* ---- Gate ---- */
      .gate {
        min-height: 100vh; min-height: 100dvh;
        display: flex; align-items: center; justify-content: center;
        position: relative; overflow: hidden;
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      .gate--unlocking { opacity: 0; transform: scale(1.03); }
      .gate-content {
        position: relative; z-index: 1;
        text-align: center; padding: 2rem;
        max-width: 400px; width: 100%;
      }
      .gate-brand {
        font-family: var(--sans); font-size: 11px; letter-spacing: 3px;
        text-transform: uppercase; color: var(--text-light); margin-bottom: 3.5rem;
      }
      .gate-title {
        font-family: var(--serif); font-size: 46px; font-weight: 300;
        letter-spacing: -1px; color: var(--text); margin-bottom: 0.75rem;
        line-height: 1.08;
      }
      .gate-sub {
        font-size: 14px; color: var(--text-mid); margin-bottom: 3rem;
        font-weight: 300; letter-spacing: 0.3px;
      }
      .gate-form { display: flex; flex-direction: column; align-items: center; gap: 1.75rem; }
      .gate-input-wrap { position: relative; width: 100%; max-width: 260px; }
      .gate-input {
        width: 100%; background: transparent; border: none; outline: none;
        font-family: var(--sans); font-size: 15px; font-weight: 300;
        color: var(--text); padding: 12px 0; text-align: center;
        letter-spacing: 4px;
      }
      .gate-input::placeholder {
        color: var(--text-faint); letter-spacing: 3px; font-size: 13px;
      }
      .gate-input-line {
        position: absolute; bottom: 0; left: 50%; right: 50%;
        height: 0.5px; background: var(--text-light);
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .gate-input:focus ~ .gate-input-line { left: 0; right: 0; }
      .gate-input-line--error { background: #b5545e; left: 0 !important; right: 0 !important; }
      .gate-btn {
        font-family: var(--sans); font-size: 12px; font-weight: 400;
        letter-spacing: 2px; text-transform: uppercase;
        color: var(--text-mid); background: transparent;
        border: 0.5px solid var(--border); border-radius: 100px;
        padding: 11px 30px; cursor: pointer;
        display: inline-flex; align-items: center; gap: 8px;
        transition: all 0.3s ease;
      }
      .gate-btn:hover {
        color: var(--text); border-color: var(--text-light);
        background: rgba(0,0,0,0.02);
      }
      .gate-error {
        font-size: 12px; color: #b5545e; margin-top: 0.75rem;
        font-weight: 300; letter-spacing: 1px;
      }

      /* ---- Portal ---- */
      .portal { min-height: 100vh; min-height: 100dvh; position: relative; overflow: hidden; }
      .portal-content {
        position: relative; z-index: 1;
        max-width: 860px; margin: 0 auto;
        padding: 0 2.5rem;
      }

      .header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 2.25rem 0; border-bottom: 0.5px solid var(--border);
      }
      .header-brand {
        font-family: var(--sans); font-size: 11px; letter-spacing: 3px;
        text-transform: uppercase; color: var(--text-light);
      }
      .header-tag {
        font-family: var(--sans); font-size: 11px; color: var(--text-faint);
        letter-spacing: 0.5px;
      }

      .hero { padding: 5rem 0 3.5rem; border-bottom: 0.5px solid var(--border); }
      .hero-label {
        font-family: var(--sans); font-size: 11px; letter-spacing: 2px;
        text-transform: uppercase; color: var(--text-light); margin-bottom: 1.75rem;
      }
      .hero-title {
        font-family: var(--serif); font-size: 54px; font-weight: 300;
        line-height: 1.1; letter-spacing: -1.5px; color: var(--text);
        margin-bottom: 1.25rem;
      }
      .hero-sub {
        font-family: var(--serif); font-size: 19px; font-weight: 300;
        font-style: italic; color: var(--text-mid); letter-spacing: 0.2px;
      }

      .apps-section { padding: 3rem 0 1rem; }
      .apps-label {
        font-family: var(--sans); font-size: 11px; letter-spacing: 2px;
        text-transform: uppercase; color: var(--text-light); margin-bottom: 2rem;
      }
      .apps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

      .card { text-decoration: none; color: inherit; display: block; }
      .card-inner {
        background: var(--card-bg); backdrop-filter: blur(8px);
        border: 0.5px solid var(--border); border-radius: 10px;
        padding: 1.75rem; height: 100%;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: flex; flex-direction: column;
      }
      .card:hover .card-inner {
        background: rgba(250, 248, 243, 1);
        transform: translateY(-3px);
        box-shadow: 0 12px 40px rgba(0,0,0,0.045);
      }
      .card-num {
        font-family: var(--sans); font-size: 11px; letter-spacing: 2px;
        color: var(--text-faint); margin-bottom: 1.25rem;
      }
      .card-body { flex: 1; }
      .card-name {
        font-family: var(--serif); font-size: 27px; font-weight: 400;
        letter-spacing: -0.3px; margin-bottom: 2px; line-height: 1.15;
      }
      .card-name-cn {
        font-family: var(--sans); font-size: 13px; color: var(--text-light);
        display: block; margin-bottom: 0.75rem;
      }
      .card-desc {
        font-size: 13px; color: var(--text-mid); line-height: 1.6;
        font-weight: 300;
      }
      .card-footer {
        display: flex; align-items: center; gap: 6px;
        margin-top: 1.5rem; padding-top: 1rem;
        border-top: 0.5px solid var(--border);
      }
      .card-dot { width: 5px; height: 5px; border-radius: 50%; background: #6a9; flex-shrink: 0; }
      .card-domain { font-family: var(--sans); font-size: 11px; color: var(--text-faint); flex: 1; }
      .card-arrow { flex-shrink: 0; color: var(--text-mid); }

      .card-placeholder { cursor: default; }
      .card-inner--dashed {
        border-style: dashed; border-color: rgba(0,0,0,0.08);
        background: transparent; backdrop-filter: none;
        display: flex; align-items: center; justify-content: center;
        min-height: 180px;
      }
      .placeholder-content { text-align: center; }
      .placeholder-plus {
        display: block; font-family: var(--serif); font-size: 34px;
        color: var(--text-faint); line-height: 1; margin-bottom: 8px;
        font-weight: 300;
      }
      .placeholder-text {
        font-family: var(--sans); font-size: 11px; letter-spacing: 1.5px;
        text-transform: uppercase; color: var(--text-faint);
      }

      .footer {
        display: flex; justify-content: space-between; align-items: flex-end;
        padding: 3rem 0 2.5rem; border-top: 0.5px solid var(--border);
        margin-top: 1rem;
      }
      .footer-quote {
        font-family: var(--sans); font-size: 11px; color: var(--text-faint);
        line-height: 1.9; letter-spacing: 0.3px;
      }
      .footer-copy { font-family: var(--sans); font-size: 11px; color: var(--text-faint); }

      /* ---- Mobile ---- */
      @media (max-width: 640px) {
        .portal-content { padding: 0 1.25rem; }
        .hero { padding: 3.5rem 0 2.5rem; }
        .hero-title { font-size: 36px; letter-spacing: -0.8px; }
        .hero-sub { font-size: 16px; }
        .apps-grid { grid-template-columns: 1fr; gap: 12px; }
        .apps-section { padding: 2.5rem 0 1rem; }
        .card-name { font-size: 23px; }
        .card-inner { padding: 1.5rem; }
        .gate-title { font-size: 34px; }
        .gate-sub { margin-bottom: 2.5rem; }
        .c1 { width: 260px; height: 260px; top: -60px; right: -50px; }
        .c2 { width: 180px; height: 180px; top: 20px; right: -20px; }
        .c3 { width: 320px; height: 320px; bottom: -80px; left: -80px; }
        .header { padding: 1.5rem 0; }
        .footer { flex-direction: column; gap: 1rem; align-items: flex-start; }
      }
    `}</style>
  )
}
