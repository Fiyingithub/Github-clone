// components/DeleteRepoModal.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Octokit } from '@octokit/rest';

function DeleteRepoModal({ repoName, onClose }) {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const isConfirmTextValid = confirmText === repoName;

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!isConfirmTextValid) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would use your authentication method of choice
      const octokit = new Octokit({
        auth: 'YOUR_GITHUB_TOKEN' // In a real app, use environment variables
      });
      
      // Replace 'username' with the actual GitHub username
      await octokit.repos.delete({
        owner: 'username', // Replace with actual username
        repo: repoName
      });
      
      setLoading(false);
      
      // Redirect to home page after successful deletion
      navigate('/');
      
    } catch (err) {
      setError(err.message || 'Failed to delete repository');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-red-600">Delete Repository</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-6 py-4">
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-700 font-medium">Warning: This action cannot be undone</p>
            </div>
            <p className="mt-2 text-red-700">
              This will permanently delete the repository <strong>{repoName}</strong>, 
              including all files, commit history, issues, and pull requests.
            </p>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleDelete}>
            <div className="mb-6">
              <label htmlFor="confirmText" className="block text-gray-700 font-medium mb-2">
                To confirm, type <span className="font-bold">{repoName}</span> below:
              </label>
              <input
                type="text"
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="off"
              />
            </div>
            
            <div className="flex justify-end space-x-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isConfirmTextValid || loading}
                className={`px-4 py-2 rounded-md text-white ${
                  !isConfirmTextValid || loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : 'Delete Repository'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteRepoModal;