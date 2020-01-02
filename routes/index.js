var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const responseJson = {
    title: 'Recetas para celiacos',
    isProduction: process.env.NODE_ENV === 'production' || false,
    adsenseEnabled: process.env.ADSENSE_ENABLED === 'production' || false
  }
  res.render('index', { title: 'Express', isProduction: true });
});

router.get("/robots.txt", async function (req, res, next) {
  try {
    const content = "User-agent: *\nAllow: /\nSitemap: http://www.recetasparaceliacos.info/sitemap.xml";
    res.set("Content-Type", "text/plain");
    res.status(200);
    res.send(content);
  } catch (e) {
    next(e);
  }
});

router.get("/ads.txt", async function (req, res, next) {
  try {
    const content = "google.com, pub-9559827534748081, DIRECT, f08c47fec0942fa0";
    res.set("Content-Type", "text/plain");
    res.status(200);
    res.send(content);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
