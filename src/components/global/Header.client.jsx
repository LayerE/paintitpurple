import {Link, useUrl, useCart} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';

import {Heading, IconAccount, IconBag, IconMenu} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';
import logo from '../../assets/images/logo.png';
import {CountrySelectorHeader} from '../CountrySelectorHeader.client';

/**
 * A client component that specifies the content of the header on the website
 */
export function Header({title, menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function MobileHeader({countryCode, title, isHome, openCart, openMenu}) {
  const {y} = useWindowScroll();

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-[#6B32FF]  text-contrast text-primary shadow-darkHeader'
        : 'bg-[#6B32FF] text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 right-0 justify-between w-full leading-none gap-0 pr-4 md:px-8`,
  };

  return (
    <header role="banner" className={styles.container}>
      <div className="flex items-center justify-start w-full gap-4 h-full">
        <Link
          className="flex items-center leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-[100%] bg-[#1F1F1F]"
          to="/"
        >
          <Heading className="font-bold text-center" as={isHome ? 'h1' : 'h2'}>
            {/* {title}  */}
            <img src={logo} className="h-6 object-contain" alt="" />
          </Heading>
        </Link>
      </div>

      <div className="flex items-center justify-end w-full gap-4">
        {/* <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link> */}
        {/* <div>
          <CountrySelectorHeader />
        </div> */}
        <button onClick={openMenu} className={styles.button}>
          <IconMenu stroke="white" />
        </button>
        <button onClick={openCart} className={styles.button}>
          <IconBag stroke="white" />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function DesktopHeader({countryCode, isHome, menu, openCart, title}) {
  const {y} = useWindowScroll();

  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
    container: `${
      isHome
        ? 'bg-[#6B32FF] text-primary shadow-darkHeader'
        : 'bg-[#6B32FF] text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-0`,
  };

  return (
    <header role="banner" className={`${styles.container} h-[70px]`}>
      <div className="flex gap-12 items-center h-full">
        <Link
          className={`font-bold bg-[#1F1F1F] h-full flex items-center px-5`}
          to="/"
        >
          <img src={logo} className="h-8" alt="" />
        </Link>
        <nav className="flex gap-8">
          {/* Top level menu items /* 
          {/* (menu?.items || []).map((item) => (
            <Link
              key={item.id}
              to={'/'}
              target={item.target}
              className="font-semibold"
            >
              {item.title}
            </Link>
         {/* ))*/}
          <Link to={'/'} className="font-semibold">
            Home
          </Link>
          <Link to={'/collections'} className="font-semibold">
            Categories
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-1 pr-6">
        {/*  <div>
          <CountrySelectorHeader />
        </div>
          */}
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function CartBadge({dark}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark
          ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
          : 'text-contrast bg-primary'
      } absolute bottom-1 right-1 text-[0.625rem] font-semibold subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
