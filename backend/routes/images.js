const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Proxy endpoint for Google Drive images
 * GET /api/images/drive/:fileId
 * 
 * This endpoint proxies requests to Google Drive, bypassing ORB (Opaque Response Blocking) errors
 * that occur when loading Drive images directly from the frontend.
 * 
 * Example: GET /api/images/drive/1LD1VDYTfffx2TQzyZgidvYy8ZpPP3WOJ
 */

// Handle CORS preflight requests
router.options('/drive/:fileId', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Range');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(200);
});
router.get('/drive/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;

    // Validate file ID format (Google Drive file IDs are typically 28-30 chars, alphanumeric with dash/underscore)
    if (!fileId || !/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
      return res.status(400).json({ error: 'Invalid Google Drive file ID' });
    }

    const driveUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;

    // Fetch image from Google Drive with appropriate headers
    const response = await axios.get(driveUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      responseType: 'arraybuffer',
      timeout: 10000
    });

    // Set content type based on what Google Drive returns
    const contentType = response.headers['content-type'] || 'image/jpeg';
    
    // Set comprehensive CORS and cache headers for production
    res.set('Content-Type', contentType);
    res.set('Content-Length', response.data.length);
    res.set('Cache-Control', 'public, max-age=86400, immutable'); // Cache for 24 hours
    
    // CORS Headers - Allow cross-origin image access
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Range');
    res.set('Access-Control-Expose-Headers', 'Content-Length, Content-Type, Content-Range');
    res.set('Access-Control-Max-Age', '86400');
    
    // Security headers
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Timing-Allow-Origin', '*');
    
    // Prevent caching issues
    res.set('ETag', `"${Buffer.from(response.data).toString('base64').slice(0, 20)}"`);
    
    res.send(response.data);
  } catch (error) {
    console.error('❌ Error fetching Google Drive image:', {
      fileId: req.params.fileId,
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText
    });
    
    // Set CORS headers on error responses too
    res.set('Access-Control-Allow-Origin', '*');
    
    if (error.response?.status === 404) {
      return res.status(404).json({ 
        error: 'Image not found on Google Drive',
        fileId: req.params.fileId 
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ 
        error: 'Image request timeout',
        message: 'Google Drive image took too long to load'
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch image from Google Drive',
      fileId: req.params.fileId,
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
