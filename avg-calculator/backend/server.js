const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let windowState = [];

const urls = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand',
};

const ACCESS_TOKEN = 'DxczrCEajYHFgbvw'; 

app.use(cors());

function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / arr.length).toFixed(2));
}

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;

  if (!['p', 'f', 'e', 'r'].includes(type)) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  const prevState = [...windowState];
  let newNumbers = [];

  try {
    const response = await axios.get(urls[type], {
      timeout: 500,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    newNumbers = response.data.numbers || [];
  } catch (error) {
    return res.json({
      windowPrevState: prevState,
      windowCurrState: windowState,
      numbers: [],
      avg: calculateAverage(windowState),
    });
  }

  for (let num of newNumbers) {
    if (!windowState.includes(num)) {
      windowState.push(num);
      if (windowState.length > WINDOW_SIZE) {
        windowState.shift();
      }
    }
  }

  return res.json({
    windowPrevState: prevState,
    windowCurrState: windowState,
    numbers: newNumbers,
    avg: calculateAverage(windowState),
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
