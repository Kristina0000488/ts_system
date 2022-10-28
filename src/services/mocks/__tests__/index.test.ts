import * as mocks     from '..';


describe('Mock function "getCompanyInfo" tests', () => {
    test('Should return an object', () => {
        return mocks.getCompanyInfo('12').then(data => {
            expect(data).toEqual(mocks.companyInfo[12]);
        });
    })
})

test('Mock function "updateCompanyInfo" tests', async () => {
    const data = await mocks.updateCompanyInfo(mocks.companyInfo[12], '12');

    expect(data).toEqual(mocks.companyInfo[12]);
});
  
test('Mock function "getCompaniesList" tests', async () => {
    expect.assertions(1);

    try {
        const data = await mocks.getCompaniesList();

        expect(data).toEqual(mocks.companiesList);
    } catch (e) {
        expect(e).toMatch('error');
    }
});

test('Mock function "getCompanyContacts" tests', () => {
    return mocks.getCompanyContacts('12').then(data => {
        expect(data).toEqual(
            mocks.companyContacts[ mocks.companyInfo[12].contactId ]
        );
    });
})

test('Mock function "updateCompanyContacts" tests', async () => {
    const data = await mocks.updateCompanyContacts(mocks.companyContacts[ mocks.companyInfo[12].contactId ], '12');

    expect(data).toEqual(mocks.companyContacts[16]);
});

test('Mock function "addCompanyImg" tests', async () => {
    const oldLengthData = mocks.companyInfo[12].photos.length;

    const data          = await mocks.addCompanyImg('12');
    const newLengthData = data.photos.length;

    const isAdded = oldLengthData < newLengthData;

    expect(isAdded).toBeTruthy();
});
  
test('Mock function "removeCompanyImg" tests', async () => {
    const oldLengthData = mocks.companyInfo[12].photos.length;

    const data          = await mocks.removeCompanyImg(0, '12');
    const newLengthData = data.photos.length;

    const isRemoved = newLengthData < oldLengthData;

    expect(isRemoved).toBeTruthy();
});

test('Mock function "searchCompany" tests', async () => {
    const data = await mocks.searchCompany('перспективные');

    expect(data.some( item => expect(item.name.toLowerCase()).toMatch(/перспективные/) ));
});

test('Mock function "removeCompany" tests a valid and a not valid responses', async () => {
    const resultValid    = await mocks.removeCompany('12');
    const resultNotValid = await mocks.removeCompany('-1');

    expect(resultValid).toMatchObject({ statusCode: 204 });
    //expect(resultNotValid).toBe(TypeError);
});