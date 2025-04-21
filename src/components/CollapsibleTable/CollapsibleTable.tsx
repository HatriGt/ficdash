import {
  StyledBox,
  StyledDataSection,
  StyledInnerTableHead,
  StyledTableHead,
  StyledThirdLevelBox,
  StyledThirdLevelTableHead,
} from './CollapsibleTable-styles';
import { DealLayout, DealTableLayout } from '../../types/deal';
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { convertDate } from '../../utils/commons';
import numeral from 'numeral';
import Decimal from 'decimal.js';

type CollapsibleTableProps = {
  ficaDocs: DealLayout[];
  firstLevelHeaderItems: DealTableLayout;
  secondLevelHeaderItems: DealTableLayout;
  isThirdLevelCollapseRequired: boolean;
  isSecondLevelCollapseRequired: boolean;
  thirdLevelHeaderItems: DealTableLayout;
};

type CollapsibleFirstLevelRowProps = {
  row: DealLayout;
  firstLevelHeaderItems: DealTableLayout;
  secondLevelHeaderItems: DealTableLayout;
  isSecondLevelCollapseRequired: boolean;
  isThirdLevelCollapseRequired?: boolean;
  thirdLevelHeaderItems: DealTableLayout;
};

type CollapsibleThirdLevelRowProps = {
  row: DealLayout;
  secondLevelHeaderItems: DealTableLayout;
  isThirdLevelCollapseRequired?: boolean;
  thirdLevelHeaderItems: DealTableLayout;
};

export const renderCellData = (header: string, value: string) => {
  const emptyCondition = value === '' || value === undefined || value === null;
  switch (header) {
    case 'collectionType':
    case 'clearingDocument':
    case 'bankReference':
    case 'memberName':
    case 'memberID':
      return emptyCondition ? '-' : value;
    case 'dueDate':
    case 'postingDate':
    case 'clearingDate':
      return emptyCondition ? '-' : convertDate(value);
    case 'originalAmount':
    case 'settlementAmount':
    case 'clearedAmount':
    case 'openBalance':
      return numeral(value).format('0,0.00');
    case 'externalROE':
      return String(new Decimal(value).toFixed(5));
    default:
      return value;
  }
};

const ThirdLevelRow = ({
  row,
  secondLevelHeaderItems,
  thirdLevelHeaderItems,
}: CollapsibleThirdLevelRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Object.keys(secondLevelHeaderItems).map((header: string, index: number) => {
          return (
            <TableCell
              key={index}
              align={secondLevelHeaderItems[header].align}
              component="th"
              scope="row">
              {renderCellData(header, row[header] as string)}
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StyledThirdLevelBox>
              {(row.clearedDocs as DealLayout[])?.length > 0 ? (
                <StyledDataSection>
                  <Table size="small" aria-label="purchases">
                    <StyledThirdLevelTableHead>
                      <TableRow>
                        {Object.keys(thirdLevelHeaderItems).map((header: string, index: number) => {
                          return (
                            <TableCell
                              key={index}
                              align={thirdLevelHeaderItems[header].align}
                              sx={{
                                minWidth: thirdLevelHeaderItems[header].minWidth,
                                maxWidth: thirdLevelHeaderItems[header].maxWidth,
                              }}>
                              {thirdLevelHeaderItems[header].displayName}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </StyledThirdLevelTableHead>
                    <TableBody>
                      {(row.clearedDocs as DealLayout[]).map((doc: DealLayout, index: number) => (
                        <TableRow key={index}>
                          {Object.keys(thirdLevelHeaderItems).map(
                            (header: string, index: number) => {
                              return (
                                <TableCell
                                  key={index}
                                  align={thirdLevelHeaderItems[header].align}
                                  component="th"
                                  scope="row">
                                  {renderCellData(header, doc[header] as string)}
                                </TableCell>
                              );
                            }
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </StyledDataSection>
              ) : (
                <StyledDataSection>
                  <Typography variant="subtitle2">No clearing data found</Typography>
                </StyledDataSection>
              )}
            </StyledThirdLevelBox>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const SecondLevelRow = ({
  row,
  firstLevelHeaderItems,
  secondLevelHeaderItems,
  isSecondLevelCollapseRequired,
  isThirdLevelCollapseRequired,
  thirdLevelHeaderItems,
}: CollapsibleFirstLevelRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {isSecondLevelCollapseRequired ? (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : null}
        {Object.keys(firstLevelHeaderItems).map((header: string, index: number) => {
          return (
            <TableCell
              key={index}
              align={firstLevelHeaderItems[header].align}
              component="th"
              scope="row"
              style={
                !isSecondLevelCollapseRequired
                  ? { paddingTop: '11px', paddingBottom: '11px' }
                  : undefined
              }>
              {renderCellData(header, row[header] as string)}
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StyledBox>
              {(row.clearedDocs as DealLayout[])?.length > 0 ? (
                <StyledDataSection>
                  <Table size="small" aria-label="second-level-breakdown">
                    <StyledInnerTableHead>
                      <TableRow>
                        {isThirdLevelCollapseRequired ? <TableCell /> : null}
                        {Object.keys(secondLevelHeaderItems).map(
                          (header: string, index: number) => {
                            return (
                              <TableCell
                                key={index}
                                align={secondLevelHeaderItems[header].align}
                                sx={{
                                  minWidth: secondLevelHeaderItems[header].minWidth,
                                  maxWidth: secondLevelHeaderItems[header].maxWidth,
                                }}>
                                {secondLevelHeaderItems[header].displayName}
                              </TableCell>
                            );
                          }
                        )}
                      </TableRow>
                    </StyledInnerTableHead>
                    <TableBody>
                      {(row.clearedDocs as DealLayout[]).map((doc: DealLayout, index: number) =>
                        isThirdLevelCollapseRequired ? (
                          <ThirdLevelRow
                            key={index}
                            row={doc}
                            secondLevelHeaderItems={secondLevelHeaderItems}
                            thirdLevelHeaderItems={thirdLevelHeaderItems}
                          />
                        ) : (
                          <TableRow key={index}>
                            {Object.keys(secondLevelHeaderItems).map(
                              (header: string, index: number) => {
                                return (
                                  <TableCell
                                    key={index}
                                    align={secondLevelHeaderItems[header].align}
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
                </StyledDataSection>
              ) : (
                <StyledDataSection>
                  <Typography variant="subtitle2">No clearing data found</Typography>
                </StyledDataSection>
              )}
            </StyledBox>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CollapsibleTable = ({
  ficaDocs,
  firstLevelHeaderItems,
  secondLevelHeaderItems,
  isThirdLevelCollapseRequired,
  isSecondLevelCollapseRequired,
  thirdLevelHeaderItems,
}: CollapsibleTableProps) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: '100%', width: '100%', overflowX: 'auto' }}>
      <Table aria-label="collapsible table" size="small">
        <StyledTableHead>
          <TableRow>
            {isSecondLevelCollapseRequired ? <TableCell /> : null}
            {Object.keys(firstLevelHeaderItems).map((header: string, index: number) => {
              return (
                <TableCell
                  key={index}
                  align={firstLevelHeaderItems[header].align}
                  sx={{
                    minWidth: firstLevelHeaderItems[header].minWidth,
                    maxWidth: firstLevelHeaderItems[header].maxWidth,
                  }}>
                  {firstLevelHeaderItems[header].displayName}
                </TableCell>
              );
            })}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {ficaDocs.map((row, index) => (
            <SecondLevelRow
              key={index}
              row={row}
              firstLevelHeaderItems={firstLevelHeaderItems}
              secondLevelHeaderItems={secondLevelHeaderItems}
              isSecondLevelCollapseRequired={isSecondLevelCollapseRequired}
              isThirdLevelCollapseRequired={isThirdLevelCollapseRequired}
              thirdLevelHeaderItems={thirdLevelHeaderItems}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
