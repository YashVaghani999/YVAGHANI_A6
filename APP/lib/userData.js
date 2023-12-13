import { getToken } from "./Authenticate.js";

async function requestPseudo(method, url) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  return await requestPseudo("PUT", `/favourites/${id}`);
}

export async function removeFromFavourites(id) {
  return await requestPseudo("DELETE", `/favourites/${id}`);
}

export async function getFavourites() {
  return await requestPseudo("GET", "/favourites");
}

export async function addToHistory(id) {
  return await requestPseudo("PUT", `/history/${id}`);
}

export async function removeFromHistory(id) {
  return await requestPseudo("DELETE", `/history/${id}`);
}

export async function getHistory() {
  return await requestPseudo("GET", "/history");
}
