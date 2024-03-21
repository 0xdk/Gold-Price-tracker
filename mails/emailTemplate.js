const GoldPriceModel = require('../database/schema');
const priceDifference = require('../utils/priceChange');

async function getEmailConfig() {
  try {
    const data = await GoldPriceModel.find({});
    const difference = priceDifference.getPriceChangeInfo(data);
    const latestData = data[data.length - 1];

    let htmlPart = `<h4>As of today, the market price for gold in Chennai is as follows:</4>

    
    <h3>Today's 1 Gram Gold Prices in Chennai for 24K & 22K</h3>
    <ul>
    <li>1 Gram of 24K Gold: <strong> ₹ ${latestData.priceArray[1]}</strong> (<span>${difference.symbol}${difference.change[1]})</span></li>
    <li>1 Gram of 22K Gold: <strong> ₹ ${latestData.priceArray[3]}</strong> (<span>${difference.symbol}${difference.change[0]})</span></li>
    </ul>
    
    <h3>Today's 8 Grams Gold Prices in Chennai for 24K & 22K</h3>
    <ul>
      <li>24K Gold:<strong> ₹ ${latestData.priceArray[2]}</strong> per 8 gram (One Pavan/Savaran)</li>
      <li>22K Gold:<strong> ₹ ${latestData.priceArray[4]}</strong> per 8 gram (One Pavan/Savaran)</li>
    </ul>
    
    <h3>Gold Rate in Chennai for Last 10 Days</h3>
    <table style="border-collapse: collapse; width: 100%; max-width: 800px;">
    <thead>
      <tr>
        <th rowspan="2" style="border: 1px solid black; padding: 8px; text-align: center;">Date</th>
        <th colspan="2" style="border: 1px solid black; padding: 8px; text-align: center;">24K</th>
        <th colspan="2" style="border: 1px solid black; padding: 8px; text-align: center;">22K</th>
      </tr>
      <tr>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">1 <span class="gram">Gram</span></th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">8 <span class="gram">Grams</span></th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">1 <span class="gram">Gram</span></th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">8 <span class="gram">Grams</span></th>
      </tr>
    </thead>
      <tbody>`;

    // Adding price data to the table with padding for rows
    for (let i = data.length - 1; i >= 0; i--) {
      htmlPart += `<tr><td style="border: 1px solid black; padding: 8px; text-align: center;">${data[i].priceArray[0]}</td>
      <td style="border: 1px solid black; padding: 8px; text-align: center;">${data[i].priceArray[1]}</td>
      <td style="border: 1px solid black; padding: 8px; text-align: center;">${data[i].priceArray[2]}</td>
      <td style="border: 1px solid black; padding: 8px; text-align: center;">${data[i].priceArray[3]}</td>
      <td style="border: 1px solid black; padding: 8px; text-align: center;">${data[i].priceArray[4]}</td>`;
    }

    // Closing the table
    htmlPart += `</tbody></table>`;

    return {
      From: {
        Email: process.env.SENDER_EMAIL,
        Name: 'Gold price tracker',
      },
      Subject: 'Check Today Gold Price in Chennai',
      HTMLPart: htmlPart,
    };
  } catch (error) {
    console.error('Error fetching gold price:', error);
    throw error;
  }
}

module.exports = getEmailConfig;
