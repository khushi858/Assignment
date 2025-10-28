# School Management System - Setup Instructions

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn package manager

## 🚀 Installation Steps

### 1. Create Next.js Project

```bash
npx create-next-app@latest school-management
cd school-management
```

When prompted, select:
- TypeScript: No
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: No (use Pages Router)
- Import alias: Yes (@/*)

### 2. Install Required Dependencies

```bash
npm install react-hook-form mysql2 formidable lucide-react
```

### 3. Setup MySQL Database

Open MySQL command line or phpMyAdmin and run:

```sql
CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(20) NOT NULL,
  email_id TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Create Project Structure

```
school-management/
├── pages/
│   ├── api/
│   │   └── schools/
│   │       └── index.js          (API endpoint)
│   ├── addSchool.jsx              (Form page)
│   ├── showSchools.jsx            (Display page)
│   └── index.js                   (Home page)
├── lib/
│   └── db.js                      (Database connection)
├── public/
│   └── schoolImages/              (Image upload folder - create this)
├── styles/
│   └── globals.css                (Global styles with animations)
└── .env.local                     (Environment variables)
```

### 5. Create Required Files

#### **lib/db.js**
Copy the database configuration code from the first artifact.

#### **pages/api/schools/index.js**
Copy the API endpoint code from the first artifact.

#### **pages/addSchool.jsx**
Copy the form page code from the second artifact.

#### **pages/showSchools.jsx**
Copy the display page code from the third artifact.

### 6. Create Environment Variables

Create `.env.local` in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

⚠️ **Important**: Replace `your_mysql_password` with your actual MySQL password.

### 7. Create Upload Directory

```bash
mkdir -p public/schoolImages
```

### 8. Update globals.css

Add the animations from the previous globals.css artifact to your `styles/globals.css` file.

### 9. Update next.config.js

Create or update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
```

## 🏃 Running the Application

### 1. Start Development Server

```bash
npm run dev
```

The application will run on `http://localhost:3000`

### 2. Access the Pages

- **Home Page**: `http://localhost:3000`
- **Add School**: `http://localhost:3000/addSchool`
- **View Schools**: `http://localhost:3000/showSchools`

## 📱 Features

### Add School Page (addSchool.jsx)
- ✅ React Hook Form integration
- ✅ Complete form validation
- ✅ Email validation (regex pattern)
- ✅ Phone validation (10-digit number)
- ✅ Image upload with preview
- ✅ File size validation (max 5MB)
- ✅ Responsive design
- ✅ Success/error notifications
- ✅ Auto-redirect after submission

### Show Schools Page (showSchools.jsx)
- ✅ E-commerce style grid layout
- ✅ Search functionality (name, city, address)
- ✅ Responsive design (1-4 columns)
- ✅ Loading states with spinner
- ✅ Error handling with retry
- ✅ Empty state messages
- ✅ Hover effects and animations
- ✅ Image fallback for missing images
- ✅ Real-time search filtering

### API Endpoint
- ✅ GET `/api/schools` - Fetch all schools
- ✅ POST `/api/schools` - Create new school
- ✅ Image upload to `public/schoolImages`
- ✅ MySQL integration
- ✅ Error handling

## 🔒 Security Notes

1. **Never commit `.env.local`** to version control
2. Add to `.gitignore`:
```
.env.local
public/schoolImages/*
!public/schoolImages/.gitkeep
```

3. For production, use environment variables on your hosting platform

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in `.env.local`
- Ensure database exists: `school_management`

### Image Upload Issues
- Verify `public/schoolImages` directory exists
- Check folder permissions (read/write)
- Ensure file size is under 5MB

### Module Not Found Errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### Port Already in Use
- Change port: `npm run dev -- -p 3001`
- Or kill process using port 3000

## 📦 Production Build

```bash
npm run build
npm start
```

## 🎨 Customization

### Change Theme Colors
Update Tailwind colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#9333ea',
      }
    }
  }
}
```

### Modify Validation Rules
Edit validation in `addSchool.jsx`:
```javascript
register('contact', {
  pattern: {
    value: /^[0-9]{10}$/,
    message: 'Your custom message'
  }
})
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions, please check:
- MySQL connection settings
- File permissions
- Node.js version compatibility
- Browser console for errors

---

**Happy Coding! 🎉**