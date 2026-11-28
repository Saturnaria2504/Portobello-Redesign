import { FormEvent, useEffect, useState } from 'react'
import heroImage from './assets/portobello-hero.webp'
import logo from './assets/portobello-logo.png'

type MenuItem = {
  name: string
  description?: string
  price: string
}

const menu: Record<string, MenuItem[]> = {
  Antipasti: [
    { name: 'Burrata con prosciutto', description: 'Burrata, parmaham, cherrytomaat', price: '15,95' },
    { name: 'Carpaccio di carne', description: 'Ossenhaas, parmezaan, pijnboompitten, rucola', price: '15,95' },
    { name: 'Melanzane alla parmigiana', description: 'Aubergine, tomatensaus, parmezaan', price: '13,95' },
    { name: 'Scampi alla diavolo', description: 'Knoflook, licht pittige tomatensaus', price: '16,75' },
    { name: 'Antipasto Portobello', description: 'Een selectie Italiaanse vleeswaren', price: '19,50' },
  ],
  Pasta: [
    { name: 'Pasta dello chef', description: 'Ossenhaas, tomaat, room', price: '18,50' },
    { name: 'Ravioli ricotta e spinaci', description: 'Handgemaakt, salieboter', price: '19,95' },
    { name: 'Gnocchi alla sorrentina', description: 'Tomaat, mozzarella, basilicum', price: '19,95' },
    { name: 'Alla puttanesca', description: 'Tomaat, olijf, kappertjes, ansjovis', price: '16,95' },
    { name: 'Ai funghi porcini', description: 'Eekhoorntjesbrood, room, parmezaan', price: '17,95' },
  ],
  Pizza: [
    { name: 'Portobello', description: 'Champignons, paprika, artisjok, mortadella', price: '16,95' },
    { name: 'Burrata e crudo di Parma', description: 'Burrata, parmaham, basilicum', price: '17,95' },
    { name: 'Tartufo e funghi', description: 'Champignons, truffelsaus', price: '16,95' },
    { name: 'N’duja', description: 'Pittige Calabrese salami', price: '16,95' },
    { name: 'Marinara', description: 'Mosselen, garnalen, tonijn, inktvis', price: '18,50' },
  ],
  Secondi: [
    { name: 'Saltimbocca alla romana', description: 'Kalfsschnitzel, parmaham, salie, witte wijn', price: '27,50' },
    { name: 'Filetto ai due pepi', description: 'Ossenhaas, room, twee soorten peper', price: '31,95' },
    { name: 'Bistecca alla griglia', description: 'Gegrilde steak, rozemarijn', price: '27,50' },
    { name: 'Scampi alla griglia', description: 'Gegrilde scampi, citroen, peterselie', price: '27,50' },
    { name: 'Vis van de dag', description: 'Vraag uw ober naar de vangst van vandaag', price: 'dagprijs' },
  ],
}

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? 'arrow down' : 'arrow'} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  )
}

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setComplete(true)
  }

  return (
    <div className="modal-layer" onMouseDown={onClose}>
      <section
        className="reservation-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-heading"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose} aria-label="Sluiten">
          <span />
          <span />
        </button>
        {complete ? (
          <div className="confirmation">
            <span className="confirmation-mark">P</span>
            <p className="kicker">Grazie mille</p>
            <h2 id="reserve-heading">Zo zou het eruitzien.</h2>
            <p>
              Dit is een conceptontwerp, er is geen reservering verstuurd. Wilt u echt een tafel
              reserveren? Bel dan 078 614 60 50.
            </p>
            <button className="line-button dark" onClick={onClose}>
              Terug naar het ontwerp <Arrow />
            </button>
          </div>
        ) : (
          <>
            <p className="kicker">Een avond bij Portobello</p>
            <h2 id="reserve-heading">Reserveer uw tafel</h2>
            <p className="modal-copy">
              Dinsdag tot en met zondag vanaf 17:00 · Vriesestraat 39
              <span>Conceptontwerp: dit formulier verstuurt niets. Wilt u echt reserveren? Bel 078 614 60 50.</span>
            </p>
            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <label>
                  Datum
                  <input required type="date" name="date" />
                </label>
                <label>
                  Tijdstip
                  <select required defaultValue="">
                    <option value="" disabled>Kies een tijd</option>
                    {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Aantal personen
                <select required defaultValue="">
                  <option value="" disabled>Kies aantal</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((amount) => (
                    <option key={amount}>{amount} {amount === 1 ? 'persoon' : 'personen'}</option>
                  ))}
                  <option>8 of meer personen</option>
                </select>
              </label>
              <label>
                Naam
                <input required type="text" name="name" placeholder="Uw naam" />
              </label>
              <label>
                Telefoonnummer
                <input required type="tel" name="phone" placeholder="06 12 34 56 78" />
              </label>
              <button className="solid-button form-button" type="submit">
                Reservering aanvragen <Arrow />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [category, setCategory] = useState('Antipasti')
  const [fullMenuOpen, setFullMenuOpen] = useState(false)

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 40)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    if (!mobileMenu) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenu(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileMenu])

  const openReservation = () => {
    setMobileMenu(false)
    setReservationOpen(true)
  }

  return (
    <main>
      <div className="concept-bar" role="note">
        <span className="long">Conceptherontwerp · Geen officiële website van Ristorante Portobello</span>
        <span className="short">Conceptherontwerp · niet de officiële site</span>
      </div>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <a className="logo-link" href="#home" aria-label="Portobello home">
          <img src={logo} alt="Ristorante Pizzeria Portobello" />
        </a>
        <nav className={mobileMenu ? 'open' : ''} aria-label="Hoofdnavigatie">
          <a href="#over" onClick={() => setMobileMenu(false)}>Over ons</a>
          <a href="#menu" onClick={() => setMobileMenu(false)}>Menukaart</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
          <button className="nav-book" onClick={openReservation}>Reserveer</button>
        </nav>
        <button
          className={`menu-button ${mobileMenu ? 'active' : ''}`}
          onClick={() => setMobileMenu((value) => !value)}
          aria-label="Menu openen"
          aria-expanded={mobileMenu}
        >
          <span />
          <span />
        </button>
      </header>
      <section className="hero" id="home">
        <img className="hero-photo" src={heroImage} alt="Verse pizza in het warme interieur van Portobello" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="kicker light">Ristorante · Pizzeria · Dordrecht</p>
          <h1>
            Hier voelt Italië
            <br />
            <em>dichtbij.</em>
          </h1>
          <p className="hero-intro">
            Verse pizza uit de steenoven, handgemaakte pasta en een warm welkom van de eigenaren
            zelf. Al jaren een vertrouwd adres in het hart van Dordrecht.
          </p>
          <div className="hero-actions">
            <button className="solid-button ivory" onClick={openReservation}>
              Reserveer een tafel <Arrow />
            </button>
            <a className="line-button light" href="#menu">Bekijk de menukaart <Arrow down /></a>
          </div>
        </div>
        <div className="hero-footer">
          <span>Vriesestraat 39, Dordrecht</span>
          <span>Dinsdag tot en met zondag · vanaf 17:00</span>
        </div>
      </section>

      <section className="intro-section" id="over">
        <div className="section-number">01</div>
        <div className="intro-title">
          <p className="kicker">Benvenuti</p>
          <h2>Een stukje <em>Italië</em><br />in Dordrecht.</h2>
        </div>
        <div className="intro-copy">
          <p className="lead">
            Portobello is klein, sfeervol en al jarenlang een begrip in het centrum van Dordrecht.
          </p>
          <p>
            De eigenaren lopen iedere avond zelf langs de tafels om iedereen te begroeten.
            Verwacht verse pizza’s uit de steenoven, handgemaakte pasta en klassieke Italiaanse
            antipasti. En zoals het hoort: zodra u plaatsneemt staat er vers brood op tafel.
          </p>
          <blockquote className="owner-note">
            <span>De eigenaren aan tafel</span>
            <p>Iedere avond even een praatje met iedere gast.</p>
          </blockquote>
          <a className="line-button dark" href="#menu">Ontdek onze keuken <Arrow /></a>
        </div>
      </section>

      <section className="signature-section">
        <div className="signature-image">
          <img src={heroImage} alt="Pizza Portobello uit de steenoven" />
          <span className="image-label">Uit de steenoven</span>
        </div>
        <div className="signature-copy">
          <p className="kicker light">La specialità</p>
          <h2>Pizza met<br /><em>karakter.</em></h2>
          <p>
            Ruim vijftien variaties, stuk voor stuk vers belegd en gebakken op hoge temperatuur.
            Van de klassieke Margherita tot onze Portobello met champignons, paprika, artisjok en
            mortadella.
          </p>
          <div className="signature-note">
            <span>Onze favoriet</span>
            <strong>Pizza Portobello</strong>
            <i>€ 16,95</i>
          </div>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="menu-heading">
          <div>
            <p className="kicker">Uit onze keuken</p>
            <h2>De menukaart</h2>
          </div>
          <p>Italiaanse klassiekers, royaal geserveerd. Vraag ook naar onze dagspecials.</p>
        </div>
        <div className="menu-layout">
          <div className="menu-tabs" role="tablist" aria-label="Menucategorieën">
            {Object.keys(menu).map((name, index) => (
              <button
                key={name}
                className={category === name ? 'selected' : ''}
                onClick={() => setCategory(name)}
                role="tab"
                aria-selected={category === name}
              >
                <span>0{index + 1}</span>
                {name}
              </button>
            ))}
          </div>
          <div className="menu-list" role="tabpanel">
            <div className="menu-list-head">
              <h3>{category}</h3>
              <span>Prijs in euro</span>
            </div>
            {menu[category].map((item) => (
              <article className="menu-item" key={item.name}>
                <div>
                  <h4>{item.name}</h4>
                  {item.description && <p>{item.description}</p>}
                </div>
                <span>{item.price}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="menu-footer">
          <p className="allergen-note">Heeft u een allergie? Laat het ons weten bij uw reservering.</p>
          <button className="line-button dark" onClick={() => setFullMenuOpen((open) => !open)}>
            {fullMenuOpen ? 'Sluit volledig overzicht' : 'Bekijk alle categorieën'}
            <Arrow down={!fullMenuOpen} />
          </button>
        </div>
        {fullMenuOpen && (
          <div className="full-menu" aria-label="Volledige menukaart">
            {Object.entries(menu).map(([name, items], index) => (
              <section className="full-menu-category" key={name}>
                <div className="full-menu-title">
                  <span>0{index + 1}</span>
                  <h3>{name}</h3>
                </div>
                {items.map((item) => (
                  <article className="compact-menu-item" key={item.name}>
                    <div>
                      <h4>{item.name}</h4>
                      {item.description && <p>{item.description}</p>}
                    </div>
                    <span>{item.price}</span>
                  </article>
                ))}
              </section>
            ))}
          </div>
        )}
      </section>

      <section className="reserve-banner">
        <p className="kicker light">A tavola</p>
        <h2>De tafel staat<br /><em>voor u klaar.</em></h2>
        <button className="solid-button ivory" onClick={openReservation}>
          Online reserveren <Arrow />
        </button>
        <p className="reservation-help">
          Dit is een conceptontwerp: het reserveren hier is een demonstratie en verstuurt niets.
          Wilt u echt een tafel? Bel dan 078 614 60 50.
        </p>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-brand">
          <img src={logo} alt="Portobello" />
          <p>Een warm Italiaans welkom<br />in hartje Dordrecht.</p>
        </div>
        <div className="contact-details">
          <div>
            <span className="detail-title">Bezoek</span>
            <p>Vriesestraat 39<br />3311 NN Dordrecht</p>
            <a href="https://maps.google.com/?q=Vriesestraat+39+Dordrecht" target="_blank" rel="noreferrer">
              Routebeschrijving
            </a>
          </div>
          <div>
            <span className="detail-title">Openingstijden</span>
            <p>Dinsdag tot en met zondag<br />17:00 tot 22:00</p>
            <span>Maandag gesloten</span>
          </div>
          <div>
            <span className="detail-title">Contact</span>
            <a className="phone" href="tel:0786146050">078 614 60 50</a>
            <button onClick={openReservation}>Online reserveren</button>
          </div>
        </div>
      </section>

      <footer>
        <span>Conceptherontwerp door Alissia Reemeijer · niet de officiële website van Portobello</span>
        <span>Vriesestraat 39 · Dordrecht</span>
        <a href="#home">Naar boven ↑</a>
      </footer>

      {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}
    </main>
  )
}
