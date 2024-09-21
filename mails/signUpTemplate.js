// sign up mail template
function signUpEmailTemplate() {
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

module.exports = signUpEmailTemplate;
