import {CartDetails} from '~/components/cart';
import {Drawer} from './Drawer.client';

export function CartDrawer({isOpen, onClose}) {
  return (
    <Drawer open={isOpen} onClose={onClose} heading="My Cart" openFrom="right">
      <div className="grid">
        <CartDetails layout="drawer" onClose={onClose} />
      </div>
    </Drawer>
  );
}
