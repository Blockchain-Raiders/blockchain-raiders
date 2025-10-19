import '../styles/globals.css'
import FireOverlay from '@/components/FireOverlay'

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* 🔥 Global ember overlay (site-wide). 
          Looks for a scroll container with id="mainScroll"; 
          falls back to window if not found. */}
      <FireOverlay scope="page" z="z-10" density={36} speed={10} scrollTargetId="mainScroll" />
      <Component {...pageProps} />
    </>
  )
}
