/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://exsolvia.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, '/careers'),
    await config.transform(config, '/careers/apply'),
  ],
};

module.exports = config;
