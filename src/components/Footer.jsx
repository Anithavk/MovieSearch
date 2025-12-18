export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center">
        © {new Date().getFullYear()} Movie Search App · Powered by OMDb
      </div>
    </footer>
  );
}
