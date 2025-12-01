import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await axios.get('/api/schools');
      setSchools(response.data);
    } catch (err) {
      setError('Failed to load schools');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading schools...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Home
          </Link>
          <Link
            href="/addSchool"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            + Add School
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Schools ({schools.length})
        </h2>

        {error && (
          <div className="mb-6 bg-red-500 text-white px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {schools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">🏫</div>
            <p className="text-gray-600 text-lg mb-2">No schools found</p>
            <p className="text-gray-500 text-sm mb-6">
              Add your first school to get started
            </p>
            <Link
              href="/addSchool"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Add School
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`/schoolImages/${school.image}`}
                    alt={school.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=School';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {school.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="text-indigo-600">📍</span>
                      <span className="line-clamp-2">{school.address}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-600">🏙️</span>
                      <span>
                        {school.city}, {school.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
