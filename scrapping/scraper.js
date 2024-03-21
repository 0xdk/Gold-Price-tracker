const { config } = require('dotenv');
config();
const axios = require('axios');
const cheerio = require('cheerio');

//This function is to scrape data from a website.
async function scrapeData() {
  try {
    const url = process.env.SITE_URL;
    // Make a GET request to the URL
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Find all <td> elements
    const tdElements = $('td');
    let data = [];

    // Extract text content from each <td> and log it
    tdElements.each((index, element) => {
      const textContent = $(element).text().trim();
      data.push(textContent);
    });
    const firstFive = data.splice(3, 5);
    return firstFive;
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

module.exports = { scrapeData };
