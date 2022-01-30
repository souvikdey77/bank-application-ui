import {
    USER_SIGNUP,
    USER_SIGNIN,
    BALANCE_TRANSFER,
    BALANCE_DEPOSIT,
    VIEW_STATEMENT,
  } from "./action-type";

  import BankService from '../service/bank-service';

  export const signInUser = (userName, password) => async(dispatch) => {
    try {
      const result = await BankService.signIn({ userName, password });
      dispatch({
        type: USER_SIGNIN,
        payload: result.data,
      });
      return Promise.resolve(result.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const signUpUser = (firstName, lastName, userName, password ) => async(dispatch) => {
    try {
      const result = await BankService.signUp({ firstName, lastName, userName, password });
      dispatch({
        type: USER_SIGNUP,
        payload: result.data,
      });
      return Promise.resolve(result.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const transferAmount = (fromAccountNumber, toAccountNumber, amount, headers ) => async(dispatch) => {
    try {
      const result = await BankService.withdrawAmount({ fromAccountNumber, toAccountNumber, amount, headers });
      dispatch({
        type: BALANCE_TRANSFER,
        payload: result.data,
      });
      return Promise.resolve(result.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const depositAmount = (accountNumber, amount, headers) => async(dispatch) => {
    try {
      const result = await BankService.depositAmount({ accountNumber, amount, headers });
      dispatch({
        type: BALANCE_DEPOSIT,
        payload: result.data,
      });
      return Promise.resolve(result.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const accountStatement = (accountNumber,headers) => async(dispatch) => {
    try {
      const result = await BankService.accountStatement({ accountNumber, headers });
      dispatch({
        type: VIEW_STATEMENT,
        payload: result.data,
      });
      return Promise.resolve(result.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  