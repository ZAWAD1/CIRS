const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.get("/reports", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("incident_reports")
      .select("report_id, title, status")
      .order("report_id", { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on ${port}`));