# Real Estate Property Backend System

A robust, production-grade RESTful API for property listings, user authentication, and lead management. Built with a professional Controller-Service-Model architecture for scalability, security, and clean code standards.

---

## 🚀 Live Demo

- **API Tester:** [https://spcl-infotech-internship-projects.onrender.com/tester](https://spcl-infotech-internship-projects.onrender.com/tester)
- **GitHub:** [Project Source Code](https://github.com/praveen-kumar-007/SPCL-Infotech-Internship-Projects/tree/master/real-estate-backend)

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, Bcryptjs
- **Middleware:** CORS, Morgan, Multer
- **Deployment:** Render

---

## 📦 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/praveen-kumar-007/SPCL-Infotech-Internship-Projects.git
   cd real-estate-backend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   ```
4. **Run the App:**
   ```bash
   # For Production
   npm start

   # For Development
   npm run dev
   ```

---

## 📍 API Documentation

### 1. Authentication
| Method | Endpoint              | Description                | Access         |
|--------|----------------------|----------------------------|----------------|
| POST   | /api/auth/register   | Register new user          | Public         |
| POST   | /api/auth/login      | Authenticate & get token   | Public         |

### 2. Properties
| Method | Endpoint                  | Description                  | Access             |
|--------|-------------------------- |------------------------------|--------------------|
| GET    | /api/properties           | Fetch all with search/filter | Public             |
| GET    | /api/properties/:id       | Get single property details  | Public             |
| POST   | /api/properties           | Create a listing             | Private (Token)    |
| PUT    | /api/properties/:id       | Update listing               | Private (Owner)    |
| DELETE | /api/properties/:id       | Delete listing               | Private (Owner)    |

### 3. Inquiries
| Method | Endpoint              | Description                  | Access             |
|--------|---------------------- |------------------------------|--------------------|
| POST   | /api/inquiries        | Send message to seller       | Private (Buyer)    |
| GET    | /api/inquiries        | View all inquiries           | Private (Auth)     |

---

## 🔍 Key Features

- **Secure Authentication:** JWT-based login/registration, password hashing (Bcrypt.js)
- **Property CRUD:** Full lifecycle management with strict ownership verification
- **Advanced Search:** Filter by keywords, city, type, price range (MongoDB $gte/$lte)
- **Inquiry System:** Buyers can send inquiries to sellers
- **Image Management:** Property image uploads via Multer
- **Interactive UI Tester:** Built-in dashboard at `/tester` for real-time API testing

---

## 📂 Project Structure

```
real-estate-backend/
├── src/
│   ├── config/         # Database connection logic
│   ├── controllers/    # Request handlers (Business Logic)
│   ├── models/         # Mongoose Schemas (User, Property, Inquiry)
│   ├── routes/         # API Endpoint definitions
│   ├── middlewares/    # Auth & Error handling
│   ├── utils/          # JWT & Upload helpers
│   ├── index.html      # Frontend Tester UI
│   └── server.js       # Main entry point
├── uploads/            # Local storage for images
└── package.json        # Project metadata & scripts
```

---

## 👨‍💻 Developer Information

- **Developer:** Praveen Kumar
- **Project Title:** Real Estate Property Backend System
- **Organization:** SPCL Infotech Internship

---

## 📬 Contact

For any queries or contributions, please open an issue or pull request on the [GitHub repository](https://github.com/praveen-kumar-007/SPCL-Infotech-Internship-Projects/tree/master/real-estate-backend).
