import Link from 'next/link'
import React from 'react'
import {
  FacebookSvg,
  GmailSvg,
  InstagramSvg,
  LandlineSvg,
  MapSvg,
  MenuSvg,
  MobileSvg,
  TwitterSvg,
} from './Svg'
const Footer = () => {
  const mapLink = {
    icon: <MapSvg />,
    base: '094 Tagaytay - Nasugbu Hwy, Tagaytay, Cavite',
    link: '#',
  }

  const socialMediaLinks = [
    {
      icon: <FacebookSvg />,
      base: 'Crowné Plaza',
      link: '#',
    },
    {
      icon: <InstagramSvg />,
      base: '@crownéplaza',
      link: 'https://www.instagram.com/crowne_plaza_hotel_ph/',
    },
    {
      icon: <TwitterSvg />,
      base: '@crownéplaza',
      link: '#',
    },
  ]
  const businessContactLink = [
    {
      icon: <MobileSvg />,
      base: '09123456789',
      link: '#contact',
    },
    {
      icon: <LandlineSvg />,
      base: '(02) 1234678',
      link: '#contact',
    },
    {
      icon: <GmailSvg />,
      base: 'crownéplaza@gmail.com',
      link: '#contact',
    },
  ]
  return (
    <div
      id="contact"
      className="mt-20 flex flex-col-reverse items-center justify-around bg-slate-900 p-10 md:flex-row"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="p-4 ">
          <ul>
            <li>
              <Link href={mapLink.link}>
                <p className="flex cursor-pointer items-center text-slate-300 transition-colors duration-100 hover:text-emerald-500">
                  <span className="block w-icon p-2 ">{mapLink.icon}</span>
                  {mapLink.base}
                </p>
              </Link>
            </li>
            {businessContactLink.map(({ icon, base, link }, index) => (
              <li key={index}>
                <Link href={link}>
                  <p className="flex cursor-pointer items-center text-slate-300 transition-colors duration-100 hover:text-emerald-500">
                    <span className="block w-icon p-2 ">{icon}</span> {base}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 ">
          <ul>
            {socialMediaLinks.map(({ icon, base, link }, index) => (
              <li key={index}>
                <Link href={link}>
                  <p className="flex cursor-pointer items-center text-slate-300 transition-colors duration-100 hover:text-emerald-500">
                    <span className="block w-icon p-2 ">{icon}</span> {base}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="my-10 flex flex-col p-4 md:m-0">
        <p className="mb-5 text-3xl font-bold text-white">Get in touch</p>
        <a
          href="mailto:jirohotel@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
          className="bg-emerald-500 py-4 px-6 text-center text-lg text-white transition-transform duration-300 hover:-translate-y-1"
        >
          Email us
        </a>
      </div>
    </div>
  )
}

export default Footer
