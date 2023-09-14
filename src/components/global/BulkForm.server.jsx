import {Layout} from '../index.server';
import {BulkFormData} from './BulkFormData.client';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';

export function BulkForm() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: NOT_FOUND_QUERYs,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

  const {featuredProducts} = data;

  return (
    <Layout>
      <BulkFormData product={featuredProducts} />
    </Layout>
  );
}

const NOT_FOUND_QUERYs = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    featuredProducts: products(first: 250) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
