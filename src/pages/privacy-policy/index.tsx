import { PrivacyPolicy } from 'components/PrivacyPolicy';
import Head from 'next/head';


const PrivacyPolicyPage = () => {
  return (
   <div>
       <Head>
           <title>Privacy Policy - Custom Stickers | StickerCove</title>
           <meta name="description" content="View our Privacy Policy" />
           <meta name="keywords" content="custom stickers, custom die cut stickers, custom kiss cut stickers, personalized kiss cut stickers, personalized die cut stickers, customized stickers, customized die cut stickers, customized kiss cut stickers" />
           <meta name="robots" content="index, follow"/>
            <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="StickerCove | Order Custom Stickers Today | Delivered In 48 Hours" />
            <meta property="og:description" content="Custom Stickers with StickerCove! Get started today by placing your order and receive free artwork, digital samples, and a 48 hour turnaround time." />
            <meta property="og:url" content="https://www.stickercove.com/" />
            <meta property="og:site_name" content="Neoistone: Best Web Development and Hosting services" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="StickerCove | Order Custom Stickers Today | Delivered In 48 Hours" />
            <meta name="twitter:description" content="Custom Stickers with StickerCove! Get started today by placing your order and receive free artwork, digital samples, and a 48 hour turnaround time." />
            <meta name="theme-color" content="#25395B" />
       </Head>
       <PrivacyPolicy />
   </div>
   )
}

export default PrivacyPolicy;