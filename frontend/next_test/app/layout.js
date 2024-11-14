import Navigation from "../components/navigation/navigation";
import "./globals.css";

export const metadata = {
  title: {
    template : "%s | My Todo",
    default : "My Todo"
  },
  description : "Next를 이용한 To do List"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation></Navigation>
        {children}
      </body>
    </html>
  );
} 
