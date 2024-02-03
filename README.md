# Gold Price Tracker

I Built this project for myself and my relatives who are into gold investments, this Project simplifies tracking **Daily Gold Prices**. It automates updates, stores data in MongoDB, and **Sends Emails Everyday** with the latest info.

## Roadmap

- Enhance user interaction with a client-side interface using HTML, CSS, and JavaScript.

- integrating Mailjet templates for a professional email experience.

## Tech Stack

**Server:**

- Node.js
- Mongoose
- Node-cron
- Mailjet
  - [Mailjet Docs](https://dev.mailjet.com/email/guides/?javascript)

## Note

This project currently focuses on sending gold price notifications for the city of **Chennai**. Due to the unavailability of a **Free** API for Indian gold prices, support for additional cities is limited. Future updates may include expanded city options based on availability of suitable data sources.

## Run Locally

Clone the project

```bash
  git clone https://github.com/0xdk/Gold-Price-tracker
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
