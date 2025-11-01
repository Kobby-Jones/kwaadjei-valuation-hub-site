module.exports = function (eleventyConfig) {
  /* -----------------------------
     PASSTHROUGH COPY
     ----------------------------- */
  // Copy static assets directly to the _site folder
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("vendor");
  eleventyConfig.addPassthroughCopy("admin"); // For Decap CMS
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  /* -----------------------------
     CUSTOM COLLECTIONS
     ----------------------------- */
  // Create a "post" collection for all markdown files in the blog folder
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md").sort((a, b) => b.date - a.date);
  });

  /* -----------------------------
     CUSTOM FILTERS
     ----------------------------- */

  // Readable Date (e.g., October 28, 2025)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (dateObj instanceof Date && !isNaN(dateObj)) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return dateObj || "";
  });

  // Head Filter – to limit arrays (e.g. show only first 3 posts)
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Debug Filter (optional: helps inspect objects in templates)
  eleventyConfig.addFilter("debug", (value) => JSON.stringify(value, null, 2));

  /* -----------------------------
     BASE CONFIGURATION
     ----------------------------- */
  return {
    dir: {
      input: ".", // Root of your source files
      includes: "_includes", // Layouts & partials
      data: "_data", // Global data
      output: "_site", // Output folder
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
