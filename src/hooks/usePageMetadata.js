import { useEffect } from "react";

const upsertMeta = (name, content) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertProperty = (name, content) => {
  let element = document.head.querySelector(`meta[property="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

export default function usePageMetadata(title, description) {
  useEffect(() => {
    document.title = `${title} | Stickers Makers`;
    upsertMeta("description", description);
    upsertProperty("og:title", document.title);
    upsertProperty("og:description", description);
  }, [description, title]);
}
