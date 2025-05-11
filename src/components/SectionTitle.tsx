import { ReactNode } from 'react';
import SectionDecorator from './icons/SectionDecorator';

interface Props {
  title: string;
}

const SectionTitle = ({ title }: Props) => {
  return (
    <div className={'flex items-center gap-4 mb-10'}>
      <SectionDecorator
        width={25}
        className={'animate-spin duration-7000'}
        title={title}
      />

      <h2 className={'text-xl uppercase leading-none'}>{title}</h2>
    </div>
  );
};

export default SectionTitle;
