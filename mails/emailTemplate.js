const GoldPriceModel = require('../database/schema');

async function getEmailConfig() {
  try {
    const data = await GoldPriceModel.find({});
    const latestData = data[data.length - 1];

    let htmlPart = `<h4>As of today, the market price for gold in Chennai is as follows:</4>

    
    <h3>Today's 1 Gram Gold Prices in Chennai for 24K & 22K</h3>
    <ul>
    <li>1 Gram of 24K Gold: <strong> ₹ ${latestData.priceArray[1]}</strong> (<span>${latestData.statusData.symbol}${latestData.statusData.change[1]})</span></li>
    <li>1 Gram of 22K Gold: <strong> ₹ ${latestData.priceArray[3]}</strong> (<span>${latestData.statusData.symbol}${latestData.statusData.change[0]})</span></li>
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
  }
}

// sign up mail template
async function signUpEmailTemplate() {
  try {
    let htmlPart = `<h3> Your signup to Gold Price Tracker was successful</h3>
    <p>We're thrilled to welcome you aboard.We will inform you about market fluctuations and up-to-date with the latest trends</p>
    <p>And, You will receive a <strong>email every day with the current day's gold price and the prices from the last ten days,</strong> </p>
    <p>Stay ahead of the curve with our daily gold price updates. Find more about Gold at <a href=\"https://goldpricetracker.cyclic.app/">Gold Price Tracker</a> and start making informed decisions today!</p>
    `;

    return {
      From: {
        Email: process.env.SENDER_EMAIL,
        Name: 'Gold Price Tracker',
      },
      TextPart: 'gold price',
      Subject: 'Welcome to Gold Price Tracker',
      HTMLPart: htmlPart,
    };
  } catch (err) {
    console.error('Error fetching gold price:', err);
  }
}

const emailTemplates = {
  getEmailConfig,
  signUpEmailTemplate,
};
module.exports = emailTemplates;
