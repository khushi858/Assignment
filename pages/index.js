import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            School Management System
          </h1>
          <p className="text-xl text-gray-600">
            Manage school information efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/addSchool">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2">
              <div className="text-4xl mb-4">➕</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Add School
              </h2>
              <p className="text-gray-600">
                Register a new school with complete details
              </p>
            </div>
          </Link>

          <Link href="/showSchools">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                View Schools
              </h2>
              <p className="text-gray-600">
                Browse all registered schools
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
