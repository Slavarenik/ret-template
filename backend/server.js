const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.static('./assets/'));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
})

app.listen(PORT, () => console.log(`Server started at ${PORT}`));