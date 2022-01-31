import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Home.scss';
//627534627217

function Home() {
    const { state } = useLocation();
    const [accountNumber, setAccountNumber] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [tranHistory, setTranHistory] = useState([]);
    const [message, setMessage] = useState({
        transferMessage: '',
        depositMessage: ''
    });

    useEffect(() => {
        if (state) {
            axios.get(`http://localhost:8080/api/v1/fetchAccountNumber/${state.userName}`, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
                .then((response) => {
                    setAccountNumber(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [state])

    const deposit = () => {
        axios.put('http://localhost:8080/api/v1/deposit', {
            accountNumber,
            amount: depositAmount
        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        }).then((response) => {
            setMessage({
                transferMessage: '',
                depositMessage: `deposit successful with id ${response.data.id}`
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    const transfer = () => {
        axios.put('http://localhost:8080/api/v1/withdraw', {
            fromAccountNumber: accountNumber,
            toAccountNumber,
            amount: transferAmount
        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        }).then((response) => {
            setMessage({
                depositMessage: '',
                transferMessage: `transfer successful with id ${response.data.id}`
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    const transactionDetailsList = () => {
        axios.get(`http://localhost:8080/api/v1/statement/${accountNumber}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
            .then((response) => {
                setTranHistory(response.data.transactionHistory);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })

    }
    const handleDeposit = (event) => {
        setDepositAmount(event.target.value);
    }

    const handleToAccountNumber = (event) => {
        setToAccountNumber(event.target.value);
    }

    const handleTransferAmount = (event) => {
        setTransferAmount(event.target.value);
    }

    return (
        <div className="home-container">
            <h2>Welcome user to the HDFCA Netbanking</h2>
            <br />
            <br />
            {message && message.transferMessage && (
                <p className="transferMessage">{message.transferMessage}</p>
            )}
            {message && message.depositMessage && (
                <p className="depositMessage">{message.depositMessage}</p>
            )}
            <div className="deposit-container">
                <span>Deposit</span>
                <br /><br />
                <label htmlFor="depositAmount">
                    <b>Amount</b>
                </label>
                <input type="text" className="depositAmount" value={depositAmount} onChange={handleDeposit} />
                <button className="deposit" onClick={deposit}>Deposit Amount</button>
            </div>
            <br /><br />
            <div className="transfer-container">
                <span>Transfer</span>
                <br /><br />
                <label htmlFor="transferAccount">
                    <b>AccountNumber</b>
                </label>
                <input type="text" className="toaccountnumber" value={toAccountNumber} onChange={handleToAccountNumber} />
                <label htmlFor="transferAmount">
                    <b>Transfer Amount</b>
                </label>
                <input type="text" value={transferAmount} onChange={handleTransferAmount} />
                <button className="transfer" onClick={transfer}>Transfer Amount</button>
            </div>
            <button className="btn" onClick={transactionDetailsList}>Check Transaction</button>
            <div className="transaction-details">
                <table id="transactions-history" >
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>AccountNumber</th>
                            <th>Amount</th>
                        </tr>
                        {tranHistory.length !== 0 ? tranHistory.map((tran, index) => {
                            return(
                            <tr key={index}>
                                <td>{tran['id']}</td>
                                <td>{tran['accountNumber']}</td>
                                <td>{tran['transactionAmount']}</td>
                            </tr>)
                        }) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;
