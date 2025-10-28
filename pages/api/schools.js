import pool from "../../lib/db";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Parse form data with file uploads
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filename: (name, ext, part) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        return `school-${uniqueSuffix}${ext}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    // GET: Fetch all schools
    try {
      const [rows] = await pool.query(
        "SELECT * FROM schools ORDER BY created_at DESC"
      );

      return res.status(200).json({
        success: true,
        schools: rows,
      });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({
        error: "Failed to fetch schools",
        details: error.message,
      });
    }
  } else if (req.method === "POST") {
    // POST: Add new school
    try {
      const { fields, files } = await parseForm(req);

      // Extract field values (formidable wraps values in arrays)
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const address = Array.isArray(fields.address)
        ? fields.address[0]
        : fields.address;
      const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
      const state = Array.isArray(fields.state)
        ? fields.state[0]
        : fields.state;
      const contact = Array.isArray(fields.contact)
        ? fields.contact[0]
        : fields.contact;
      const email_id = Array.isArray(fields.email_id)
        ? fields.email_id[0]
        : fields.email_id;

      // Get image filename
      let imageName = null;
      if (files.image) {
        const imageFile = Array.isArray(files.image)
          ? files.image[0]
          : files.image;
        imageName = path.basename(imageFile.filepath);
      }

      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({
          error: "All fields except image are required",
        });
      }

      // Insert into database
      const [result] = await pool.query(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, imageName, email_id]
      );

      return res.status(201).json({
        success: true,
        message: "School added successfully",
        schoolId: result.insertId,
      });
    } catch (error) {
      console.error("Error adding school:", error);
      return res.status(500).json({
        error: "Failed to add school",
        details: error.message,
      });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}
