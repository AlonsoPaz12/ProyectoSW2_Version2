import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

const AppRoutes = dynamic(() => import('./routes'), { ssr: false });

export const metadata = {
  title: "MedControl+",
  description: "Página web para gestionar tu salud.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRoutes />
      </body>
    </html>
  );
}
