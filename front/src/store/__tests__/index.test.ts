import store           from '..';
import * as slice      from '../slices';     
import * as mocks      from '../../services/mocks';


describe('Redux state tests', () => {
  it('Should initially set companiesList to an empty array', () => {
    const stateCompaniesList = store.getState().index.companiesList;

    expect(stateCompaniesList).toEqual([]);
  })
  it('Should initially set company to an empty array', () => {
    const stateCompany = store.getState().index.company;

    expect(stateCompany).toEqual({});
  })
  it('Should initially set contacts to an empty array', () => {
    const stateContacts = store.getState().index.contacts;

    expect(stateContacts).toEqual({});
  })
})

describe('CompaniesList redux state tests', () => {
  it('Should be able to fetch the companiesList', async () => {
    const responseMock = await mocks.getCompaniesList(); 
    const result       = store.dispatch(slice.getCompaniesList());
    const status       = store.getState().index.isLoading;
    
    expect(result.type).toBe('main/getCompaniesList');
    expect(status).toBeTruthy();
    expect(responseMock).toEqual(mocks.companiesList);

    const resultFinish = store.dispatch(slice.setCompaniesList(responseMock));
    const state        = store.getState().index.companiesList;
    const statusFinish = store.getState().index.isLoading;

    expect(state).toEqual(responseMock);
    expect(resultFinish.type).toBe('main/setCompaniesList');
    expect(statusFinish).toBeFalsy();
  })
})

describe('Company redux state tests', () => {
  it('Should be able to fetch the company', async () => {
    const responseMock = await mocks.getCompanyInfo(); 
    const result       = store.dispatch(slice.getDataCompany({ id: '12' }));
    const status       = store.getState().index.isLoading;
    
    expect(result.type).toBe('main/getDataCompany');
    expect(status).toBeTruthy();
    expect(responseMock).toEqual(mocks.companyInfo[12]);

    const resultFinish = store.dispatch(slice.setDataCompany(responseMock));
    const state        = store.getState().index.company;
    const statusFinish = store.getState().index.isLoading;

    expect(state).toEqual(responseMock);
    expect(resultFinish.type).toBe('main/setDataCompany');
    expect(statusFinish).toBeFalsy();
  })
})