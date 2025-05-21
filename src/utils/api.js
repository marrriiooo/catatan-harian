// src/utils/api.js
const API_BASE_URL = "https://notes-api.dicoding.dev/v1";

async function fetchWithToken(url, options = {}) {
  const token = localStorage.getItem("accessToken");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function register({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

export async function login({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.accessToken;
}

export async function getActiveNotes() {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.notes;
}

export async function getArchivedNotes() {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.notes;
}

export async function getNote(id) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.note;
}

export async function createNote({ title, body }) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`, {
    method: "POST",
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.note;
}

export async function archiveNote(id) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.note;
}

export async function unarchiveNote(id) {
  const response = await fetchWithToken(
    `${API_BASE_URL}/notes/${id}/unarchive`,
    {
      method: "POST",
    }
  );

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson.data.note;
}

export async function deleteNote(id) {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    throw new Error(responseJson.message);
  }

  return responseJson;
}
