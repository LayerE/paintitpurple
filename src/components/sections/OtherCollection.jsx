import {Section} from '../index';
import {Button} from '~/components';
import {Link} from '@shopify/hydrogen';

const OtherCollection = () => {
  return (
    <Section>
      <div className="flex flex-wrap gap-5 justify-around">
        <div className="w-full md:w-[48%] text-center h-[650px] relative px-4 py-10 overflow-hidden rounded-xl bg-[#5A1BFF] text-white">
          <div className="relative" style={{zIndex: '3'}}>
            <p className="text-3xl md:text-5xl font-bold pb-3">
              The OG Web3 <br /> Accesories
            </p>
            <p className="text-xl md:text-2xl  pb-5 font-medium">
              Bags, bottles, laptop sleeves & more - everything to help you
              buidl.
            </p>
            <Link to="/collections/accessories">
              <Button>
                <p>Shop Now</p>
              </Button>
            </Link>
          </div>

          <img
            src={
              'https://cdn.shopify.com/s/files/1/0661/7822/0258/files/accesories.png?v=1662469016'
            }
            className="absolute w-full left-0 h-[60%] bottom-0 object-cover z-0 object-top"
            alt=""
          />
        </div>
        <div className="w-full md:w-[48%] text-center h-[650px] relative px-4 py-10 overflow-hidden rounded-xl bg-[#FBB501]">
          <div className="relative" style={{zIndex: '3'}}>
            <p className="text-black text-3xl md:text-5xl font-bold pb-3">
              Look out for some <br /> additional products
            </p>
            <p className="text-xl md:text-2xl text-black pb-5 font-medium">
              Notebooks, neck pillows, coffee mugs & more - friendly companions
              to your OG web3 merch.
            </p>
            <Link to="/collections/additionals">
              <Button>
                <p>Shop Now</p>
              </Button>
            </Link>
          </div>
          <img
            src={
              'https://cdn.shopify.com/s/files/1/0661/7822/0258/files/addtionals.png?v=1662469016'
            }
            className="absolute w-full left-0 h-[60%] bottom-0 object-cover z-0 object-top"
            alt=""
          />
        </div>

       
      </div>
    </Section>
  );
};

export default OtherCollection;
