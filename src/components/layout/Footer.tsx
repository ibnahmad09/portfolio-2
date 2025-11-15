export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-muted">
          © {new Date().getFullYear()} Aditya Ahmad Mulyana. Built with React, Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}