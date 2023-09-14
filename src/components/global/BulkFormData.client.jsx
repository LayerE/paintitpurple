import React, {useEffect, useState, useRef} from 'react';
// import {Layout} from '../index.server';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';
import {useForm, Controller, useWatch} from 'react-hook-form';
import {Button} from '..';
import axios from 'axios';

import {useRouteParams, useNavigate} from '@shopify/hydrogen';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function BulkFormData({product}) {
  const navigate = useNavigate();

  const {id} = useRouteParams();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState(null);
  const [sizeXS, setSizeXS] = useState(0);
  const [sizeS, setSizeS] = useState(0);
  const [sizeM, setSizeM] = useState(0);
  const [sizeL, setSizeL] = useState(0);
  const [sizeXl, setSizeXL] = useState(0);
  const [sizeXXL, setSizeXXL] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscondPrice, setTotalDiscondPrice] = useState(0);
  const [discondPrice, setDiscondPrice] = useState(0);
  const [discond, setDiscond] = useState(0);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [prodectImage, setProdectImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleKeyDown = (event) => {
    const {value} = event.target;
    if (value.length >= 5 && event.key !== 'Backspace') {
      event.preventDefault();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }

    if (
      (event.which != 8 && event.which != 0 && event.which < 48) ||
      event.which > 57
    ) {
      event.preventDefault();
    }
  };
  const handleWheel = (event) => {
    event.preventDefault();
  };

  const addSizeCount = () => {
    const toatal = sizeL + sizeM + sizeS + sizeXS + sizeXXL + sizeXl;
    const prodectPrice = prodectImage?.variants?.nodes[0]?.priceV2?.amount;
    setTotalSize(toatal);
    setTotalPrice(toatal * prodectPrice);
    if (toatal >= 150 && toatal < 250) {
      const discond = totalPrice * (10 / 100);
      setDiscondPrice(discond);
      setDiscond(10)

      setTotalDiscondPrice(totalPrice - discond);
    } else if (toatal >= 250) {
      const discond = totalPrice * (15 / 100);
      setDiscond(15)


      setDiscondPrice(discond);

      setTotalDiscondPrice(totalPrice - discond);
    } else {
      setDiscondPrice(0);
      setDiscond(0)


      setTotalDiscondPrice(totalPrice);
    }
  };
  useEffect(() => {
    addSizeCount();

    product.nodes.map((data) => {
      if (data.handle === `${id}`) {
        setProdectImage(data);
      }
    });
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    trigger,
    formState: {errors},
  } = useForm();
  // const watchAllFields = watch();
  // console.log(watchAllFields)

  const onSubmit = async (data) => {
    data.discond = discond
    data.totalPrice = totalPrice
    data.totalDiscondPrice = totalDiscondPrice
    data.image = prodectImage?.variants?.nodes[0]?.image?.url
    data.prodectName = prodectImage?.title
    data.prodectPrice = prodectImage?.variants?.nodes[0]?.priceV2?.amount
    data.totalCount =  totalSize
    data.discondPrice = discondPrice
    data.xs = sizeXS
    data.s = sizeS
    data.m = sizeM
    data.l = sizeL
    data.xl = sizeXl
    data.xxl = sizeXXL


    
    setLoading(true);

    try {
        // url: 'https://script.google.com/macros/s/AKfycbzR7E9GGpU2I4eEQUtxJ-K4twKLQhcpOhKwjg6OBmfbWp3ILjBODpvxkFcOZC7NWBRP/exec',

      const res = await axios({
        method: 'post',
        url:'https://script.google.com/macros/s/AKfycbx0iywKUJQdIsx8AK-U_LfvebYlhXV1mxPOJuC9JfRWb_RAZL90eeK2bAIdv9VBTx0T/exec',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (res.status === 200) {
        console.log('success');
        const titlename = prodectImage?.title;
        const stringWithHash = titlename;
        const stringWithoutHash = stringWithHash.replace('#', '');
        navigate(
          `/bulk-order/status/success/${totalSize}/${stringWithoutHash}`,
        );
      } else {
        toast.error('Submission failed. Please try again.');
      
      }
    } catch {
      toast.error('Error subscribing to newsletter!');
      console.log('some error');
    } finally {
      formRef?.current?.reset();
      // setFormLoader(false)
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-full py-12 frombox">
      <ToastContainer />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="formItem">
          {prodectImage?.variants?.nodes[0]?.image?.url ? (
            <img src={prodectImage?.variants?.nodes[0]?.image?.url} alt="" />
          ) : null}
        </div>
        <div className="pd">
          <div className="title">{prodectImage?.title}</div>
          <div className="price">
            ${prodectImage?.variants?.nodes[0]?.priceV2?.amount}
          </div>
        </div>
        <div className="formItem flex flex-col ">
          <label htmlFor="name" className=" font-medium label">
            1 - Your Name*
          </label>
          <input
          autocomplete="name"
            className=" bg-transparent border-0 outline-0 border-b-4"
            type="text"
            value={name}
            placeholder="John Doe"
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Name should contain only alphabets',
              },
            })}
            onChange={(e) => {
              setValue(e.target.name, e.target.value);
              // trigger('name');
              setName(e.target.value);
            }}
          />

          {errors.name ? <span>{errors.name.message} </span> : null}
        </div>
        <div className="formItem">
          <label htmlFor="name">2 - Email Address*</label>
          <input
            type="text"
          autocomplete="email"

            placeholder="John Doe@gmail.com"
            {...register('Email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email address.',
              },
            })}
            onChange={(e) => {
              setValue(e.target.name, e.target.value);
              // trigger('Email');
              setEmail(e.target.value);
            }}
          />
          {errors.Email ? <span>{errors.Email.message}</span> : null}
        </div>
       

        <div className="formItem">
          <label htmlFor="name">3- Size and Quantity*</label>
          <small>
            Unlock great discounts on your bulk order. 10% discount on your
            order above 150 pieces and 15% discount for an order above 250
            pieces.
          </small>

          <div className="sizeBox">
            <div className="sizeBoxItems">
              <div className="sizeBoxt">
                <label htmlFor="name">Extra Small (XS)</label>

                {errors.xs && <span>Field cannot be left blank. Please provide a value for this field.</span>}
              </div>
              <input
                type="number"
                // value={sizeXS}
                autocomplete="off"
                {...register('xs',   {  
                // required: 'Field cannot be left blank. Please provide a value for this field.',
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/})}
                onChange={(e) => {
                  setValue(e.target.xs, e.target.value);
                  // trigger('xs');

                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  setSizeXS(Number(e.target.value));

                  addSizeCount();
                }}
                // onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                onDrag={handleWheel}
                placeholder={0}

                onWheelCapture={handleWheel}
              />
            </div>
            <div className="sizeBoxItems">
              <div className="sizeBoxt">
                <label htmlFor="name">Small (S)</label>

                {errors.s && <span>Field cannot be left blank. Please provide a value for this field.</span>}
              </div>
              <input
                type="number"
                autocomplete="off"
                // value={null}
                {...register('s', {
                // required: 'Field cannot be left blank. Please provide a value for this field.',
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/})}
                
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
                  // trigger('s');
                  if (e.target.value < 0 ) {
                    e.target.value = 0;
                  }
                  let inputValue = e.target.value;
                  // if (inputValue[0] === '0' && inputValue.length > 1) {
                  //     inputValue = inputValue.slice(1);
                  //     console.log(inputValue)
                  // }
                  setSizeS(Number(e.target.value));
                  addSizeCount();
                }}
          

                
                // onKeyDown={handleKeyDown}
                placeholder={0}
                onWheel={handleWheel}
              />
            </div>
            <div className="sizeBoxItems">
              <div className="sizeBoxt">
                <label htmlFor="name">Medium (M)</label>

                {errors.m && <span>Field cannot be left blank. Please provide a value for this field.</span>}
              </div>
              <input
                type="number"
                // value={sizeM}
                autocomplete="off"

                {...register('m', { 
                // required: 'Field cannot be left blank. Please provide a value for this field.',
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/})}
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
                  // trigger('m');
                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  setSizeM(Number(e.target.value));
                  addSizeCount();
                }}
                // onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                placeholder={0}

              />
            </div>
            <div className="sizeBoxItems">
              <div className="sizeBoxt">
                <label htmlFor="name">Large (L)</label>

                {errors.l && <span>Field cannot be left blank. Please provide a value for this field.</span>}
              </div>
              <input
                type="number"
                autocomplete="off"
                // value={sizeL}
                // name="name"
                {...register('l', {
                // required: 'Field cannot be left blank. Please provide a value for this field.',
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/})}
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
                  // trigger('l');
                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  setSizeL(Number(e.target.value));
                  addSizeCount();
                }}
                // onKeyDown={handleKeyDown}
                placeholder={0}

              />
            </div>
            <div className="sizeBoxItems">
              <div className="sizeBoxt">
                <label htmlFor="name">Extra Large (XL)</label>

                {errors.xl && <span>Field cannot be left blank. Please provide a value for this field.</span>}
              </div>
              <input
                type="number"
                // value={sizeXl}
                autocomplete="off"
                {...register('xl', {
                // required: 'Field cannot be left blank. Please provide a value for this field.',
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/})}
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
                  // trigger('xl');
                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  setSizeXL(Number(e.target.value));
                  addSizeCount();
                }}
                // onKeyDown={handleKeyDown}
                placeholder={0}


                // name="name"
                // {...register("name", { required: true })}
              />
            </div>
            <div className="sizeBoxItems">
              <div className="sizeBoxt">
                <label htmlFor="name">Double Extra large (XXL)</label>

                {errors.xxl && <span>Field cannot be left blank. Please provide a value for this field.</span>}
              </div>
              <input
                type="number"
                autocomplete="off"
                // value={sizeXXL}
                {...register('xxl', {
                // required: 'Field cannot be left blank. Please provide a value for this field.',

                  pattern: /^(0|[1-9]\d*)(\.\d+)?$/})}
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
                  // trigger('xxl');
                  if (e.target.value < 0) {
                    e.target.value = 0;
                  }
                  setSizeXXL(Number(e.target.value));
                  addSizeCount();
                }}
                // onKeyDown={handleKeyDown}
                placeholder={0}


                // name="name"
                // {...register("name", { required: true })}
              />
            </div>
            <div className="sizeBoxItems">
              <div className="total ">Total Count</div>
              <div className="total p">{totalSize}</div>
            </div>
            {totalSize >= 1 ? (
              <div className="priceBOx">
                <div className="subrow">
                  <div className="testhead">Price</div>
                  <div className="testprice">${totalPrice}</div>
                </div>

                {totalSize >= 150 ? (
                  <div className="discordrow">
                    <div className="testhead pinkc">
                      {totalSize >= 250 ? '15%' : '10%'} discount unlocked
                    </div>
                    <div className="testprice pinkc">
                      -{'  '}${discondPrice}
                    </div>
                  </div>
                ) : null}
                {totalSize >= 0 ? (
                  <div>
                    <div className="subrow two">
                      <div className="testhead ">Total Bill</div>
                      <div className="testprice">${totalDiscondPrice}</div>
                    </div>
                    <small>
                      Applicable shipping rates will be charged to your order.
                      Our merchandiser will inform you of the final
                      order value soon.
                    </small>
                  </div>
                ) : null}
              </div>
            ) : null}

            {
              //   <div className="discondBox">
              //   <div className="discondBoxItems">
              //     <div className="totalPrice">
              //       {totalDiscondPrice > 0 ? (
              //         <s>${totalPrice}</s>
              //       ) : (
              //         <b>$ {totalPrice}</b>
              //       )}
              //     </div>
              //     {totalDiscondPrice > 0 ? (
              //       <div className="discordPrice">${totalDiscondPrice}</div>
              //     ) : null}
              //   </div>
              //   {totalSize >= 150 ? (
              //     <div className="discond">
              //       unlocked {totalSize >= 250 ? '15%' : '10%'} discount{' '}
              //     </div>
              //   ) : null}
              // </div>
            }
          </div>
          <div className="formItem">
            <label htmlFor="name">4 - Shipping Address*</label>
            <input
              className=""
          autocomplete="street-address"

              type="text"
              {...register('Address', {required: true, minLength: 15})}
              placeholder="A 39, Indl Area Delhi, Delhi, 110033"
              onChange={(e) => {
                // setValue(e.target.name, e.target.value);
                // trigger('Address');
                setAddress(e.target.value);
                addSizeCount();
              }}
              // name="name"
              // {...register('name', {required: true})}
            />
            {errors?.Address?.type === 'minLength' ? (
              <span>Please enter a valid address.</span>
            ) : errors?.Address ? (
              <span>This field is required</span>
            ) : null}
          </div>
        </div>
        <div className="btnbox">
          {loading ? (
            <button className="sBtn" disabled={true}>
              <Button>Loading ...</Button>
            </button>
          ) : (
            <button className="sBtn" type="submit">
              <Button>Place Order</Button>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
