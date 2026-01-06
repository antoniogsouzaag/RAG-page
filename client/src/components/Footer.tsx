export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-display font-bold text-white mb-2">AG LABS</h2>
            <p className="text-muted-foreground text-sm">
              © 2026 AG LABS. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
