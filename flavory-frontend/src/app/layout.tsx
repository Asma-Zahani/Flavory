import type { Metadata } from "next";
import { Raleway, Libre_Baskerville, Dancing_Script, Great_Vibes, Fredoka, EB_Garamond, Allura, Poppins } from "next/font/google";
import "../../globals.css";
import { UserProvider } from "@/context/UserContext";
import { SearchProvider } from "@/context/SearchContext";
import { SuccessMessageProvider } from "@/context/SuccessMessageContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { Footer, Header } from "../components/HeaderAndFooter";

const raleway = Raleway({variable: "--font-raleway", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const libre = Libre_Baskerville({variable: "--font-libre", subsets: ["latin"], weight: ["400", "700"]});
const dancing = Dancing_Script({variable: "--font-dancing", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const greatvibes = Great_Vibes({variable: "--font-greatvibes", subsets: ["latin"], weight: ["400"] });
const fredoka = Fredoka({variable: "--font-fredoka", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const garamond = EB_Garamond({ variable: "--font-garamond", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const allura = Allura({ variable: "--font-allura", subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = { title: "Flavory", description: "", icons: {icon: "/icon.svg"}};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${libre.variable} ${dancing.variable} ${greatvibes.variable} ${fredoka.variable} ${garamond.variable} ${allura.variable} ${poppins.variable} antialiased `} >
        <LoadingProvider>
          <SuccessMessageProvider>
            <UserProvider>
              <SearchProvider>
                <Header />
                <div className="mx-10 lg:mx-22">{children}</div>
                <Footer />
              </SearchProvider>
            </UserProvider>
          </SuccessMessageProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
