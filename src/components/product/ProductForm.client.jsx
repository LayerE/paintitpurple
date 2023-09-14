import {useEffect, useCallback, useState, useRef} from 'react';

import {
  useProductOptions,
  isBrowser,
  useUrl,
  useNavigate,
  AddToCartButton,
} from '@shopify/hydrogen';

import {Text, Button, ProductOptions} from '~/components';
import {useDrawer} from '../index';
import {CartDrawer} from '../global/CartDrawer.client';

export function ProductForm({soon,product}) {
  const navigate = useNavigate();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const buttonRef = useRef();

  const handleCustomOnClick = async (event) => {
    setTimeout(() => {
      openCart();
    }, 1000);
  };

  const {pathname, search} = useUrl();
  const [params, setParams] = useState(new URLSearchParams(search));

  const {options, setSelectedOption, selectedOptions, selectedVariant} =
    useProductOptions();
   
    const isComing = soon.some(obj => obj.id === product.id);
console.log(isComing,soon,"fdgfdgfdg",product)
  const isOutOfStock = !selectedVariant?.availableForSale || false;

  const lastNumbers = pathname.slice(pathname.lastIndexOf('/') + 1);
  console.log(lastNumbers);
 

  useEffect(() => {
    if (params || !search) return;
    setParams(new URLSearchParams(search));
  }, [params, search]);

  useEffect(() => {
    options.map(({name, values}) => {
      if (!params) return;
      const currentValue = params.get(name.toLowerCase()) || null;
      if (currentValue) {
        const matchedValue = values.filter(
          (value) => encodeURIComponent(value.toLowerCase()) === currentValue,
        );
        setSelectedOption(name, matchedValue[0]);
      } else {
        params.set(
          encodeURIComponent(name.toLowerCase()),
          encodeURIComponent(selectedOptions[name].toLowerCase()),
        ),
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
      }
    });
  }, []);

  const handleChange = useCallback(
    (name, value) => {
      setSelectedOption(name, value);
      if (!params) return;
      params.set(
        encodeURIComponent(name.toLowerCase()),
        encodeURIComponent(value.toLowerCase()),
      );
      if (isBrowser()) {
        window.history.replaceState(
          null,
          '',
          `${pathname}?${params.toString()}`,
        );
      }
    },
    [setSelectedOption, params, pathname],
  );

  return (
    <form className="grid gap-10">
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      {
        
        <div className="grid gap-4">
          {options.map(({name, values}) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
              >
                <p className="min-w-[4rem] font-medium text-xl pb-2">
                  {name.toLowerCase() === 'size'
                    ? 'Please Select A Size.'
                    : name}
                </p>
                <div className="flex flex-wrap items-baseline gap-4">
                  <ProductOptions
                    name={name}
                    handleChange={handleChange}
                    values={values}
                  />
                </div>
              </div>
            );
          })}
        </div>
      }

      <div className="grid items-stretch justify-start gap-4 pl-4 cardbtn">
      {
        isComing?(
          <div
          className="bulkbtn"
         
        >
          <p className="flex items-center justify-center gap-2 w-full h-full">
            <span>Coming Soon</span>
          </p>
        </div>
        ): (
          <>
          <AddToCartButton
          variantId={selectedVariant?.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
          type="button"
          onClick={handleCustomOnClick}
          buttonRef={buttonRef}
        >
          <Button
            width="full"
            variant={isOutOfStock ? 'secondary' : 'primary'}
            as="button"
            className="btn-pink btn-full"
          >
            {isOutOfStock ? (
              <p className="flex items-center justify-center gap-2 w-full h-full">
                <span>Out of Stock</span>
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2 w-full h-full">
                <span>Add to Cart</span>
              </p>
            )}
          </Button>
        </AddToCartButton>
        <button
        className="bulkbtn"
        onClick={() => {
          navigate(`/bulk-order/${lastNumbers}`);
        }}
      >
        <p className="flex items-center justify-center gap-2 w-full h-full">
          <span>Order in bulk</span>
        </p>
      </button>
          
          </>
        )
      }
        
       

        {/* {!isOutOfStock && <ShopPayButton variantIds={[selectedVariant.id]} />} */}
      </div>
    </form>
  );
}
