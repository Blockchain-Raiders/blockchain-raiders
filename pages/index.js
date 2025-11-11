import Head from 'next/head';
import HeaderLogo from '@/components/HeaderLogo';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blockchain Raiders — Project Closed</title>
        <meta name="description" content="Blockchain Raiders project has been closed." />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center gap-6">
        <HeaderLogo />
        <p className="font-ui text-lg md:text-xl">Project is closed.</p>
      </div>
    </>
  );
}
