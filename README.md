# Price-Predictor

Price-Predictor is a web application that predicts cryptocurrency prices and manages portfolios, combining frontend and backend functionalities to provide users with insights and recommendations. The application is built with a Next.js frontend and a Python backend, employing machine learning models to generate predictions based on historical cryptocurrency data.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time cryptocurrency price predictions
- User authentication and portfolio management
- Historical data storage and analysis
- Model training and prediction using ML models (LSTM, Random Forest, etc.)
- API integration for live data fetching
- Comprehensive testing for both client and server components

---

## Project Structure

```plaintext
   Price-Predictor
   ├── .venv # Virtual environment for server dependencies
   ├── client # Frontend application using Next.js
   │ ├── app # Contains the main application pages and components
   │ ├── components # Reusable UI components
   │ ├── pages # API endpoints for the Next.js server
   │ ├── prisma # Database schema and migrations
   │ ├── public # Static assets (images, videos, etc.)
   │ └── **tests** # Unit tests for the frontend
   ├── server # Backend application with ML models
   │ ├── data # Data files used in model training and predictions
   │ ├── models # Pre-trained models and scalers
   │ ├── src # Source files for data processing and model training
   │ └── test # Unit tests for backend functionality
   └── package-lock.json # Dependency lock file
```

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- Python 3.10+
- Prisma CLI (for database management)

### Installation

- **Clone the repository:**

````bash
git clone https://github.com/yourusername/price-predictor.git
cd price-predictor

## Client Setup

1. **Navigate to the client directory:**

   ```bash
   cd client

````

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**

   - Create .env and .env.local files based on the .env.example template and configure necessary variables.

4. **Run the client application:**
   ```bash
   npm run dev
   ```

## Server Setup

1. **Navigate to the server directory:**

   ```bash
   cd server

   ```

2. **Set up a virtual environment:**

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`

   ```

3. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt

   ```

4. **Configure environment variables:**

   - Edit the .env file with the necessary configurations for data sources, model paths, and any API keys.

5. **Run the server:**
   ```bash
   python src/predict.py  # Adjust as needed based on your server entry point
   ```

## Usage

1. **Start both the client and server as outlined in the setup instructions.**
2. **Access the client application via http://localhost:3000.**
3. **Use the authentication system to log in and create a portfolio.**
4. **Input your cryptocurrency of interest and observe predictions based on historical and real-time data.**

## Testing

### Client Testing

- **To run tests in the client directory, use:**
  ```bash
  npm run test
  ```

### Server Testing

- **To run tests in the server directory, use:**

  ```bash
  pytest

  ```

Ensure both client and server environments are set up properly to avoid issues during testing.

## Technologies Used

- Frontend: Next.js, TypeScript, Ant Design
- Backend: Python, Flask, Prisma
- Database: SQLite (with Prisma ORM)
- Machine Learning: Scikit-Learn, TensorFlow/Keras (for model building and predictions)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a new branch.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

---

Feel free to reach out if you have any questions or run into any issues.
