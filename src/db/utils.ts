import { artSupplies } from "@/app/data";

export function getCategoryDetails(category: string) {
  const categoryData = artSupplies.find((c) =>
    c.categories.find((cat) => cat.categoryName === category),
  );
  const cat = categoryData?.categories.find(
    (cat) => cat.categoryName === category,
  );
  return cat;
}

export function getSubcategoryDetails(input: {
  category: string;
  subcategory: string;
}) {
  const categoryData = artSupplies.find((c) =>
    c.categories.find((cat) => cat.categoryName === input.category),
  );
  const cat = categoryData?.categories.find(
    (cat) => cat.categoryName === input.category,
  );
  const screwTypes = cat?.categoryItems.find((collection) =>
    collection.subcategories.find(
      (sub) => sub.subcategoryName === input.subcategory,
    ),
  );
  const sub = screwTypes?.subcategories.find(
    (sub) => sub.subcategoryName === input.subcategory,
  );
  return sub;
}

export function getAllCategories() {
  return artSupplies.flatMap((item) => item.categories);
}

export function getAllCollections() {
  return artSupplies;
}

export function getProductDetails(input: {
  category: string;
  subcategory: string;
  product: string;
}) {
  const categoryData = artSupplies.find((c) =>
    c.categories.find((cat) => cat.categoryName === input.category),
  );
  const cat = categoryData?.categories.find(
    (cat) => cat.categoryName === input.category,
  );
  const screwTypes = cat?.categoryItems.find((collection) =>
    collection.subcategories.find(
      (sub) => sub.subcategoryName === input.subcategory,
    ),
  );
  const sub = screwTypes?.subcategories.find(
    (sub) => sub.subcategoryName === input.subcategory,
  );
  const product = sub?.products.find((prod) => prod.name === input.product);
  return product;
}

export function getRelatedProducts(input: {
  category: string;
  subcategory: string;
  product: string;
}) {
  const categoryData = artSupplies.find((c) =>
    c.categories.find((cat) => cat.categoryName === input.category),
  );
  const cat = categoryData?.categories.find(
    (cat) => cat.categoryName === input.category,
  );
  const screwTypes = cat?.categoryItems.find((collection) =>
    collection.subcategories.find(
      (sub) => sub.subcategoryName === input.subcategory,
    ),
  );
  const sub = screwTypes?.subcategories.find(
    (sub) => sub.subcategoryName === input.subcategory,
  );
  const product = sub?.products.find((prod) => prod.name === input.product);
  return sub?.products.filter((prod) => prod.name !== product?.name);
}
