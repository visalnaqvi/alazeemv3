import NavBar from "@/components/navbar/navbar"
import "../styles/globals.css"
import QuickContacts from "@/components/contactBox/quickContact/quickContact"
import ContactBox from "@/components/contactBox/contactBox/contactBox"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <NavBar />
    <main>
      <Component {...pageProps} />
    </main>
    <ContactBox />
    <QuickContacts />
    </>
  )
}