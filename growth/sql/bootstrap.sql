CREATE TABLE IF NOT EXISTS `trip-cache.tripcache_growth.search_console_daily` (
  snapshot_date DATE, generated_at TIMESTAMP, clicks INT64, impressions INT64, ctr FLOAT64, average_position FLOAT64
);
CREATE TABLE IF NOT EXISTS `trip-cache.tripcache_growth.revenue_daily` (
  snapshot_date DATE, generated_at TIMESTAMP, currency STRING, payload JSON
);
CREATE TABLE IF NOT EXISTS `trip-cache.tripcache_growth.growth_funnel_daily` (
  snapshot_date DATE, generated_at TIMESTAMP, measurable BOOL, payload JSON
);
