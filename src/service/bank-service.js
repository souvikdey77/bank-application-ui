import http from '../service/http-common';

const signIn = data => {
    return http.post('/signin',data);
}

const signUp = data => {
    return http.post('/signup',data);
}

const createAccount = (data,headers) => {
    return http.post('/create',data, {headers: headers});
}

const withdrawAmount = (data,headers) => {
    return http.put('/withdraw',data,{headers: headers});
}

const depositAmount = (data,headers) => {
    return http.put('/deposit',data,{headers: headers});
}

const accountStatement = (data,headers) => {
    return http.get(`/statement/${data}`,{headers: headers});
}

const BankService = {
    signIn,
    signUp,
    createAccount,
    withdrawAmount,
    depositAmount,
    accountStatement
};

export default BankService;