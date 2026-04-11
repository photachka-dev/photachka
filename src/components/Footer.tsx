export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Photachka. Sva prava zadržana.</p>
      </div>
    </footer>
  );
}
