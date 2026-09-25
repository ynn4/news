#!/usr/bin/env node
/**
 * Validates a news.json file against the schema news.jsx expects, BEFORE it
 * is allowed to replace the live public/news.json.
 *
 * Usage:
 *   node validate-news.js path/to/news.json
 *
 * Exit code 0  -> file is valid, safe to publish
 * Exit code 1  -> file is invalid, DO NOT publish (errors listed below)
 *
 * Whoever handles deployment should run this on whatever file the news
 * writer submits, and only copy it over the live public/news.json if this
 * script exits 0. Nothing here depends on the build/bundler.
 */

import fs from 'fs';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node validate-news.js path/to/news.json');
  process.exit(1);
}

const KNOWN_TABS = ['home', 'public', 'private'];
const KNOWN_CATEGORIES = ['cat1', 'cat2', 'cat3', 'cat4'];
const LANGS = ['en', 'fr', 'ar'];

let raw;
try {
  raw = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  console.error(`✗ Could not read file: ${err.message}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (err) {
  console.error('✗ Invalid JSON syntax — this file cannot be published.');
  console.error(`  ${err.message}`);
  process.exit(1);
}

if (typeof data !== 'object' || data === null || Array.isArray(data)) {
  console.error('✗ The top level of news.json must be an object mapping article-id -> article.');
  process.exit(1);
}

const errors = [];

for (const [id, article] of Object.entries(data)) {
  const prefix = `Article "${id}":`;

  if (typeof article !== 'object' || article === null) {
    errors.push(`${prefix} must be an object.`);
    continue;
  }

  if (!article.image || typeof article.image !== 'string') {
    errors.push(`${prefix} missing or invalid "image" (must be a URL string).`);
  }

  if (!Array.isArray(article.tab) || article.tab.length === 0) {
    errors.push(`${prefix} missing or invalid "tab" (must be a non-empty array).`);
  } else {
    for (const tabVal of article.tab) {
      if (!KNOWN_TABS.includes(tabVal)) {
        errors.push(`${prefix} unknown tab "${tabVal}" (expected one of ${KNOWN_TABS.join(', ')}).`);
      }
    }
  }

  if (!KNOWN_CATEGORIES.includes(article.category)) {
    errors.push(`${prefix} missing or unknown "category" (expected one of ${KNOWN_CATEGORIES.join(', ')}).`);
  }

  if (typeof article.sidebar !== 'boolean') {
    errors.push(`${prefix} "sidebar" must be true or false.`);
  }

  if ('featured' in article && typeof article.featured !== 'boolean') {
    errors.push(`${prefix} "featured" must be true or false if present.`);
  }

  let hasAnyLang = false;
  for (const lang of LANGS) {
    if (!(lang in article)) continue;
    hasAnyLang = true;
    const loc = article[lang];
    if (typeof loc !== 'object' || loc === null) {
      errors.push(`${prefix} "${lang}" must be an object.`);
      continue;
    }
    if (!loc.title || typeof loc.title !== 'string') {
      errors.push(`${prefix} "${lang}.title" is missing or empty.`);
    }
    if (!loc.meta || typeof loc.meta !== 'string') {
      errors.push(`${prefix} "${lang}.meta" is missing or empty.`);
    }
    if (!loc.content || typeof loc.content !== 'string') {
      errors.push(`${prefix} "${lang}.content" is missing or empty.`);
    }
  }
  if (!hasAnyLang) {
    errors.push(`${prefix} has no language content at all (needs at least one of en/fr/ar).`);
  }
}

if (errors.length > 0) {
  console.error(`✗ Found ${errors.length} problem(s) — DO NOT publish this file:\n`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

console.log(`✓ Valid — ${Object.keys(data).length} article(s) checked, safe to publish.`);
process.exit(0);
