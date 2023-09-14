import {useRouteParams} from '@shopify/hydrogen';
import {BulkOrdeCline} from './BulkOrde.client';
import {Layout} from '../index.server';

function BulkOrde() {
  const {status} = useRouteParams();

  return (
    <Layout>
      <BulkOrdeCline />
    </Layout>
  );
}

export default BulkOrde;
