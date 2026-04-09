export default function About() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">About This Project</h1>
        <p className="text-gray-300">
          This URL shortener helps you generate compact links, track click stats, and manage your personal links securely.
        </p>
        <p className="text-gray-300">
          Authentication is handled using HTTP-only cookies, and each user sees only their own URLs in protected pages.
        </p>
      </div>
    </section>
  );
}
