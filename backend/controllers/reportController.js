import pool from "../db.js";

// CREATE report (from IncidentForm)
export const createReport = async (req, res) => {
  try {
    const {
      reporter_id,
      is_anonymous,
      category,
      title,
      description,
      date_of_incident,
      time_of_incident,
      location,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO incident_reports 
       (reporter_id, is_anonymous, category, title, description, date_of_incident, time_of_incident, location)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        reporter_id || null,
        is_anonymous || false,
        category,
        title,
        description,
        date_of_incident,
        time_of_incident,
        location,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET all reports (for MyReports)
export const getAllReports = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM incident_reports ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reports" });
  }
};
