import { useSelector } from 'react-redux';
import { DealLayout } from '../../types/deal';
import InstallmentRaw from '../InstallmentRaw';
import { RootState } from '../../store/store';
import ClaimRaw from '../ClaimRaw';

type FicaCardsProps = {
  results: DealLayout[][] | DealLayout[];
};

export const FicaCards = (props: FicaCardsProps): JSX.Element => {
  const { results } = props;
  const routing: string = useSelector((state: RootState) => state.search.search.routing);

  return (
    <div>
      {results.map((item, index) =>
        routing === 'policy' ? (
          <InstallmentRaw key={index} ficaDocs={item as DealLayout[]} />
        ) : (
          <ClaimRaw key={index} ficaDocs={item as DealLayout[]} />
        )
      )}
    </div>
  );
};

export default FicaCards;
