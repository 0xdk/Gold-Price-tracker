const { config } = require('dotenv');
config();
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Performs web scraping to extract gold prices from a specified website.
 * The function sends an HTTP GET request to the target website, retrieves the HTML content,
 * and utilizes Cheerio for parsing and extracting relevant information.
 *
 * @returns {Array} An array containing gold prices extracted from the website.
 * @throws {Error} If an error occurs during the web scraping process, it is logged and the error message is printed.
 */

// Function to perform web scraping
const chennaiGoldPrice = async () => {
  try {
    const url = process.env.SITE_URL;

    // Sends an HTTP GET request to the target website
    const response = await axios.get(url);

    // Load the HTML content of the web page using Cheerio
    const $ = cheerio.load(response.data);

    let prices = [];
    // Iterate over 'font' elements in the HTML and extract text content
    $('font').each((index, element) => {
      let data = $(element).text();
      prices.push(data);
    });

    // Take the first five elements from the extracted data
    const firstFiveElements = prices.slice(3, 7);

    // Convert strings to numbers, removing commas from the formatted numbers
    const goldPriceArray = firstFiveElements.map((value) =>
      parseFloat(value.replace(/,/g, ''))
    );

    return goldPriceArray;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// chennaiGoldPrice();

const goldPriceScraping = {
  chennaiGoldPrice,
};

module.exports = goldPriceScraping;
