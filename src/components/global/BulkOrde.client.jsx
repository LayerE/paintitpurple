import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, useRouteParams} from '@shopify/hydrogen';

import {Button} from '../elements/Button';

export function BulkOrdeCline() {
  const navigate = useNavigate();
  const {status, count, title} = useRouteParams();

  return (
    <div className="successpage">
      <div className="suucesCondentBox">
        <div className="seccesMessage">
          Your order of {count} of {title} has been sent to our
          merchandiser.{' '}
        </div>

        <div className="suucessdisceription">
          A copy of this order has been sent to the contact email address as
          well. If you do not receive this confirmation, please reach out to us
          at{' '}
          <a href="mailto:hello@layer-e.com" className="maillink">
            hello@layer-e.com
          </a>
        </div>
        <div className="suucessBtn">
          <button onClick={() => navigate('/')}>
            <Button className="btn-pink" variant={''}>
              Continue shopping
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
}
