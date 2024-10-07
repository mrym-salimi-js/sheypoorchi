import Banner from './Banner';
import { DealWarning } from './DealWarning';
import { Connections } from './Connections';
import Attributes from './Attributes';
import { Descriptions } from './Descriptions';

export default function AdInfo() {
  return (
    <div className='w-full lg:w-[55%] h-auto flex flex-col'>
      <Banner />
      <DealWarning />
      <Connections />
      <Attributes />
      <Descriptions />
    </div>
  );
}
