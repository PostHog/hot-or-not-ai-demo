import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = 'http://localhost:3001/api'

function App() {
  const [currentLead, setCurrentLead] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [lastRating, setLastRating] = useState(null)
  const [view, setView] = useState('rate') // 'rate' or 'leaderboard'
  const [leaderboard, setLeaderboard] = useState([])
  const [totalRated, setTotalRated] = useState(0)

  const fetchRandomLead = async () => {
    setLoading(true)
    setShowResult(false)
    try {
      const res = await fetch(`${API_BASE}/leads/random/next`)
      const lead = await res.json()
      setCurrentLead(lead)
    } catch (error) {
      console.error('Failed to fetch lead:', error)
    }
    setLoading(false)
  }

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/leaderboard`)
      const data = await res.json()
      setLeaderboard(data)
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    }
  }

  const submitRating = async (rating) => {
    if (!currentLead) return

    try {
      const res = await fetch(`${API_BASE}/leads/${currentLead.id}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating })
      })
      const data = await res.json()
      setCurrentLead(data.lead)
      setLastRating(rating)
      setShowResult(true)
      setTotalRated(prev => prev + 1)
    } catch (error) {
      console.error('Failed to submit rating:', error)
    }
  }

  const skipLead = () => {
    fetchRandomLead()
  }

  const nextLead = () => {
    fetchRandomLead()
  }

  useEffect(() => {
    fetchRandomLead()
  }, [])

  useEffect(() => {
    if (view === 'leaderboard') {
      fetchLeaderboard()
    }
  }, [view])

  const getHotnessLabel = (rating) => {
    if (rating >= 9) return 'SMOKIN HOT!'
    if (rating >= 7) return 'Pretty Hot!'
    if (rating >= 5) return 'Lukewarm'
    if (rating >= 3) return 'Cold'
    return 'Ice Cold!'
  }

  const getHotnessClass = (rating) => {
    if (rating >= 9) return 'hot-smokin'
    if (rating >= 7) return 'hot-pretty'
    if (rating >= 5) return 'hot-lukewarm'
    if (rating >= 3) return 'hot-cold'
    return 'hot-ice'
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-inner">
          <h1>
            <span className="hot">HOT</span>
            <span className="or">or</span>
            <span className="not">NOT</span>
          </h1>
          <div className="subtitle">:: SaaS Leads Edition ::</div>
          <div className="tagline">* * * Rate Your Leads! * * *</div>
        </div>
      </div>

      <div className="nav-bar">
        <button
          className={`nav-btn ${view === 'rate' ? 'active' : ''}`}
          onClick={() => setView('rate')}
        >
          [Rate Leads]
        </button>
        <button
          className={`nav-btn ${view === 'leaderboard' ? 'active' : ''}`}
          onClick={() => { setView('leaderboard'); fetchLeaderboard(); }}
        >
          [Leaderboard]
        </button>
        <div className="counter">
          Leads Rated: <span className="counter-num">{totalRated}</span>
        </div>
      </div>

      <div className="main-content">
        {view === 'rate' ? (
          <div className="rating-section">
            {loading ? (
              <div className="loading-box">
                <div className="loading-text">Loading Lead...</div>
                <div className="loading-bar">
                  <div className="loading-fill"></div>
                </div>
              </div>
            ) : currentLead ? (
              <div className="lead-card">
                <div className="lead-card-header">
                  <div className="lead-badge">LEAD #{currentLead.id}</div>
                  <div className="industry-tag">{currentLead.industry}</div>
                </div>

                <div className="company-name">{currentLead.name}</div>

                <table className="lead-details">
                  <tbody>
                    <tr>
                      <td className="label">Contact:</td>
                      <td className="value">{currentLead.contact}</td>
                    </tr>
                    <tr>
                      <td className="label">Email:</td>
                      <td className="value">{currentLead.email}</td>
                    </tr>
                    <tr>
                      <td className="label">Phone:</td>
                      <td className="value">{currentLead.phone}</td>
                    </tr>
                    <tr>
                      <td className="label">Company Size:</td>
                      <td className="value">{currentLead.companySize}</td>
                    </tr>
                    <tr>
                      <td className="label">Interest:</td>
                      <td className="value interest">{currentLead.productInterest}</td>
                    </tr>
                  </tbody>
                </table>

                {!showResult ? (
                  <div className="rating-area">
                    <div className="rating-prompt">
                      How HOT is this lead?
                    </div>
                    <div className="rating-scale">
                      <span className="scale-label not-label">NOT &rarr;</span>
                      <div className="rating-buttons">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <button
                            key={num}
                            className={`rating-btn rating-${num}`}
                            onClick={() => submitRating(num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <span className="scale-label hot-label">&larr; HOT</span>
                    </div>
                    <button className="skip-btn" onClick={skipLead}>
                      &gt;&gt; SKIP THIS LEAD &lt;&lt;
                    </button>
                  </div>
                ) : (
                  <div className="result-area">
                    <div className="your-rating">
                      You rated: <span className="rating-value">{lastRating}</span>
                    </div>
                    <div className={`average-rating ${getHotnessClass(currentLead.averageRating)}`}>
                      <div className="avg-label">Average Rating:</div>
                      <div className="avg-value">{currentLead.averageRating}</div>
                      <div className="avg-votes">({currentLead.ratings.length} votes)</div>
                      <div className="hotness-label">{getHotnessLabel(currentLead.averageRating)}</div>
                    </div>
                    <button className="next-btn" onClick={nextLead}>
                      NEXT LEAD &rarr;&rarr;&rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="error-box">
                <p>Oops! Could not load lead.</p>
                <button onClick={fetchRandomLead}>Try Again</button>
              </div>
            )}
          </div>
        ) : (
          <div className="leaderboard-section">
            <div className="leaderboard-header">
              <h2>*** HOTTEST LEADS ***</h2>
              <p>Ranked by average hotness score</p>
            </div>
            {leaderboard.length === 0 ? (
              <div className="no-data">
                <p>No leads have been rated yet!</p>
                <button onClick={() => setView('rate')}>Start Rating &rarr;</button>
              </div>
            ) : (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Company</th>
                    <th>Interest</th>
                    <th>Avg Score</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((lead, index) => (
                    <tr key={lead.id} className={index < 3 ? `top-${index + 1}` : ''}>
                      <td className="rank">
                        {index === 0 && '#1'}
                        {index === 1 && '#2'}
                        {index === 2 && '#3'}
                        {index > 2 && `#${lead.rank}`}
                      </td>
                      <td className="company">{lead.name}</td>
                      <td className="interest">{lead.productInterest}</td>
                      <td className={`score ${getHotnessClass(lead.averageRating)}`}>
                        {lead.averageRating}
                      </td>
                      <td className="votes">{lead.ratings.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className="back-btn" onClick={() => setView('rate')}>
              &larr; Back to Rating
            </button>
          </div>
        )}
      </div>

      <div className="footer">
        <div className="footer-inner">
          <div className="marquee">
            <span>* * * Rate your SaaS leads! Is it HOT or NOT? * * * Find your hottest prospects! * * * Close more deals! * * *</span>
          </div>
          <div className="footer-links">
            <a href="#">Home</a> | <a href="#">About</a> | <a href="#">Contact</a> | <a href="#">Privacy</a>
          </div>
          <div className="copyright">
            &copy; 2002 Hot or Not Leads&trade; - Best viewed in Internet Explorer 6.0
          </div>
          <div className="visitor-counter">
            Visitors: <span className="visitor-num">004,892</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
