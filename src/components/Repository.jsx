import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Octokit } from '@octokit/rest';
import UpdateRepoModal from './Modal/UpdateRepoModal';
import DeleteRepoModal from './Modal/DeleteRepoModal';

function Repository() {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readMe, setReadMe] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const username = 'octocat'; // Replace with your GitHub username

  useEffect(() => {
    const fetchRepo = async () => {
      setLoading(true);
      try {
        const octokit = new Octokit();
        const response = await octokit.repos.get({
          owner: username,
          repo: repoName
        });
        
        setRepo(response.data);
        
        // Try to fetch README
        try {
          const readmeResponse = await octokit.repos.getReadme({
            owner: username,
            repo: repoName
          });
          
          const content = atob(readmeResponse.data.content);
          setReadMe(content);
        } catch (readmeErr) {
          console.log('No README found or error fetching README', readmeErr);
          setReadMe('');
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepo();
  }, [repoName]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  if (!repo) {
    return <div className="p-4">Repository not found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          Back to repositories
        </Link>
      </div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{repo.name}</h1>
          {repo.description && <p className="text-gray-600 mt-2">{repo.description}</p>}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsUpdateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            aria-label="Update repository"
          >
            Update
          </button>
          
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            aria-label="Delete repository"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Repository Stats</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>{repo.stargazers_count} stars</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>{repo.forks_count} forks</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span>Last updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span>Created: {new Date(repo.created_at).toLocaleDateString()}</span>
            </li>
            {repo.language && (
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
                <span>{repo.language}</span>
              </li>
            )}
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Repository Details</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Default Branch:</span> {repo.default_branch}
            </li>
            <li>
              <span className="font-medium">Visibility:</span> {repo.private ? 'Private' : 'Public'}
            </li>
            {repo.homepage && (
              <li>
                <span className="font-medium">Homepage:</span>{' '}
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {repo.homepage}
                </a>
              </li>
            )}
            <li>
              <span className="font-medium">Clone URL:</span>{' '}
              <code className="bg-gray-200 px-2 py-1 rounded">{repo.clone_url}</code>
            </li>
            <li>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                View on GitHub
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {readMe && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">README</h2>
          <div className="bg-gray-50 p-4 rounded-lg prose max-w-none">
            <pre className="whitespace-pre-wrap">{readMe}</pre>
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <UpdateRepoModal
          repo={repo}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updatedRepo) => setRepo(updatedRepo)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteRepoModal
          repoName={repo.name}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Repository;