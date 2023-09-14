import {Section} from '../index';
import {Button} from '~/components';
import {Link} from '@shopify/hydrogen';

const ApparelCollection = () => {
  return (
    <Section>
      <div className="apparel w-full min-h-[500px] h-[60vh] rounded-2xl px-4 md:px-8 flex items-center">
        <div className="w-full md:max-w-[400px]">
          <p className="text-black text-3xl md:text-5xl font-bold pb-2">
            The OG <br /> Web3 <br /> Apparel
          </p>
          <p className="text-xl md:text-2xl text-black pb-5 font-medium">
            A community-led initiative of fashionable & sustainable merch, so
            you can buidl in style.
          </p>
          <Link to="/collections/all-merch-1">
            <Button>
              <p>Shop Now</p>
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default ApparelCollection;
