import { datGridColumns } from '../../utils/commons';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid, StyledDiv } from './InstallmentDataTable-styles';
import { DealLayout, DealTableLayout } from '../../types/deal';

type InstallmentDataTableProps = {
  ficaDocs: DealLayout[];
  headerItems: DealTableLayout;
};

const InstallmentDataTable = ({ ficaDocs, headerItems }: InstallmentDataTableProps) => {
  const tableColumns: GridColDef[] = datGridColumns(headerItems);

  return (
    <StyledDiv>
      <StyledDataGrid
        rows={ficaDocs}
        getRowId={(row: DealLayout) =>
          `${row.ficaDoc}-${row.businessPartnerId}-${row.premium}-${row.installment}`
        }
        columns={tableColumns}
      />
    </StyledDiv>
  );
};

export default InstallmentDataTable;
