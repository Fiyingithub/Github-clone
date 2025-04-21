import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchRepos = (username, page = 1, perPage = 9) =>
  axios.get(
    `${BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}`
  );

export const fetchRepoDetails = (username, repoName) =>
  axios.get(`${BASE_URL}/repos/${username}/${repoName}`);

export const createNewRepo = (token, data) =>
  axios.post(`${BASE_URL}/user/repos`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteRepo = (token, repoName) =>
  axios.delete(`${BASE_URL}/repos/${repoName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateRepo = (token, repoName, data) =>
  axios.patch(`${BASE_URL}/repos/${repoName}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
