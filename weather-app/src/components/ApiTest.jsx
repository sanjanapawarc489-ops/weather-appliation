import React, { useState } from 'react';

const ApiTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const apiKey = 'b2cbadd8e27d068ed379b3c6650f94fa';
      const query = 'New York';
      const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(query)}&units=m&language=en`;
      
      console.log('Testing URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      setResult(data);
    } catch (error) {
      console.error('Test Error:', error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e2e', color: 'white', borderRadius: '10px', margin: '20px' }}>
      <h2>API Test</h2>
      <button 
        onClick={testApi} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#7c3aed', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Weather API'}
      </button>
      
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#2d2d3a', borderRadius: '5px' }}>
          <h3>Result:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;