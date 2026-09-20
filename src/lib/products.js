import { ASSET_BASE_URL } from "./api";

export const parseProductImage = (image) => {
  if (!image) return { url: "" };
  if (typeof image === "object") return image;

  try {
    const parsed = JSON.parse(image);
    return typeof parsed === "object" && parsed !== null ? parsed : { url: "" };
  } catch {
    return { url: image };
  }
};

export const normalizeProduct = (product) => ({
  ...product,
  image: parseProductImage(product.image),
});

export const getProductImageUrl = (product) => {
  const path = parseProductImage(product?.image).url;
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  return `${ASSET_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};
