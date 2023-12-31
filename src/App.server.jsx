import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server'
import {
  FileRoutes,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  CartProvider,
} from '@shopify/hydrogen';
import {HeaderFallback, EventsListener} from '~/components';
import {DefaultSeo, NotFound, BulkForm} from '~/components/index.server';
import BulkOrde from '~/components/global/BulkOrde.server';





function App({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  return (
    <Suspense fallback={<HeaderFallback isHome={isHome} />}>
      <EventsListener />
  
      <ShopifyProvider countryCode={countryCode}>
        <CartProvider countryCode={countryCode}>
          <Suspense>
            <DefaultSeo />
          </Suspense>
          <Router>
            <FileRoutes
              basePath={countryCode ? `/${countryCode}/` : undefined}
            />
            <Route path="/bulk-order/:id" page={<BulkForm />} />
            <Route path="/bulk-order/status/:status/:count/:title" page={<BulkOrde />} />


            <Route path="*" page={<NotFound />} />

          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
