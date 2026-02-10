# BFHL API Server

A Node.js Express server that provides mathematical operations and AI-powered responses using Google Gemini API.

## Features

- **Health Check**: `/health` endpoint to verify server status
- **Mathematical Operations**:
  - Fibonacci sequence generation
  - Prime number filtering
  - HCF (Highest Common Factor) calculation
  - LCM (Lowest Common Multiple) calculation
- **AI Integration**: One-word answers using Google Gemini AI

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm
- Google Gemini API Key

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
4. Edit `.env` file and add your credentials:
   ```
   OFFICIAL_EMAIL=your_email@chitkara.edu.in
   GEMINI_API_KEY=your_actual_gemini_api_key
   ```

### Getting Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your `.env` file

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### GET /health

Returns server status and official email.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

### POST /bfhl

Accepts a JSON object with exactly one key and performs the corresponding operation.

**Request Examples:**

1. **Fibonacci:**
   ```json
   {
     "fibonacci": 10
   }
   ```

2. **Prime Numbers:**
   ```json
   {
     "prime": [2, 3, 4, 5, 6, 7, 8, 9, 10]
   }
   ```

3. **HCF:**
   ```json
   {
     "hcf": [12, 18, 24]
   }
   ```

4. **LCM:**
   ```json
   {
     "lcm": [4, 6, 8]
   }
   ```

5. **AI Query:**
   ```json
   {
     "AI": "What is the capital of France?"
   }
   ```

**Response Format:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [result_data]
}
```

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Create a new account on [Render](https://render.com)
3. Connect your GitHub repository
4. Set environment variables in Render dashboard:
   - `OFFICIAL_EMAIL`
   - `GEMINI_API_KEY`
   - `PORT` (Render sets this automatically)
5. Deploy!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables during deployment

## Testing

You can test the API using curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:3000/health

# Fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5}'

# Prime numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,3,4,5,6,7,8,9,10]}'
```

## Error Handling

- **400 Bad Request**: Invalid key or multiple keys provided
- **500 Internal Server Error**: Server error or API failure

All errors return a JSON response with `is_success: false` and an error message.
