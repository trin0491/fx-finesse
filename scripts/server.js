const express = require('express');
const app = express();

app.get('/api/user', (req, res) => {
  res.json({name: 'RogerRabbit'});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
