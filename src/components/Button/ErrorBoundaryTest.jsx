import { useState } from 'react';

function ErrorBoundaryTest() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("This is a test error for the Error Boundary!");
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Error Boundary Test</h1>
      <p className="mb-4">
        Click the button below to trigger an error. This will be caught by our Error Boundary component.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        aria-label="Trigger error"
      >
        Trigger Error
      </button>
    </div>
  );
}

export default ErrorBoundaryTest;