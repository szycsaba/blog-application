function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          Csaba Szy © {year} — All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
