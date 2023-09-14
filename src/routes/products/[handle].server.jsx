import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  useUrl
} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PAGINATION_SIZE} from '~/lib/const';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {getExcerpt} from '~/lib/utils';
import {NotFound, Layout, ProductSwimlane} from '~/components/index.server';
import {
  Heading,
  ProductDetail,
  ProductForm,
  ProductGallery,
  ProductPricing,
  Section,
  Text,
} from '~/components';

export default function Product() {
  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product, shop},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });



const {searchParams} = useUrl();
const pageBy = 48;


  const comingDat = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle:"coming-soon-1",
      country: countryCode,
      language: languageCode,
      pageBy,
    },
    preload: true,
  });
  const comingsoon = comingDat?.data.collection.products.nodes



  if (!product) {
    return <NotFound type="product" />;
  }
  

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
    },
  });
  const {media, title, vendor, descriptionHtml, id} = product;
  const {shippingPolicy, refundPolicy} = shop;

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductOptionsProvider data={product}>
        <Section padding="x" className="px-0">
          <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-2 ">
            <ProductGallery
              media={media.nodes}
              className="w-screen md:w-full lg:col-span-1"
            />

            <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
              <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-xl md:px-0">
                <div className="grid gap-2">
                  <Heading
                    as="h1"
                    format
                    className="whitespace-normal text-3xl md:text-5xl"
                  >
                    {title}
                  </Heading>
                  {vendor && (
                    <Text className={'opacity-50 font-semibold'}>{vendor}</Text>
                  )}
                </div>
                <ProductPricing />
                <ProductForm  soon={comingsoon} product={product}/>
                <div className="grid gap-4 py-4">
                  {descriptionHtml && (
                    <ProductDetail
                      title="Product Details"
                      content={descriptionHtml}
                    />
                  )}
                  {shippingPolicy?.body && (
                    <ProductDetail
                      title="Shipping"
                      content={getExcerpt(shippingPolicy.body)}
                      learnMore={`/policies/${shippingPolicy.handle}`}
                    />
                  )}
                  {refundPolicy?.body && (
                    <ProductDetail
                      title="Returns"
                      content={getExcerpt(refundPolicy.body)}
                      learnMore={`/policies/${refundPolicy.handle}`}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* <ProductsPopup data={media.nodes} /> */}
        </Section>
        <Suspense>
          <ProductSwimlane title="More Like This" data={id} />
        </Suspense>
      </ProductOptionsProvider>
    </Layout>
  );
}

const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;
