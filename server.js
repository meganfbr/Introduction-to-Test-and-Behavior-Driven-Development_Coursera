const app = require('./src/app');
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running! Open your browser to http://localhost:${port}`);
});
