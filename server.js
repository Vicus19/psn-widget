const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Autorise les requêtes depuis Widgy
app.use(require('cors')());

// Endpoint pour récupérer les données PSN
app.get('/api/psn', async (req, res) => {
  try {
    const npssoToken = 'ytRANQi9XCazRZ6NsTFYDP39wUAOsNIOnN2Dcp7yKPpb5iXCVXfdu8bzwVzGzyKT'; // Remplace par ton token NPSSO
    const response = await axios.get('https://us-central1-playstation-api.cloudfunctions.net/psn', {
      headers: {
        'Cookie': `npsso=${npssoToken}`,
        'User-Agent': 'Mozilla/5.0 (PlayStation; PlayStation 5/6.00)'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données PSN :", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des données PSN", details: error.message });
  }
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
