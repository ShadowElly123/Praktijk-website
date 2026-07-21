// Root pass-through: <html>/<body>, fonts en metadata leven in app/[lang]/layout.tsx,
// zodat elke locale zijn eigen <html lang> en metadata krijgt.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
