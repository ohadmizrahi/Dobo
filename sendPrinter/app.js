// server.js

const express = require('express');
const app = express();
const printer = require('printer'); // Install 'printer' module using npm

app.post('/print', (req, res) => {
  // Assuming you receive the content to be printed in the request body
  const content = req.body.content;

  // Find the printer by name or other identifier
  const printerName = 'Your_Printer_Name';

  // Send print job to the printer
  printer.printDirect({
    data: content,
    printer: printerName,
    type: 'RAW',
    success: function (jobID) {
      console.log("Printed successfully with job ID:", jobID);
      res.send("Printed successfully!");
    },
    error: function (err) {
      console.error("Error occurred while printing:", err);
      res.status(500).send("Error occurred while printing");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
