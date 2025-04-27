const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const open = require('open'); // Ensure this is correctly imported

const app = express();
const PORT = 3000; // Port number for the server

// Enable CORS
app.use(cors());

// Set up storage for uploaded files
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder); // Create 'uploads' folder if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage });

// Serve static files (e.g., your HTML file)
app.use(express.static(path.join(__dirname)));

// Handle file upload
app.post('/upload', upload.single('fileToUpload'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const uploadTime = new Date().toISOString(); // Get the current timestamp
  res.json({ 
    fileName: req.file.filename, 
    filePath: `/uploads/${req.file.filename}`, 
    uploadTime // Include the timestamp in the response
  });
});

// Serve uploaded files for download
app.get('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  if (fs.existsSync(filePath)) {
    res.download(filePath); // Trigger file download
  } else {
    res.status(404).send('File not found.');
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`) // Open the browser
    .then(() => console.log('Browser opened successfully.'))
    .catch(err => console.error('Failed to open browser:', err)); // Handle errors
});

// Listen for 'Q' key press to quit the server
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (key) => {
  if (key.toLowerCase() === 'q') {
    console.log('Shutting down the server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0); // Exit the process
    });
  }
});

