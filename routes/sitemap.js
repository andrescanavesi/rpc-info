const express = require("express");
const router = express.Router();
const js2xmlparser = require("js2xmlparser");
const moment = require("moment");

/**
 * It generates an standard sitemal.xml for SEO purposes
 */
router.get("/", async function (req, res, next) {
    try {
        const baseUrl = process.env.BASE_URL || "http://www.recetasparaceliacos.info/";
        const collection = [];
        let today = moment();
        today = today.format("YYYY-MM-DD");
        //add site root url
        const rootUrl = {};
        rootUrl.loc = baseUrl;
        rootUrl.lastmod = today;
        rootUrl.changefreq = "daily";
        rootUrl.priority = "1.0";
        rootUrl["image:image"] = {
            "image:loc": process.env.RESOPIA_DEFAULT_IMAGE_URL,
            "image:caption": "recetasparaceliacos.info. Recetas para celiacos. Sin TACC. Gluten free",
        };
        collection.push(rootUrl);


        const col = {
            "@": {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
            },
            url: collection,
        };
        const xml = js2xmlparser.parse("urlset", col);
        res.set("Content-Type", "text/xml");
        res.status(200);
        res.send(xml);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
