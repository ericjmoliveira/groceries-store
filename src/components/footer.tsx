export function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 md:p-8 bg-blue-600 shadow-md">
      <span className="text-lg text-white font-medium">
        &copy; {new Date().getFullYear()} Wowmart
      </span>
    </footer>
  );
}
