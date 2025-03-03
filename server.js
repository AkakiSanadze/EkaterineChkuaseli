const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Serve static files from the current directory
app.use(express.static('./'));

// Endpoint to list all images
app.get('/list-images', async (req, res) => {
    try {
        const files = await fs.readdir('images');
        const imageFiles = files.filter(file => 
            file.toLowerCase().endsWith('.jpg') || 
            file.toLowerCase().endsWith('.jpeg') || 
            file.toLowerCase().endsWith('.png')
        );
        
        const images = imageFiles.map(name => ({ name }));
        res.json(images);
    } catch (error) {
        console.error('Error reading images directory:', error);
        res.status(500).json({ error: 'Failed to read images directory' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 