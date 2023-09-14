import {useUrl} from '@shopify/hydrogen';

import {Section, Heading, FooterMenu, CountrySelector} from '~/components';
import logo from '../../assets/images/logo.png';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer({menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section
      divider={'none'}
      as="footer"
      role="contentinfo"
      className={`footer grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 
        border-b md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
          `}
    >
      <div className="logo col-span-2 text-center md:text-left">
        <img src={logo} className="h-10 md:h-12" alt="" />
      </div>
      {/*
      <FooterMenu menu={menu} />

      <section className="grid gap-4 w-full md:max-w-[335px] ">
      
        <Heading size="lead" className="cursor-default" as="h3">
          Country
        </Heading>
        <CountrySelector />
      </section>
    */}
      <div className={`self-end pt-8 opacity-50 text-center w-full col-span-2`}>
        &copy; {new Date().getFullYear()} This website is carbon&nbsp;neutral.
      </div>
    </Section>
  );
}
