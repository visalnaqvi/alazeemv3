/* eslint-disable @next/next/no-script-component-in-head */
import NavBar from "@/components/navbar/navbar"
import "../styles/globals.css"
import QuickContacts from "@/components/contactBox/quickContact/quickContact"
import ContactBox from "@/components/contactBox/contactBox/contactBox"
import { SessionProvider } from "next-auth/react"
import Script from 'next/script'
import Head from 'next/head'

const noAuthRoutes = ['/welcome', '/newLogin', '/register'];

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TD7J3SPJ');`
          }}
        />
      </Head>


      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TD7J3SPJ"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
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
  return { pageProps, isAuthRequired };
};

export default MyApp