const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'leads.json');

function readData() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all leads
app.get('/api/leads', (req, res) => {
  try {
    const data = readData();
    res.json(data.leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Get a single lead by ID
app.get('/api/leads/:id', (req, res) => {
  try {
    const data = readData();
    const lead = data.leads.find(l => l.id === parseInt(req.params.id));
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// Get a random unrated lead (or least rated)
app.get('/api/leads/random/next', (req, res) => {
  try {
    const data = readData();
    // Sort by number of ratings (ascending) to prioritize less-rated leads
    const sortedLeads = [...data.leads].sort((a, b) => a.ratings.length - b.ratings.length);
    // Get leads with the minimum number of ratings
    const minRatings = sortedLeads[0].ratings.length;
    const leastRatedLeads = sortedLeads.filter(l => l.ratings.length === minRatings);
    // Pick a random one from the least rated
    const randomLead = leastRatedLeads[Math.floor(Math.random() * leastRatedLeads.length)];
    res.json(randomLead);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random lead' });
  }
});

// Rate a lead
app.post('/api/leads/:id/rate', (req, res) => {
  try {
    const { rating } = req.body;
    const leadId = parseInt(req.params.id);

    if (!rating || rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10' });
    }

    const data = readData();
    const leadIndex = data.leads.findIndex(l => l.id === leadId);

    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Add the rating
    data.leads[leadIndex].ratings.push(rating);

    // Calculate new average
    const ratings = data.leads[leadIndex].ratings;
    const average = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    data.leads[leadIndex].averageRating = Math.round(average * 10) / 10;

    writeData(data);

    res.json({
      lead: data.leads[leadIndex],
      message: 'Rating submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// Get leaderboard (all leads sorted by average rating)
app.get('/api/leaderboard', (req, res) => {
  try {
    const data = readData();
    const leaderboard = data.leads
      .filter(l => l.averageRating !== null)
      .sort((a, b) => b.averageRating - a.averageRating)
      .map((lead, index) => ({
        rank: index + 1,
        ...lead
      }));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Reset all ratings (for testing)
app.post('/api/reset', (req, res) => {
  try {
    const data = readData();
    data.leads.forEach(lead => {
      lead.ratings = [];
      lead.averageRating = null;
    });
    writeData(data);
    res.json({ message: 'All ratings have been reset' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset ratings' });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Hot or Not Leads server running on http://localhost:${PORT}`);
});
