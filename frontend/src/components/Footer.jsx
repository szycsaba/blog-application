import Container from "./ui/Container";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <Container className="h-16 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          Csaba Szy © {year} — All rights reserved
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
