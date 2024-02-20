const { config } = require('dotenv');
config();
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * This function is to scrape data from a website.
 * It goes to the site mentioned in the 'SITE_URL' variable, scrap the data
 * and store it in an array and then returns it
 *
 */
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
    return data;
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

/**
 * function that groups the scraped text data into arrays.
 * @returns {Promise<Array<Array<string>>>} A promise that resolves to an array of arrays,
 * where each inner array contains a group of elements from the scraped data.
 */
async function groupIntoArrays() {
  try {
    const data = await scrapeData();

    // Define the array to store groups and the desired group size
    const arrayOfGroups = [];
    const groupSize = 5;

    // Remove the first three elements from the data
    const trimmedData = data.slice(3);

    // Consider the first fifty elements from the trimmed data
    const firstFiftyElements = trimmedData.slice(0, 50);

    // Loop through the first fifty elements and group them
    for (let i = 0; i < firstFiftyElements.length; i++) {
      // Check if the current index is a multiple of the group size
      if (i % groupSize === 0) {
        // If true, create a new array for the next group
        const currentGroup = [];
        arrayOfGroups.push(currentGroup);
      }

      // Add the current element to the last group in the array
      arrayOfGroups[arrayOfGroups.length - 1].push(firstFiftyElements[i]);
    }

    // Return the array of groups
    return arrayOfGroups;
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

module.exports = { groupIntoArrays };
