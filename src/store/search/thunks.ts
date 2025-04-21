import axios from 'axios';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

import { BookingError, ClaimError, getAPIErrorMessage } from '../../utils/errors';
import { captialize, isEmptyString } from '../../utils/commons';
import { RootState } from '../store';
import { testResponse } from '../../utils/testData';
import { DealLayout, DealResponse } from '../../types/deal';
import { resetDocumentCounts, increaseFetchedDocuments, setTotalDocuments } from './reducerSlice';

const encodeStringIfContainsHash = (inputString: string | null) => {
  if (!inputString) {
    return inputString;
  }

  if (inputString.includes('#')) {
    // URL encode the string
    return encodeURIComponent(inputString);
  }
  return inputString;
};

export const getDealPremiums: AsyncThunk<DealResponse, void, object> = createAsyncThunk(
  'ficaDashboard/getDealPremiums',
  async (_: void, { getState, rejectWithValue, dispatch }) => {
    try {
      dispatch(resetDocumentCounts());

      const state = getState() as RootState;
      const {
        routing,
        externalReference,
        installment,
        premiumId,
        policyNumber,
        ficaDoc,
        sys,
        docType,
        endorsementReference,
        enteredOn,
        ucr,
        claimReference,
        transactionReference,
      } = state.search.search;

      const baseURL = 'v2/ficadashboardservice/ficadetails';

      let filter = '';
      if (!isEmptyString(routing)) {
        filter += `type eq '${captialize(routing)}'`;
      }

      if (!isEmptyString(ficaDoc)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `ficaDoc eq '${ficaDoc}'`;
      }

      if (!isEmptyString(premiumId)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `premiumId eq '${premiumId}'`;
      }

      if (!isEmptyString(policyNumber)) {
        if (!isEmptyString(filter.length)) {
          filter += ' and ';
        }
        filter += `policyNumber eq '${policyNumber}'`;
      }

      if (!isEmptyString(externalReference)) {
        if (!isEmptyString(filter.length)) {
          filter += ' and ';
        }
        filter += `externalReference eq '${encodeStringIfContainsHash(externalReference)}'`;
      }

      if (!isEmptyString(installment)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `installment eq '${installment}'`;
      }

      if (!isEmptyString(sys)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `sys eq '${sys}'`;
      }

      if (!isEmptyString(docType)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `docType eq '${docType}'`;
      }

      if (!isEmptyString(endorsementReference)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        let endorsementRef = endorsementReference;
        if (endorsementReference === '-') {
          endorsementRef = '';
        }
        filter += `endorsementReference eq '${encodeStringIfContainsHash(endorsementRef)}'`;
      }

      if (!isEmptyString(enteredOn)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `enteredOn eq datetime'${enteredOn}'`;
      }

      if (!isEmptyString(claimReference)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `claimReference eq '${claimReference}'`;
      }

      if (!isEmptyString(transactionReference)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `transactionReference eq '${transactionReference}'`;
      }

      if (!isEmptyString(ucr)) {
        if (!isEmptyString(filter)) {
          filter += ' and ';
        }
        filter += `ucr eq '${ucr}'`;
      }

      // Make following field as false when pushing changes to BTP
      const testLocal = false;
      let responseData: DealLayout[] = [];
      if (testLocal) {
        responseData = testResponse(routing);
      } else {
        let response = await axios.get(`${baseURL}?$filter=${filter}&$inlinecount=allpages`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        responseData = response.data.d.results;

        const totalCount = response.data.d.__count;
        dispatch(setTotalDocuments({ totalDocuments: totalCount }));

        let fetchedTotalCount = 1000;
        dispatch(increaseFetchedDocuments({ fetchedDocuments: fetchedTotalCount }));

        while (totalCount > fetchedTotalCount) {
          response = await axios.get(
            `${baseURL}?$filter=${filter}&$skiptoken=${fetchedTotalCount}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          );
          responseData = [...responseData, ...response.data.d.results];
          dispatch(increaseFetchedDocuments({ fetchedDocuments: response.data.d.results.length }));
          fetchedTotalCount += 1000;
        }
      }

      // Check response contains booking document to list in the view for policy
      let hasValidDocumentsToView = false;
      const filteredResponse = responseData.filter((item: DealLayout) => {
        if (routing === 'policy' && item.installment !== '') {
          if (!hasValidDocumentsToView && ['PO', 'EN'].includes(item.docType as string)) {
            hasValidDocumentsToView = true;
          }
          return item;
        } else if (routing === 'claim') {
          if (!hasValidDocumentsToView && ['DM', 'SC', 'RC'].includes(item.docType as string)) {
            hasValidDocumentsToView = true;
          }
          return item;
        }
      });

      if (!hasValidDocumentsToView && routing === 'policy' && responseData.length > 0) {
        throw new BookingError();
      } else if (!hasValidDocumentsToView && routing === 'claim' && responseData.length > 0) {
        throw new ClaimError();
      }

      return {
        results: filteredResponse,
      };
    } catch (error) {
      return rejectWithValue(getAPIErrorMessage(error));
    }
  }
);
