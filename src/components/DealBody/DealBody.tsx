import {
  Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { StyledCreditorNoDataSection, StyledDiv } from './DealBody-styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { convertDate } from '../../utils/commons';
import numeral from 'numeral';
import { DealLayout, DealSectionProps } from '../../types/deal';
import { useState } from 'react';
import {
  ClaimCreditorPayableBreakdown,
  ClaimCreditorReleasedBreakdown,
  ClaimDebtorMemberBreakdown,
  ClaimDebtorMemberClearingBreakdown,
  ClDocumentSummary,
  ClearingDocumentBreakdownForCreditors,
  ClearingDocumentBreakdownForDebtors,
  InstallmentBreakdown,
  InstallmentCommissionBreakdown,
  MemberConsolidatedInstallmentBreakdown,
  MemberInstallmentBreakdown,
} from '../../utils/constants';
import CollapsibleTable from '../CollapsibleTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { GridMoreVertIcon } from '@mui/x-data-grid';
import { StyledTableSummaryHead } from '../CollapsibleTable/CollapsibleTable-styles';
import { renderCellData } from '../CollapsibleTable/CollapsibleTable';

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

type DealBodyProps = {
  processedData: DealSectionProps[];
  isCreditors: boolean;
  isCommision?: boolean;
};
export const DealBody = (props: DealBodyProps): JSX.Element => {
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  const [expandedMoreInfoPanelsPolicy, setExpandedMoreInfoPanelsPolicy] = useState<string[]>([]);
  const [expandedMoreInfoPanelsClaim, setExpandedMoreInfoPanelsClaim] = useState<string[]>([]);
  const [rotateMoreInfoIcon, setRotateMoreInfoIcon] = useState<number[]>([]);

  const routing: string = useSelector((state: RootState) => state.search.search.routing);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    if (newExpanded) {
      setExpandedPanels((prevExpandedPanels) => [...prevExpandedPanels, panel]);
    } else {
      setExpandedPanels((prevExpandedPanels) =>
        prevExpandedPanels.filter((item) => item !== panel)
      );
    }
  };

  const handleMoreInfoChange =
    (
      panel: string,
      expandedMoreInfoPanels: string[],
      setExpandedMoreInfoPanels: (data: any) => void
    ) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

      if (expandedMoreInfoPanels.includes(panel)) {
        setExpandedMoreInfoPanels((prevExpanded: any) =>
          prevExpanded.filter((item: any) => item !== panel)
        );
        setRotateMoreInfoIcon((prevExpanded) =>
          prevExpanded.filter((_item, index) => index !== expandedMoreInfoPanels.indexOf(panel))
        );
      } else {
        setExpandedMoreInfoPanels((prevExpanded: any) => [...prevExpanded, panel]);
        setRotateMoreInfoIcon((prevExpanded) => [...prevExpanded, 90]);
      }
    };

  const section = props.isCommision
    ? 'commissionSection'
    : props.isCreditors
      ? 'creditSection'
      : 'debitSection';

  return (
    <StyledDiv>
      <Grid item xs={12}>
        {props.processedData.map((data, index) => {
          if (
            !data[`${section}`]?.tr ||
            (routing === 'policy' &&
              section === 'creditSection' &&
              data[`${section}`].data.length === 0)
          ) {
            return null;
          }

          console.log(data['creditSection']);
          return (
            <Accordion
              key={index}
              expanded={expandedPanels.includes(`panel-${index}`)}
              onChange={handleChange(`panel-${index}`)}>
              <AccordionSummary
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2">Transaction</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {data[`${section}`]?.tr.transaction as string}
                      </Typography>
                    </Grid>
                    {routing === 'policy' ? (
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2">Endorsement Ref</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {data[`${section}`]?.tr.endorsementReference !== ''
                            ? (data[`${section}`]?.tr.endorsementReference as string)
                            : '-'}
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2">Transaction Ref</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {data[`${section}`]?.tr.transactionReference !== ''
                            ? (data[`${section}`]?.tr.transactionReference as string)
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    )}

                    {!props.isCreditors ? (
                      <Grid item xs={12} sm={props.isCommision ? 3 : 2}>
                        <Typography variant="body2">Posting Date</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {convertDate(data[`${section}`]?.tr.postingDate as string)}
                        </Typography>
                      </Grid>
                    ) : null}

                    {(props.isCreditors && routing === 'claim') ||
                    (!props.isCreditors && !props.isCommision && routing === 'policy') ? (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2">Business Partner</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {convertDate(data[`${section}`]?.tr.businessPartner as string)}
                        </Typography>
                      </Grid>
                    ) : null}

                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2">
                        {routing === 'policy'
                          ? props.isCommision
                            ? 'Commision'
                            : 'Premium'
                          : 'Claim'}{' '}
                        Amount
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {`${data[`${section}`]?.tr.originalCurrency as string} ${numeral(data[`${section}`]?.tr.originalAmount as string).format('0,0.00')}`}
                      </Typography>
                    </Grid>
                    {!props.isCommision ? (
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2">
                          Cleared/{section === 'debitSection' ? 'Collected' : 'Released'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {`${data[`${section}`]?.tr.originalCurrency as string} ${numeral(data[`${section}`]?.tr.clearedAmount as string).format('0,0.00')}`}
                        </Typography>
                      </Grid>
                    ) : null}
                    {(routing === 'policy' && !props.isCreditors && !props.isCommision) ||
                    (routing === 'claim' && props.isCreditors) ? (
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2">Business Partner ID</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {convertDate(data[`${section}`]?.tr.businessPartnerId as string)}
                        </Typography>
                      </Grid>
                    ) : null}

                    {routing === 'policy' && !props.isCreditors && !props.isCommision ? (
                      <Grid item xs={0.5} sx={{ zIndex: 5000 }}>
                        <IconButton
                          onClick={handleMoreInfoChange(
                            `panel-${index}`,
                            expandedMoreInfoPanelsPolicy,
                            setExpandedMoreInfoPanelsPolicy
                          )}>
                          <GridMoreVertIcon
                            sx={{
                              transform: `rotate(${rotateMoreInfoIcon[expandedMoreInfoPanelsPolicy.indexOf(`panel-${index}`)]}deg)`,
                              transition: 'transform 0.3s',
                            }}
                          />
                        </IconButton>
                      </Grid>
                    ) : null}

                    {routing === 'claim' && props.isCreditors && !props.isCommision ? (
                      <Grid item xs={0.5} sx={{ zIndex: 5000 }}>
                        <IconButton
                          onClick={handleMoreInfoChange(
                            `panel-${index}`,
                            expandedMoreInfoPanelsClaim,
                            setExpandedMoreInfoPanelsClaim
                          )}>
                          <GridMoreVertIcon
                            sx={{
                              transform: `rotate(${rotateMoreInfoIcon[expandedMoreInfoPanelsClaim.indexOf(`panel-${index}`)]}deg)`,
                              transition: 'transform 0.3s',
                            }}
                          />
                        </IconButton>
                      </Grid>
                    ) : null}
                  </div>

                  {expandedMoreInfoPanelsPolicy.includes(`panel-${index}`) ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                        }}>
                        <Grid item xs={12} sm={1.67}>
                          <Typography variant="body2">Premium ID</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {data[`${section}`]?.tr.premiumId as string}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1.67}>
                          <Typography variant="body2">Premium Tax Amount</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {`${data[`${section}`]?.tr.originalCurrency as string} ${numeral(data[`${section}`]?.tr.taxAmount as string).format('0,0.00')}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography variant="body2">Premium Net Amount</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {`${data[`${section}`]?.tr.originalCurrency as string} ${numeral(data[`${section}`]?.tr.netAmount as string).format('0,0.00')}`}
                          </Typography>
                        </Grid>
                      </div>
                    </div>
                  ) : null}
                  {expandedMoreInfoPanelsClaim.includes(`panel-${index}`) ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                        }}>
                        <Grid item xs={12} style={{ paddingRight: 30 }}>
                          <TableContainer
                            component={Paper}
                            style={{
                              maxWidth: '100%',
                              width: '100%',
                              overflowX: 'auto',
                              marginTop: 24,
                            }}>
                            <Table aria-label="collapsible table" size="small">
                              <StyledTableSummaryHead>
                                <TableRow>
                                  {Object.keys(ClDocumentSummary).map(
                                    (header: string, index: number) => {
                                      return (
                                        <TableCell
                                          key={index}
                                          align={ClDocumentSummary[header].align}
                                          sx={{
                                            minWidth: ClDocumentSummary[header].minWidth,
                                            maxWidth: ClDocumentSummary[header].maxWidth,
                                          }}>
                                          {ClDocumentSummary[header].displayName}
                                        </TableCell>
                                      );
                                    }
                                  )}
                                </TableRow>
                              </StyledTableSummaryHead>
                              <TableBody>
                                {(data['creditSection'].tr.summary as DealLayout[]).map(
                                  (doc: DealLayout, index: number) => (
                                    <TableRow key={index}>
                                      {Object.keys(ClDocumentSummary).map(
                                        (header: string, index: number) => {
                                          return (
                                            <TableCell
                                              key={index}
                                              align={ClDocumentSummary[header].align}
                                              component="th"
                                              scope="row">
                                              {renderCellData(header, doc[header] as string)}
                                            </TableCell>
                                          );
                                        }
                                      )}
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </div>
                    </div>
                  ) : null}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {props.isCommision ? (
                  <CollapsibleTable
                    ficaDocs={data[`${section}`]?.data ?? []}
                    firstLevelHeaderItems={InstallmentCommissionBreakdown}
                    secondLevelHeaderItems={InstallmentBreakdown}
                    isSecondLevelCollapseRequired={false}
                    isThirdLevelCollapseRequired={false}
                    thirdLevelHeaderItems={{}}
                  />
                ) : section === 'debitSection' ? (
                  <CollapsibleTable
                    ficaDocs={data[`${section}`].data}
                    firstLevelHeaderItems={
                      routing === 'policy' ? InstallmentBreakdown : ClaimDebtorMemberBreakdown
                    }
                    secondLevelHeaderItems={
                      routing === 'policy'
                        ? ClearingDocumentBreakdownForDebtors
                        : ClaimDebtorMemberClearingBreakdown
                    }
                    isSecondLevelCollapseRequired={true}
                    isThirdLevelCollapseRequired={false}
                    thirdLevelHeaderItems={{}}
                  />
                ) : data[`${section}`]?.data?.length ?? 0 > 0 ? (
                  <CollapsibleTable
                    ficaDocs={data[`${section}`]?.data ?? []}
                    firstLevelHeaderItems={
                      routing === 'policy'
                        ? MemberConsolidatedInstallmentBreakdown
                        : ClaimCreditorPayableBreakdown
                    }
                    secondLevelHeaderItems={
                      routing === 'policy'
                        ? MemberInstallmentBreakdown
                        : ClaimCreditorReleasedBreakdown
                    }
                    isSecondLevelCollapseRequired={true}
                    isThirdLevelCollapseRequired={routing === 'policy'}
                    thirdLevelHeaderItems={
                      routing === 'policy' ? ClearingDocumentBreakdownForCreditors : {}
                    }
                  />
                ) : (
                  <StyledCreditorNoDataSection>
                    <Typography variant="subtitle2">No creditor data found</Typography>
                  </StyledCreditorNoDataSection>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
    </StyledDiv>
  );
};

export default DealBody;
