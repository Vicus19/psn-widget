const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Autorise les requêtes depuis Widgy
app.use(require('cors')());

// Endpoint pour récupérer les données PSN
app.get('/api/psn/:psn_id', async (req, res) => {
  try {
    const psnId = req.params.psn_id;
    const apiKey = 'ytRANQi9XCazRZ6NsTFYDP39wUAOsNIOnN2Dcp7yKPpb5iXCVXfdu8bzwVzGzyKT'; // Remplace par ta clé API PSNAWP
    const response = await axios.get(`https://api.psnawp.com/v1/user/${psnId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données PSN :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données PSN" });
  }
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
