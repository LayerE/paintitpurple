import {Money, useProductOptions} from '@shopify/hydrogen';

export function ProductPricing() {
  const {selectedVariant} = useProductOptions();
  const isOnSale =
    selectedVariant?.priceV2?.amount <
      selectedVariant?.compareAtPriceV2?.amount || false;
  return (
    <p className="text-3xl md:text-4xl font-medium">
      <Money withoutTrailingZeros data={selectedVariant.priceV2} as="span" />
      {isOnSale && (
        <Money
          withoutTrailingZeros
          data={selectedVariant.compareAtPriceV2}
          as="p"
          className="opacity-50 strike  ml-3 text-lg inline"
        />
      )}
    </p>
  );
}
