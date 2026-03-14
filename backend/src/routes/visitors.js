const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");
const SiteStats = require("../models/SiteStats");

// GET /api/visitors — returns total + today count
router.get("/", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Upsert today
    const todayDoc = await Visitor.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    // Upsert total
    const totalDoc = await SiteStats.findOneAndUpdate(
      { key: "total_visitors" },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );

    // Get last 7 days for chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const dateStr = sevenDaysAgo.toISOString().split("T")[0];

    const weekly = await Visitor.find({ date: { $gte: dateStr } }).sort({ date: 1 });

    res.json({
      success: true,
      data: {
        total: totalDoc.value,
        today: todayDoc.count,
        weekly: weekly.map(w => ({ date: w.date, count: w.count })),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/visitors/stats — just read, no increment (for admin)
router.get("/stats", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const todayDoc = await Visitor.findOne({ date: today });
    const totalDoc = await SiteStats.findOne({ key: "total_visitors" });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const dateStr = sevenDaysAgo.toISOString().split("T")[0];
    const weekly = await Visitor.find({ date: { $gte: dateStr } }).sort({ date: 1 });

    res.json({
      success: true,
      data: {
        total: totalDoc?.value || 0,
        today: todayDoc?.count || 0,
        weekly: weekly.map(w => ({ date: w.date, count: w.count })),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
