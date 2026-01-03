const express = require('express');
const router = express.Router();
const { createUploader, validateFileContent, ALLOWED_FILES } = require('../middleware/upload');
const { protect, editor } = require('../middleware/authMiddleware'); // Admins/Editors allowed
const fs = require('fs');
const path = require('path');

const upload = createUploader('file');

// Helper function to recursively get files
const getFiles = (dir) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(getFiles(file));
        } else { 
            // Allow all valid file extensions from ALLOWED_FILES
            const ext = path.extname(file).toLowerCase().substring(1);
            if (ALLOWED_FILES.extensions.includes(ext)) {
                results.push({
                    path: file,
                    mtime: stat.mtime,
                    size: stat.size
                });
            }
        }
    });
    return results;
};

// @route POST /api/files/upload
router.post('/upload', protect, editor, upload.single('file'), async (req, res) => {
    try {
        console.log('[Files] Upload Request Received');
        if (!req.file) {
             return res.status(400).json({ message: 'No file uploaded' });
        }

        // Validate content
        const isValid = await validateFileContent(req.file.path, 'file');
        
        if (!isValid) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Invalid file content detected' });
        }

        const relativePath = req.file.path.replace(/\\\\/g, '/');
        const fileUrl = `/${relativePath}`;
        
        res.json({ 
            url: fileUrl,
            name: req.file.originalname,
            size: req.file.size
        });
    } catch (error) {
         if (req.file && fs.existsSync(req.file.path)) {
             fs.unlinkSync(req.file.path);
         }
         res.status(500).json({ message: error.message });
    }
});

// @route GET /api/files
router.get('/', protect, editor, (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        // We only want files or files/files? Safe360 separates them. 
        // upload.js puts files in uploads/files/...
        // getFiles(uploadsDir) gets everything.
        // Let's target uploads/files specificially if we only want documents?
        // Safe360 code targeted 'uploads' and filtered extensions.
        // So we do the same.
        const files = getFiles(uploadsDir);

        // Sort by modification time (newest first)
        files.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        const serverRoot = path.join(__dirname, '..') + path.sep;

        const fileData = files.map(file => {
             let relativePath = file.path.replace(serverRoot, '');
             relativePath = relativePath.replace(/\\\\/g, '/');
             
             // Ensure it starts with /
             const url = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

             return {
                url: url,
                name: path.basename(file.path),
                date: file.mtime,
                size: file.size,
                ext: path.extname(file.path).substring(1)
             };
        });

        res.json(fileData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving files' });
    }
});

module.exports = router;
