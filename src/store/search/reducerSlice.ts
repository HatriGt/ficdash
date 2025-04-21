import { createSlice } from '@reduxjs/toolkit';
import { getDealPremiums } from './thunks';
import { SearchState } from '../../types/searchState';

const initialState: SearchState = {
  search: {
    routing: 'policy',
    externalReference: '',
    installment: '',
    premiumId: '',
    umr: '',
    policyNumber: '',
    ficaDoc: '',
    endorsementReference: '',
    sys: '',
    environment: 'Prod',
    docType: '',
    enteredOn: '',
    ucr: '',
    claimReference: '',
    transactionReference: '',
  },
  results: [],
  totalCount: 0,
  isLoading: false,
  showError: false,
  error: null,
  totalDocuments: 0,
  fetchedDocuments: 0,
};

const searchReducer = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setRouting: (state, action) => {
      state.search.routing = action.payload.routing;
      state.results = [];
      state.totalCount = 0;
      state.totalDocuments = 0;
      state.fetchedDocuments = 0;
      if (action.payload.routing === 'policy') {
        state.search.claimReference = '';
        state.search.ucr = '';
        state.search.transactionReference = '';
        state.search.docType = '';
      } else {
        state.search.installment = '';
        state.search.premiumId = '';
        state.search.endorsementReference = '';
      }
    },
    setExternalReference: (state, action) => {
      state.search.externalReference = action.payload.externalReference;
    },
    setInstallment: (state, action) => {
      state.search.installment = action.payload.installment;
    },
    setPremiumId: (state, action) => {
      state.search.premiumId = action.payload.premiumId;
    },
    setUMR: (state, action) => {
      state.search.umr = action.payload.umr;
    },
    setPolicyNumber: (state, action) => {
      state.search.policyNumber = action.payload.policyNumber;
    },
    setFicaDOC: (state, action) => {
      state.search.ficaDoc = action.payload.ficaDoc;
    },
    setSys: (state, action) => {
      state.search.sys = action.payload.sys;
    },
    setEnvironment: (state, action) => {
      state.search.environment = action.payload.environment;
      if (state.search.environment === 'prod') {
        state.search.sys = '';
      }
      localStorage.setItem('APP_ENVIRONMENT', state.search.environment as string);
    },
    setDocType: (state, action) => {
      state.search.docType = action.payload.docType;
    },
    setEndorsementReference: (state, action) => {
      state.search.endorsementReference = action.payload.endorsementReference;
    },
    setUCR: (state, action) => {
      state.search.ucr = action.payload.ucr;
    },
    setClaimReference: (state, action) => {
      state.search.claimReference = action.payload.claimReference;
    },
    setTransactionReference: (state, action) => {
      state.search.transactionReference = action.payload.transactionReference;
    },
    setEnteredOn: (state, action) => {
      state.search.enteredOn = action.payload.enteredOn;
    },
    resetDocumentCounts: (state) => {
      state.totalDocuments = 0;
      state.fetchedDocuments = 0;
    },
    setTotalDocuments: (state, action) => {
      state.totalDocuments = action.payload.totalDocuments;
    },
    increaseFetchedDocuments: (state, action) => {
      state.fetchedDocuments = state.fetchedDocuments + action.payload.fetchedDocuments;
    },
    clearSearch: (state) => {
      state.search.routing = 'policy';
      state.search.externalReference = '';
      state.search.installment = '';
      state.search.premiumId = '';
      state.search.ficaDoc = '';
      state.search.enteredOn = '';
      state.search.sys = '';
      state.search.environment = 'prod';
      state.search.docType = '';
      state.search.ucr = '';
      state.search.claimReference = '';
      state.search.endorsementReference = '';
      state.search.transactionReference = '';
      state.totalDocuments = 0;
      state.fetchedDocuments = 0;
    },
    hideErrorAlert: (state) => {
      state.showError = false;
    },
    setErrorAlert: (state, action) => {
      state.results = [];
      state.isLoading = false;
      state.error = action.payload.error;
      state.showError = action.payload.showError;
      state.totalDocuments = 0;
      state.fetchedDocuments = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDealPremiums.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealPremiums.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.isLoading = false;
      })
      .addCase(getDealPremiums.rejected, (state, action) => {
        state.error = action.payload;
        state.results = [];
        state.isLoading = false;
        state.showError = true;
      });
  },
});

export const {
  clearSearch,
  hideErrorAlert,
  setExternalReference,
  setInstallment,
  setPremiumId,
  setUMR,
  setPolicyNumber,
  setFicaDOC,
  setSys,
  setEnvironment,
  setDocType,
  setEndorsementReference,
  setRouting,
  setUCR,
  setClaimReference,
  setTransactionReference,
  setEnteredOn,
  resetDocumentCounts,
  setTotalDocuments,
  increaseFetchedDocuments,
  setErrorAlert,
} = searchReducer.actions;

export default searchReducer.reducer;
