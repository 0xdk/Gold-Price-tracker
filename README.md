
# Gold Price Tracker


I Built this project for Myself and my Relatives who are into gold investments, this Project simplifies tracking **Daily Gold Prices**. It automates updates, and **Sends  Emails Everyday** with the latest info. 




## What's New


In this update, I have removed MongoDB from project for a faster and more efficient experience.
  
Without the database layer, the project benefits from quicker data retrieval, simplified code architecture, and reduced resource consumption.

Now, the gold price data is sent directly from the web-scraped data, eliminating the need for intermediate database storage. This approach not only speeds up data delivery but also simplifies the overall data flow.



## Roadmap

- Enhance user interaction with a client-side interface using HTML, CSS, and JavaScript.

-  integrating Mailjet templates for a professional email experience. 
## Tech Stack



**Server:** 

- Node.js
- Express
-  Mailjet
     - [Mailjet Docs](https://dev.mailjet.com/email/guides/?javascript)


## Note


This project currently focuses on sending gold price notifications for the city of **Chennai**. Due to the unavailability of a **Free API** for Indian gold prices, support for additional cities is limited. Future updates may include expanded city options based on availability of suitable data sources.
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

Access the application
```bash
  http://localhost:3000
```

To send Emails
```bash
  http://localhost:3000/send-mail
```

