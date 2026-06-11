import { useEffect, useRef, useState } from 'react'
import './index.css'

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.886L4 10.8l5.886 1.912L12 21l1.912-5.886L20 13.2l-5.886-1.912Z"/>
      </svg>
    ),
    title: 'Brand Identity',
    desc: 'Creating luxury, enduring logos, intentional color landscapes, visual architectures, and direct creative guidelines that capture internal message purity.',
    items: ['Creative Direction', 'Visual Identity Systems', 'Premium Logo Design', 'Editorial Typography Guidelines'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2"/>
        <line x1="8" x2="16" y1="21" y2="21"/>
        <line x1="12" x2="12" y1="17" y2="21"/>
      </svg>
    ),
    title: 'Web Design',
    desc: 'Constructing highly customizable, high-converting websites that perform beautifully at the scale of modern digital excellence. Designed for impact.',
    items: ['Bespoke Landing Pages', 'Cinematic UI/UX Design', 'Responsive Experiences', 'High-Conversion Optimization'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    title: 'Media & Music',
    desc: 'Creating soulful audio soundtracks, detailed gospel productions, and stunning cinematic video formats that move human emotions with divine purpose.',
    items: ['Modern Music Production', 'Cinematic Videography', 'Ministry Media Content', 'Inspirational Campaigns'],
  },
]

const portfolio = [
  { id: 1, cat: 'music',    title: 'Kingdom Sound',         subtitle: 'Music Production',    desc: 'An archival deep-rhythm gospel album crafted for ultimate healing atmosphere and high-end acoustic space.', cta: 'Listen on Audiomack', bg: '/images/portfolio-1.jpg', link: 'https://audiomack.com/ad-prince-1' },
  { id: 2, cat: 'web',      title: 'Grace Culture',         subtitle: 'Web Platform',        desc: 'A custom bespoke virtual parish built with deep accessibility, immersive media channels, and pristine minimalist UX.', cta: 'Explore Site Design', bg: '/images/background.jpg', link: '' },
  { id: 3, cat: 'branding', title: 'Elevation Conference',  subtitle: 'Brand Campaign',      desc: 'Complete dynamic branding visual stack with responsive typography layers, motion graphics, and large format prints.', cta: 'View Identity Stack', bg: '', link: '' },
  { id: 4, cat: 'web',      title: 'True Salvation Chapel', subtitle: 'Web Design',          desc: 'A pristine virtual monument pairing sacred architecture geometries with fluid, fast-loading cloud infrastructure.', cta: 'Explore Architecture', bg: '', link: '' },
  { id: 5, cat: 'creative', title: 'Mefiri Ghana',          subtitle: 'Cinematic Film',      desc: 'An archival cultural film visual campaign highlighting Ghanaian artistry, spiritual mission identity, and rich history.', cta: 'Watch Visual Campaign', bg: '', link: 'https://www.youtube.com/@revadprince/videos' },
  { id: 6, cat: 'creative', title: 'Beyond Entertainment',  subtitle: 'Creative Brand Hub',  desc: 'A massive creative branding concept demonstrating the harmony of divine inspiration and elite technical performance.', cta: 'View Full Showcase', bg: '', link: 'https://www.youtube.com/@revadprince/releases' },
]

const testimonials = [
  { quote: '"Heaven Minded Studios didn\'t just design a website — they translated our spiritual vision into a digital temple. The elegance and technical speed are pure excellence."', name: 'Pastor David Kofi', role: 'Founding Elder • Grace Culture' },
  { quote: '"Finding a producer who understands both spiritual depth and elite chart-topping music production is extremely rare. AD Prince is that visionary."', name: 'Sarah Mensah', role: 'Gospel Recording Artist • Soul Sound Records' },
  { quote: '"The cinematic visual identity built for our ministry media launch changed the way people connect with our message. Complete game changer."', name: 'Caleb Evans', role: 'Digital Outreach Director • Salvation Digital' },
]

const filters = ['all', 'branding', 'web', 'music', 'creative']

// ─── STAR CANVAS ─────────────────────────────────────────────────────────────

function useStarCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize, { passive: true })
    resize()

    class Star {
      x: number; y: number; size: number
      speedX: number; speedY: number
      opacity: number; isGold: boolean
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.8 + 0.2
        this.speedX = Math.random() * 0.12 - 0.06
        this.speedY = Math.random() * -0.2 - 0.02
        this.opacity = Math.random() * 0.7 + 0.1
        this.isGold = Math.random() > 0.82
      }
      update() {
        this.x += this.speedX; this.y += this.speedY
        if (this.y < 0) this.y = canvas.height
        if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.isGold ? '#C9A84C' : '#FFFFFF'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const count = Math.min(Math.floor(window.innerWidth / 7), 160)
    const stars = Array.from({ length: count }, () => new Star())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => { s.update(); s.draw() })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [canvasRef])
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }),
      { threshold: 0.14 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────

function useStatCounter(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let triggered = false
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true
        el.querySelectorAll<HTMLElement>('[data-target]').forEach(holder => {
          const target = parseInt(holder.dataset.target!, 10)
          const isPercent = target === 100
          let curr = 0
          const speed = Math.max(1, target / 40)
          const tick = () => {
            curr = Math.min(curr + Math.ceil(speed), target)
            holder.textContent = curr + (isPercent ? '%' : '+')
            if (curr < target) setTimeout(tick, 25)
          }
          tick()
        })
      }
    }, { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statsRef  = useRef<HTMLDivElement>(null)
  const glow1Ref  = useRef<HTMLDivElement>(null)
  const glow2Ref  = useRef<HTMLDivElement>(null)

  const [navScrolled,   setNavScrolled]   = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [activeFilter,  setActiveFilter]  = useState('all')
  const [slideIndex,    setSlideIndex]    = useState(0)
  const [formSent,      setFormSent]      = useState(false)
  const [errors,        setErrors]        = useState<Record<string,string>>({})

  const nameRef    = useRef<HTMLInputElement>(null)
  const emailRef   = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  useStarCanvas(canvasRef as React.RefObject<HTMLCanvasElement>)
  useReveal()
  useStatCounter(statsRef as React.RefObject<HTMLDivElement>)

  // Sticky nav
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hero parallax glow
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 45
      const y = (e.clientY / window.innerHeight - 0.5) * 45
      if (glow1Ref.current) glow1Ref.current.style.transform = `translate(${x}px,${y}px)`
      if (glow2Ref.current) glow2Ref.current.style.transform = `translate(${-x}px,${-y}px)`
    }
    hero.addEventListener('mousemove', move as EventListener)
    return () => hero.removeEventListener('mousemove', move as EventListener)
  }, [])

  // Carousel autoplay
  useEffect(() => {
    const id = setInterval(() => setSlideIndex(i => (i + 1) % testimonials.length), 6000)
    return () => clearInterval(id)
  }, [])

  // Close mobile menu on nav link click
  const closeMenu = () => setMobileOpen(false)

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string,string> = {}
    if (!nameRef.current?.value.trim())    errs.name    = 'Please write your name.'
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRef.current?.value.trim() || !emailRx.test(emailRef.current.value))
      errs.email   = 'Please enter a valid email.'
    if (!messageRef.current?.value.trim() || messageRef.current.value.trim().length < 10)
      errs.message = 'Please describe your project vision.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const name    = nameRef.current?.value.trim() || ""
      const email   = emailRef.current?.value.trim() || ""
      const type    = (document.getElementById("project-type") as HTMLSelectElement)?.value || ""
      const budget  = (document.getElementById("project-budget") as HTMLSelectElement)?.value || ""
      const message = messageRef.current?.value.trim() || ""
      const subject = encodeURIComponent(`New Project Inquiry from ${name}`)
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${type}\nBudget: ${budget}\n\nVision:\n${message}`)
      window.location.href = "mailto:heavenmindedstudios@gmail.com?subject=" + subject + "&body=" + body
      setFormSent(true)
    }
  }

  const filtered = portfolio.filter(p => activeFilter === 'all' || p.cat === activeFilter)

  return (
    <>
      {/* ── NAVBAR ── */}
      <header className={`navbar ${navScrolled ? 'scrolled' : ''}`} role="banner">
        <div className="nav-inner">
          <a href="#hero" className="logo-wrap" aria-label="Heaven Minded Studios home">
            <img
              src="/images/logo.png"
              alt="Heaven Minded Studios"
              style={{ width: 52, height: 52, objectFit: 'contain', flexShrink: 0 }}
              onError={e => {
                const el = e.target as HTMLImageElement
                el.style.display = 'none'
                const fallback = el.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            {/* Fallback icon shown only if logo.png fails */}
            <div className="logo-icon" style={{ display: 'none' }}>
              <svg className="w-6 h-6" style={{ width: 24, height: 24, color: '#C9A84C' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-name">Heaven Minded</span>
              <span className="logo-sub">Studios</span>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {['hero','services','portfolio','about','testimonials','contact'].map(id => (
              <a key={id} href={`#${id}`} style={{ textTransform: 'capitalize' }}>{id}</a>
            ))}
          </nav>

          <a href="#contact" className="btn-cta" style={{ display: 'none' }} aria-hidden />
          <a href="#contact" className="btn-cta" style={{ display: 'block' }}>Start a Project</a>

          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {['hero','services','portfolio','about','testimonials','contact'].map(id => (
          <a key={id} href={`#${id}`} onClick={closeMenu} style={{ textTransform: 'capitalize' }}>{id}</a>
        ))}
        <a href="#contact" className="btn-cta" onClick={closeMenu}>Start a Project</a>
      </div>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="hero-bg-img" role="img" aria-label="Cinematic studio background" />
        <canvas ref={canvasRef} id="stars-canvas" aria-hidden="true" />
        <div ref={glow1Ref} className="hero-glow-1" />
        <div ref={glow2Ref} className="hero-glow-2" />

        <div className="hero-content">
          <p className="hero-badge">
            <span className="hero-badge-dot" />
            Currently Accepting New Projects &amp; Collaborations
          </p>
          <h1 className="hero-h1 font-serif text-glow">
            Where Vision Meets <em className="text-gold">Purpose.</em>
          </h1>
          <p className="hero-sub font-sans">
            We craft majestic cinematic brands, deep structural music, soulful visuals, and elite digital experiences designed to inspire, transform, and leave eternal impact.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Start a Project</a>
            <a href="#portfolio" className="btn-ghost">View Our Work</a>
          </div>
        </div>

        <a href="#services" className="scroll-indicator" aria-label="Scroll to Services">
          <span>Discover</span>
          <div className="scroll-box"><div className="scroll-dot" /></div>
        </a>
      </section>

      <div className="gold-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="section-services">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="eyebrow">What We Create</span>
            <h2 className="section-h2 dark font-serif">We blend artistry with intentional design.</h2>
            <p className="section-sub font-sans" style={{ color: 'rgba(10,14,26,0.75)' }}>
              Heaven Minded Studios pairs elite world-class execution with deep spiritual depth — structuring beautiful visual, rhythmic, and conceptual transformations.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <article key={i} className="service-card reveal">
                <div>
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="service-h3 font-serif">{s.title}</h3>
                  <p className="service-p font-sans">{s.desc}</p>
                  <ul className="service-list font-sans">
                    {s.items.map((item, j) => <li key={j}><span>✦</span>{item}</li>)}
                  </ul>
                </div>
                <a href="#contact" className="service-link font-serif">
                  Learn More <span className="arrow">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider-cream" />

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="section-portfolio">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="eyebrow">Our Work Speaks</span>
            <h2 className="section-h2 light font-serif text-glow">Crafted for Eternal Impact</h2>
            <p className="section-sub font-sans" style={{ color: 'rgba(245,240,232,0.7)' }}>
              Explore our curated masterpieces. Each piece encapsulates intentional story design, high-caliber visual composition, and premium elegance.
            </p>
          </div>

          <div className="filter-row reveal">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'all' ? 'All Work' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filtered.map(p => (
              <div
                key={p.id}
                className="portfolio-item"
                onClick={() => p.link && window.open(p.link, '_blank', 'noopener,noreferrer')}
                style={{ cursor: p.link ? 'pointer' : 'default' }}
              >
                {p.bg
                  ? <div className="item-bg" style={{ backgroundImage: `url('${p.bg}')` }} role="img" aria-label={`${p.title} project thumbnail`} />
                  : <div className="item-fallback" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1">
                        <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                      </svg>
                    </div>
                }
                <div className="item-gradient" />
                <div className="item-content">
                  <span className="item-cat font-sans">{p.subtitle}</span>
                  <h3 className="item-title font-serif">{p.title}</h3>
                  <p className="item-desc font-sans">{p.desc}</p>
                  <div className="item-cta font-sans">{p.cta} →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── ABOUT ── */}
      <section id="about" className="section-about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-copy reveal">
              <span className="eyebrow">Our Source &amp; Purpose</span>
              <h2 className="about-h2 font-serif">
                Heaven Minded.<br /><em className="text-gold">Purpose Built.</em>
              </h2>
              <div className="about-body font-sans">
                <p>
                  Heaven Minded Studios was founded on the radical belief that creative excellence should serve a higher divine destiny. Through elite levels of music, cinematic films, visual branding, and web structures, we deploy experiences that actively inspire real faith, restoration, and hope in the modern digital landscape.
                </p>
                <p>
                  Led by <strong>AD Prince</strong>, a visionary musician, missionary, filmmaker, and creative director originally from Ghana, the studio serves global platforms — merging rich West African artistic depth with immaculate, responsive digital performance frameworks.
                </p>
                <p className="about-quote">
                  "This is not simply a creative agency. It is an active global artistic movement where absolute craftsmanship is married to divine intentionality."
                </p>
              </div>
              <a href="#contact" className="btn-dark">Book a Consultation</a>
            </div>

            <div className="about-frame-wrap reveal">
              <div className="frame-glow" />
              <div className="editorial-frame">
                <div className="frame-bar">
                  <span>AD Prince — Visionary</span>
                  <span>✦ ✦</span>
                </div>
                <div
                  className="founder-photo"
                  role="img"
                  aria-label="AD Prince, founder of Heaven Minded Studios"
                >
                  <div
                    className="founder-fallback"
                    id="founder-fallback"
                    style={{ display: 'none' }}
                  >
                    <p className="founder-fallback-quote font-serif">
                      "Beyond entertainment,<br /><em className="text-gold">we inspire growth.</em>"
                    </p>
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="50" cy="50" r="40" strokeDasharray="2,6"/>
                      <circle cx="50" cy="50" r="28"/>
                      <line x1="10" y1="50" x2="90" y2="50"/>
                      <line x1="50" y1="10" x2="50" y2="90"/>
                      <polygon points="50,22 65,50 50,78 35,50"/>
                      <circle cx="50" cy="36" r="4" fill="currentColor"/>
                      <circle cx="50" cy="64" r="4" fill="currentColor"/>
                      <circle cx="36" cy="50" r="4" fill="currentColor"/>
                      <circle cx="64" cy="50" r="4" fill="currentColor"/>
                    </svg>
                    <p>Ghana • Mission • Excellence</p>
                  </div>
                </div>
                <div className="frame-footer">
                  <span>Heaven Minded Studios</span>
                  <span>Est. 2022</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={statsRef} className="stats-row">
            {[{ target: 50, label: 'Successful Creative Projects' }, { target: 3, label: 'Years Active & Building' }, { target: 100, label: 'Percent Purpose Driven' }].map((s, i) => (
              <div key={i} className="reveal">
                <span className="stat-num font-serif" data-target={s.target}>0</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="section-testimonials">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="eyebrow">Voices of Impact</span>
            <h2 className="section-h2 light font-serif text-glow">Endorsement of Excellence</h2>
            <p className="section-sub font-sans" style={{ color: 'rgba(245,240,232,0.7)' }}>
              Stories of transformation and pristine execution from leadership, musical, and non-profit industries.
            </p>
          </div>

          <div className="testimonial-carousel">
            <div className="testimonial-track">
              {testimonials.map((t, i) => (
                <blockquote key={i} className={`testimonial-slide ${i !== slideIndex ? 'hidden' : ''}`}>
                  <div className="stars" aria-label="5 stars">★★★★★</div>
                  <p className="testimonial-quote font-serif">{t.quote}</p>
                  <cite style={{ fontStyle: 'normal' }}>
                    <span className="testimonial-author font-sans">{t.name}</span>
                    <span className="testimonial-role font-sans">{t.role}</span>
                  </cite>
                </blockquote>
              ))}
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => setSlideIndex(i => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">←</button>
              <div className="carousel-dots">
                {testimonials.map((_, i) => (
                  <button key={i} className={`carousel-dot ${i === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(i)} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
              <button className="carousel-btn" onClick={() => setSlideIndex(i => (i + 1) % testimonials.length)} aria-label="Next testimonial">→</button>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── CTA BANNER ── */}
      <section className="section-cta">
        <div className="cta-bg-img" role="img" aria-label="Studio background texture" />
        <div className="cta-grid-overlay" aria-hidden="true" />
        <div className="cta-inner reveal">
          <span className="cta-tag font-sans">The Calling</span>
          <h2 className="cta-h2 font-serif">Ready to Build Something that Lasts?</h2>
          <p className="cta-sub font-sans">Let's collaborate to create something truly meaningful, timeless, and purpose-driven that speaks with artistic excellence.</p>
          <a href="#contact" className="btn-dark-cta font-sans">Book a Free Consultation</a>
        </div>
      </section>

      <div className="gold-divider-cream" />

      {/* ── CONTACT ── */}
      <section id="contact" className="section-contact">
        <div className="section-inner">
          <div className="contact-grid">
            <div className="reveal">
              <span className="eyebrow">Let's Connect</span>
              <h2 className="contact-h2 font-serif text-glow">Tell Us About Your Vision</h2>
              <p className="contact-sub font-sans">Fill in the details below. Our executive design directors will review and reach out within 24 hours.</p>

              {!formSent ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-space">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="client-name">Your Name *</label>
                        <input ref={nameRef} id="client-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`} placeholder="AD Prince Ghana" />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="client-email">Email Address *</label>
                        <input ref={emailRef} id="client-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="name@domain.com" />
                        {errors.email && <span className="form-error">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="project-type">Project Category</label>
                        <div className="form-select-wrap">
                          <select id="project-type" className="form-select">
                            <option>Brand Identity Mastery</option>
                            <option>Bespoke Web Platform</option>
                            <option>Cinematic Music Production</option>
                            <option>Creative Direction Consultancy</option>
                          </select>
                          <span className="form-select-arrow">▼</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="project-budget">Budget Scale (USD)</label>
                        <div className="form-select-wrap">
                          <select id="project-budget" className="form-select">
                            <option>$3,000 – $5,000</option>
                            <option>$5,000 – $10,000</option>
                            <option>$10,000 – $25,000+</option>
                            <option>Mission / Ministry Scale</option>
                          </select>
                          <span className="form-select-arrow">▼</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="client-message">Brief Story of Your Vision *</label>
                      <textarea ref={messageRef} id="client-message" className={`form-textarea ${errors.message ? 'error' : ''}`} rows={5} placeholder="Inspire us. What divine purpose does this project serve?" />
                      {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>

                    <button type="submit" className="btn-submit font-sans">
                      Send Message &amp; Book Consultation
                    </button>
                  </div>
                </form>
              ) : (
                <div className="form-success">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  <h3 className="font-serif">Message received. We'll be in touch shortly.</h3>
                  <p className="font-sans">Thank you for entrusting us with your vision. AD Prince and our lead creative directors look forward to connecting with you.</p>
                </div>
              )}
            </div>

            <div className="contact-info reveal">
              <div className="contact-info-block">
                <div>
                  <span className="contact-info-label">Direct Correspondence</span>
                  <p className="contact-info-name font-serif">Heaven Minded Studios HQ</p>
                  <a
                    href="https://wa.me/233205314701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-email font-sans"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <svg style={{ width: 18, height: 18, color: '#25D366', flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <a href="mailto:heavenmindedstudios@gmail.com" className="contact-info-email font-sans" style={{ marginTop: '0.5rem' }}>
                    heavenmindedstudios@gmail.com
                  </a>
                </div>
                <div>
                  <span className="contact-info-label">Fellowship Channels</span>
                  <div className="socials-grid">
                    {[
                      { emoji: '📷', label: 'Instagram', href: 'https://instagram.com/heavenmindedstudios' },
                      { emoji: '🎬', label: 'YouTube',   href: 'https://www.youtube.com/@HeavenMindedStudio' },
                      { emoji: '📘', label: 'Facebook',  href: 'https://web.facebook.com/profile.php?id=61575600745199' },
                      { emoji: '💬', label: 'WhatsApp',  href: 'https://wa.me/233205314701' },
                    ].map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link">
                        <span>{s.emoji}</span>
                        <span className="font-sans">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="contact-tagline">
                <span className="quote font-serif">"Inspired by Grace. Built in Excellence."</span>
                <span className="sub font-sans">Serving clients from Ghana to Europe, North America and across the globe.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/images/logo.png"
                alt="Heaven Minded Studios"
                style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span className="footer-logo-name font-serif">Heaven Minded</span>
              <span className="footer-logo-sub font-sans">Studios</span>
            </div>
            <p className="footer-tagline font-sans">"Beyond Entertainment — We Inspire."</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {['hero','services','portfolio','about','testimonials','contact'].map(id => (
              <a key={id} href={`#${id}`} style={{ textTransform: 'capitalize' }}>{id}</a>
            ))}
          </nav>

          <div className="footer-copy font-sans">
            <span>© {new Date().getFullYear()} Heaven Minded Studios.</span>
            <span className="flag">Designed with Divine Excellence 🇬🇭 ✦ 🇺🇸</span>
          </div>
        </div>
      </footer>
    </>
  )
}
