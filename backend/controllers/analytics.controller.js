// controllers/analytics.controller.js
import { Url } from "../models/url.model.js";
import User from "../models/user.model.js";

// Helper function to detect device
const detectDevice = (userAgent) => {
  if (!userAgent) return "Unknown";
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) return "Mobile";
  if (/tablet|ipad/i.test(userAgent)) return "Tablet";
  if (/windows|mac|linux/i.test(userAgent)) return "Desktop";
  return "Unknown";
};

// Helper function to detect traffic source
const detectSource = (referrer) => {
  if (!referrer) return "Direct";
  if (/whatsapp/i.test(referrer)) return "WhatsApp";
  if (/instagram/i.test(referrer)) return "Instagram";
  if (/facebook/i.test(referrer)) return "Facebook";
  if (/google/i.test(referrer)) return "Google";
  return "Other";
};

/**
 * Get overall analytics for logged-in user
 * GET /api/analytics
 */
const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeRange } = req.query;

    // Get all user's URLs
    const urls = await Url.find({ user: userId });

    // Calculate date range
    let startDate = new Date();
    if (timeRange === "7d") startDate.setDate(startDate.getDate() - 7);
    else if (timeRange === "30d") startDate.setDate(startDate.getDate() - 30);
    else startDate = new Date(0); // All time

    // Aggregate analytics
    let totalClicks = 0;
    let uniqueVisitors = new Set();
    let clicksByDate = {};
    let deviceBreakdown = { Mobile: 0, Desktop: 0, Tablet: 0, Unknown: 0 };
    let sourceBreakdown = {
      WhatsApp: 0,
      Instagram: 0,
      Facebook: 0,
      Google: 0,
      Direct: 0,
      Other: 0,
    };
    let topLinks = {};
    let recentClicks = [];

    urls.forEach((url) => {
      url.clickHistory.forEach((click) => {
        if (new Date(click.timestamp) >= startDate) {
          totalClicks++;
          uniqueVisitors.add(click.userAgent);
          deviceBreakdown[click.device]++;
          sourceBreakdown[click.source]++;

          // Group by date
          const date = new Date(click.timestamp).toLocaleDateString();
          clicksByDate[date] = (clicksByDate[date] || 0) + 1;

          // Track top links
          if (!topLinks[url.shortCode]) {
            topLinks[url.shortCode] = { code: url.shortCode, clicks: 0 };
          }
          topLinks[url.shortCode].clicks++;

          recentClicks.push({
            shortLink: url.shortCode,
            device: click.device,
            source: click.source,
            timestamp: click.timestamp,
          });
        }
      });
    });

    // Format clicks over time based on time range
    const clicksOverTime = [];
    let daysToShow = 7; // default
    
    if (timeRange === "30d") {
      daysToShow = 30;
    } else if (timeRange === "all") {
      // Calculate actual days from earliest click to today
      let earliestDate = new Date();
      urls.forEach((url) => {
        url.clickHistory.forEach((click) => {
          const clickDate = new Date(click.timestamp);
          if (clickDate < earliestDate) {
            earliestDate = clickDate;
          }
        });
      });
      
      // Calculate days between earliest click and today
      const today = new Date();
      const timeDiff = today - earliestDate;
      daysToShow = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include today
      daysToShow = Math.max(daysToShow, 1); // At least 1 day
    }
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US", { 
        month: "short",
        day: "numeric"
      });
      const dateKey = date.toLocaleDateString();
      clicksOverTime.push({
        date: dateStr,
        clicks: clicksByDate[dateKey] || 0,
      });
    }

    // Top 5 links
    const topLinksArray = Object.values(topLinks)
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
      .map((link) => ({
        name: `snip.io/${link.code}`,
        clicks: link.clicks,
      }));

    // Best performing link
    const bestLink =
      topLinksArray.length > 0 ? topLinksArray[0].name : "No links yet";

    // Calculate growth
    let previousPeriodClicks = 0;
    if (timeRange === "7d") {
      const previousStart = new Date();
      previousStart.setDate(previousStart.getDate() - 14);
      const previousEnd = new Date();
      previousEnd.setDate(previousEnd.getDate() - 7);

      urls.forEach((url) => {
        url.clickHistory.forEach((click) => {
          if (
            new Date(click.timestamp) >= previousStart &&
            new Date(click.timestamp) < previousEnd
          ) {
            previousPeriodClicks++;
          }
        });
      });
    }

    const growth =
      previousPeriodClicks > 0
        ? Math.round(
            ((totalClicks - previousPeriodClicks) / previousPeriodClicks) * 100,
          )
        : 0;

    // Recent activity (last 5 clicks)
    const recentActivity = recentClicks
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map((click) => ({
        shortLink: click.shortLink,
        device: click.device,
        source: click.source,
        time: new Date(click.timestamp).toLocaleString(),
      }));

    return res.status(200).json({
      stats: {
        totalClicks,
        uniqueVisitors: uniqueVisitors.size,
        bestLink,
        growth,
      },
      clicksOverTime,
      topLinks: topLinksArray,
      deviceBreakdown,
      sourceBreakdown,
      recentActivity,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export { getUserAnalytics };
