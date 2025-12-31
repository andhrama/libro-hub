/**
 * Google Sheets API Integration Service
 * Fetches book details from a Google Sheet
 */

import { BookCatalog } from '@/entities';

// Configuration for Google Sheets API
const GOOGLE_SHEETS_API_KEY = 'AIzaSyDummyKeyForDevelopment123456789'; // Dummy API key
const SPREADSHEET_ID = 'dummy-spreadsheet-id-1234567890abcdef'; // Dummy Spreadsheet ID
const SHEET_NAME = 'Books'; // Sheet name containing book data
const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

/**
 * Fetch book details from Google Sheets
 * This is a dummy implementation that shows the integration point
 * 
 * INTEGRATION LINE: This is where the Google Sheets API call would be made
 * const response = await fetch(`${GOOGLE_SHEETS_API_URL}/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_SHEETS_API_KEY}`);
 */
export async function fetchBooksFromGoogleSheets(): Promise<BookCatalog[]> {
  try {
    // INTEGRATION POINT: Google Sheets API call
    // In production, this would fetch from: https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{SHEET_NAME}?key={API_KEY}
    const apiUrl = `${GOOGLE_SHEETS_API_URL}/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    console.log('Attempting to fetch from Google Sheets API:', apiUrl);
    
    // Dummy response for development
    // In production, this would be: const response = await fetch(apiUrl);
    const dummyResponse = {
      values: [
        ['Title', 'Author', 'Genre', 'Description', 'ISBN', 'Available', 'CoverImage'],
        ['The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'A classic American novel', '978-0743273565', 'true', 'https://example.com/gatsby.jpg'],
        ['To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'A gripping tale of racial injustice', '978-0061120084', 'true', 'https://example.com/mockingbird.jpg'],
      ]
    };

    // Parse the sheet data into BookCatalog format
    const books: BookCatalog[] = [];
    
    if (dummyResponse.values && dummyResponse.values.length > 1) {
      const headers = dummyResponse.values[0];
      
      for (let i = 1; i < dummyResponse.values.length; i++) {
        const row = dummyResponse.values[i];
        const book: BookCatalog = {
          _id: `book-${i}`,
          title: row[0] || '',
          author: row[1] || '',
          genre: row[2] || '',
          description: row[3] || '',
          isbn: row[4] || '',
          isAvailable: row[5]?.toLowerCase() === 'true',
          coverImage: row[6] || '',
        };
        books.push(book);
      }
    }

    return books;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

/**
 * Get a single book from Google Sheets by ID
 */
export async function getBookFromGoogleSheets(bookId: string): Promise<BookCatalog | null> {
  try {
    const books = await fetchBooksFromGoogleSheets();
    return books.find(book => book._id === bookId) || null;
  } catch (error) {
    console.error('Error fetching book from Google Sheets:', error);
    return null;
  }
}
