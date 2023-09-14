import clsx from 'clsx';
import {Link} from '@shopify/hydrogen';
import '../../styles/Button.scss';

import {missingClass} from '~/lib/utils';

export function Button({
  as = 'button',
  className = '',
  variant = 'primary',
  width = 'auto',
  ...props
}) {
  const Component = props?.to ? Link : as;

  const baseButtonClasses =
    'inline-block rounded font-semibold text-center py-3 px-6';

  const variants = {
    primary: `${baseButtonClasses} bg-primary text-contrast`,
    secondary: `${baseButtonClasses} border border-primary/10 bg-contrast text-primary`,
    inline: 'border-b border-primary/10 leading-none pb-1',
  };

  const widths = {
    auto: 'w-auto',
    full: 'w-full',
  };

  const styles = clsx(
    // missingClass(className, 'bg-') && variants[variant],
    'button ribbon-outset border relative',
    className,
  );

  // return <Component className={styles} {...props} />;
  return (
    <div className="flex justify-center text-center">
      <div className="button__outer mx-auto ">
        <div to={props.to} className={styles}>
          <div className="button__inner" {...props}></div>
        </div>
      </div>
    </div>
  );
}
