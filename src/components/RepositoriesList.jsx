import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Octokit } from "@octokit/rest";

function RepositoriesList() {
  const [repos, setRepos] = useState([]);
  const [reposCount, setReposCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const perPage = 5;
  const username = "Fiyingithub"; // Replace with your GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const octokit = new Octokit();
        const response = await octokit.repos.listForUser({
          username,
          per_page: perPage,
          page,
          sort: "updated",
          direction: "desc",
        });

        setReposCount(response.data.length);
        setRepos(response.data);
        setHasNextPage(response.data.length === perPage);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  const filteredRepos = repos
    .filter((repo) => {
      if (filter === "forks") return repo.fork;
      if (filter === "sources") return !repo.fork;
      return true;
    })
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-6">
          {username ? username : "My"} GitHub Repositories
        </h1>
        <p>
          ({reposCount} repos) In page {page}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search repositories
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search repositories..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="filter" className="sr-only">
            Filter repositories
          </label>
          <select
            id="filter"
            className="p-2 border rounded-md bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Repositories</option>
            <option value="sources">Sources</option>
            <option value="forks">Forks</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {filteredRepos.length === 0 ? (
            <p className="text-center p-6 text-gray-500">
              No repositories found matching your criteria.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredRepos.map((repo) => (
                <li key={repo.id} className="py-4">
                  <Link
                    to={`/repository/${repo.name}`}
                    className="block hover:bg-gray-50 p-2 rounded"
                  >
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold text-blue-600">
                        {repo.name}
                      </h2>
                      <div className="flex gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            repo.private
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {repo.private ? "Private" : "Public"}
                        </span>
                        {repo.fork && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Fork
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">
                      {repo.description || "No description provided"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                      {repo.language && (
                        <span className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                        {repo.forks_count}
                      </span>
                      <span className="flex items-center">
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="text-gray-600">Page {page}</span>
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded-md ${
                !hasNextPage
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RepositoriesList;
