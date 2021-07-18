import 'tailwindcss/tailwind.css'
import { Provider, useSession } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (<Provider
    options={{
      clientMaxAge: 60,     // Re-fetch session if cache is older than 60 seconds
      keepAlive: 5 * 60 // Send keepAlive message every 5 minutes
    }}
    session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>)

}

export default MyApp
