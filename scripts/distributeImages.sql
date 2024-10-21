-- Step 1: Create a temporary table of image URLs with a random order and assign a row number
WITH numbered_image_urls AS (
  SELECT image_url, ROW_NUMBER() OVER () AS rn
  FROM (
    SELECT image_url FROM (
      SELECT image_url FROM categories WHERE image_url IS NOT NULL
      UNION ALL
      SELECT image_url FROM subcategories WHERE image_url IS NOT NULL
      UNION ALL
      SELECT image_url FROM products WHERE image_url IS NOT NULL
    ) AS all_images
    ORDER BY RANDOM()
  ) AS random_images
),

-- Step 2: Create a temporary table of products with NULL image_url and assign a random row number
numbered_products AS (
  SELECT slug, ROW_NUMBER() OVER (ORDER BY RANDOM()) AS rn
  FROM products
  WHERE image_url IS NULL
)

-- Step 3: Update products by matching the row numbers modulo the count of image URLs
UPDATE products p
SET image_url = niu.image_url
FROM numbered_products np
JOIN numbered_image_urls niu
  ON ((np.rn - 1) % (SELECT COUNT(*) FROM numbered_image_urls) + 1) = niu.rn
WHERE p.slug = np.slug;

-- Update categories with NULL image_url
WITH numbered_image_urls AS (
  SELECT image_url, ROW_NUMBER() OVER () AS rn
  FROM (
    SELECT image_url FROM (
      SELECT image_url FROM categories WHERE image_url IS NOT NULL
      UNION ALL
      SELECT image_url FROM subcategories WHERE image_url IS NOT NULL
      UNION ALL
      SELECT image_url FROM products WHERE image_url IS NOT NULL
    ) AS all_images
    ORDER BY RANDOM()
  ) AS random_images
),
numbered_categories AS (
  SELECT slug, ROW_NUMBER() OVER (ORDER BY RANDOM()) AS rn
  FROM categories
  WHERE image_url IS NULL
)
UPDATE categories c
SET image_url = niu.image_url
FROM numbered_categories nc
JOIN numbered_image_urls niu
  ON ((nc.rn - 1) % (SELECT COUNT(*) FROM numbered_image_urls) + 1) = niu.rn
WHERE c.slug = nc.slug;


-- Update subcategories with NULL image_url
WITH numbered_image_urls AS (
  SELECT image_url, ROW_NUMBER() OVER () AS rn
  FROM (
    SELECT image_url FROM (
      SELECT image_url FROM categories WHERE image_url IS NOT NULL
      UNION ALL
      SELECT image_url FROM subcategories WHERE image_url IS NOT NULL
      UNION ALL
      SELECT image_url FROM products WHERE image_url IS NOT NULL
    ) AS all_images
    ORDER BY RANDOM()
  ) AS random_images
),
numbered_subcategories AS (
  SELECT slug, ROW_NUMBER() OVER (ORDER BY RANDOM()) AS rn
  FROM subcategories
  WHERE image_url IS NULL
)
UPDATE subcategories sc
SET image_url = niu.image_url
FROM numbered_subcategories nsc
JOIN numbered_image_urls niu
  ON ((nsc.rn - 1) % (SELECT COUNT(*) FROM numbered_image_urls) + 1) = niu.rn
WHERE sc.slug = nsc.slug;

