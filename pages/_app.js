import NavBar from "@/components/navbar/navbar"
import "../styles/globals.css"
import QuickContacts from "@/components/contactBox/quickContact/quickContact"
import ContactBox from "@/components/contactBox/contactBox/contactBox"
import { SessionProvider } from "next-auth/react"
import Map from "../components/map/map.js"
import { useRouter } from "next/router"
import { getPageDefinitionForRoute } from "@/config/pageRegistry"
import ManagedExistingPage from "@/components/pageBuilder/ManagedExistingPage"
import { getPublicPage } from "@/services/pages"
const noAuthRoutes = ['/welcome', '/newLogin', '/register'];

function MyApp({ Component, pageProps: { session, managedPage, ...pageProps } }) {
  const router = useRouter();
  const definition = getPageDefinitionForRoute(router.pathname, router.asPath);
  const pageContent = definition
    ? <ManagedExistingPage definition={definition} initialPage={managedPage}><Component {...pageProps} /></ManagedExistingPage>
    : <Component {...pageProps} />;
  return (
    <SessionProvider session={session}>


      <NavBar />
      <main>
        {pageContent}
      </main>
      <Map />
      <br />
      <br />
      <ContactBox />
      <QuickContacts />
    </SessionProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // Determine if authentication is required based on the page's path
  const { asPath } = ctx;
  const isAuthRequired = !noAuthRoutes.includes(asPath);
  // Call the page's `getInitialProps` function if it exists
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  const definition = getPageDefinitionForRoute(ctx.pathname, asPath);
  let managedPage = null;
  if (definition) {
    try {
      managedPage = await Promise.race([
        getPublicPage(definition.pageKey),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Managed page request timed out")), 5000))
      ]);
    }
    catch (error) { console.error("Unable to server-render managed page", error); }
  }
  return { pageProps: { ...pageProps, managedPage }, isAuthRequired };
};

export default MyApp
