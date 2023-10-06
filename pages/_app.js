import NavBar from "@/components/navbar/navbar"
import "../styles/globals.css"
import ContactBox from "@/components/contactBox/contactBox"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <NavBar />
    <main>
      <Component {...pageProps} />
    </main>
    <ContactBox />
    </>
  )
}