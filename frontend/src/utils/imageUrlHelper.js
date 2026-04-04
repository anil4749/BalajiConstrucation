/**
 * Image URL Helper - Converts Google Drive IDs to proxy URLs
 */

const API_BASE = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? 'https://balaji-api-guru.onrender.com'
    : 'http://localhost:5000'
);

/**
 * Extract Google Drive file ID from various URL formats
 * Supports formats:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/uc?id=FILE_ID&export=view
 * - 1LD1VDYTfffx2TQzyZgidvYy8ZpPP3WOJ (raw file ID)
 */
export const extractDriveFileId = (url) => {
  if (!url) return null;
  
  // If it's already a file ID (no slashes, looks like a Drive ID)
  if (/^[a-zA-Z0-9_-]{28,}$/.test(url)) {
    return url;
  }
  
  // Extract from /file/d/ID/view format
  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
  if (match1) return match1[1];
  
  // Extract from ?id=ID format
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) return match2[1];
  
  // Not a Google Drive URL
  return null;
};

/**
 * Convert image URL to proxy endpoint if it's from Google Drive
 * Otherwise return the original URL
 */
export const convertToProxyUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  // Check if it's a Google Drive URL
  const fileId = extractDriveFileId(imageUrl);
  
  if (fileId) {
    // Convert to proxy endpoint
    return `${API_BASE}/images/drive/${fileId}`;
  }
  
  // Return original URL for non-Drive images
  return imageUrl;
};

/**
 * Batch convert multiple image URLs
 */
export const convertImageArray = (imageArray) => {
  if (!Array.isArray(imageArray)) return imageArray;
  return imageArray.map(convertToProxyUrl).filter(Boolean);
};

/**
 * Helper to convert all image URLs in a project object
 */
export const convertProjectImageUrls = (project) => {
  if (!project) return project;
  
  return {
    ...project,
    image: convertToProxyUrl(project.image),
    planningPictures: convertImageArray(project.planningPictures),
    layoutImages: convertImageArray(project.layoutImages),
    beforeDevelopmentImages: convertImageArray(project.beforeDevelopmentImages),
    currentSiteImages: convertImageArray(project.currentSiteImages),
    completionRenderImages: convertImageArray(project.completionRenderImages),
    insideViewImages: convertImageArray(project.insideViewImages),
    outsideViewImages: convertImageArray(project.outsideViewImages),
  };
};
