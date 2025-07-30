#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const { exec } = require('child_process');

const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(__dirname));

// Auto-rebuild on file changes
const watcher = chokidar.watch([
    './assets/scss/**/*.scss',
    './assets/js/**/*.js',
    './templates/**/*.html'
], {
    ignored: ['node_modules', '.git', 'assets/dist'],
    persistent: true
});

let isBuilding = false;

watcher.on('change', (filePath) => {
    if (isBuilding) return;
    
    console.log(`File changed: ${filePath}`);
    isBuilding = true;
    
    exec('npm run buildDev', (error, stdout, stderr) => {
        if (error) {
            console.error(`Build error: ${error}`);
        } else {
            console.log('Build completed successfully');
        }
        isBuilding = false;
    });
});

// Auto-refresh endpoint
app.get('/api/check-updates', (req, res) => {
    const testFile = path.join(__dirname, 'test-dual-panel.html');
    try {
        const stats = fs.statSync(testFile);
        res.json({ lastModified: stats.mtime.toISOString() });
    } catch (err) {
        res.status(500).json({ error: 'Could not check file' });
    }
});

app.listen(PORT, () => {
    console.log(`Development server running at http://localhost:${PORT}`);
    console.log(`Test page: http://localhost:${PORT}/test-dual-panel.html`);
    console.log('Watching for file changes...');
});
