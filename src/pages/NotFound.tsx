export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-600">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white rounded-lg shadow hover:bg-gray-700 transition border"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}