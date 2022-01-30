import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { accountStatement, depositAmount, transferAmount } from '../actions/action-creator';

function Home() {
    const token = props.location.state ? props.location.state.token : null;
    const [accountNumber, setAccountNumber] = useState('62753462722');
    const [toAccountNumber, setToAccountNumber] = useState('627534627217');
    const [accountDetails, setAccountDetails] = useState({
        currentBalance: '',
        transactionHistory: []
    });
    const [message, setMessage] = useState({
        transferMessage: '',
        depositMessage: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(accountStatement(accountNumber, token))
                .then((response) => {
                    setAccountDetails({
                        currentBalance: response['currentBalance'],
                        transactionHistory: response['transactionHistory']
                    })
                })
        }
    }, [token])

    const deposit = () => {
        dispatch(depositAmount(accountNumber, 1000, token))
        .then((response) => {
            setMessage({
                ...message,
                depositMessage: 'Amount deposit Successfully'
            })
        })
        .catch((error) => {
            setMessage({
                ...message,
                depositMessage: 'Error occured while depositing'
            })
        })
    }

    const transfer = () => {
        dispatch(transferAmount(accountNumber,toAccountNumber, 1000, token))
        .then((response) => {
            setMessage({
                ...message,
                transferMessage: 'Amount Transfer Successfully'
            })
        })
        .catch((error) => {
            setTransferMessage({
                ...message,
                transferMessage: 'Error occured while transferring'
            })
        })
    }

    return (
        <div className="home-container">
            <h2>Welcome user to the HDFCA Netbanking</h2>
            <span>To check the transaction details, please click on the link</span>
            <br />
            { message.transferMessage ? <p>{message.transferMessage}</p> : null}
            { message.depositMessage ? <p>{message.depositMessage}</p> : null}
            <button onClick={deposit}>Deposit Amount</button>
            <button onClick={transfer}>Transfer Amount</button>
            <Link to={{
                pathname: "/transaction",
                state: { token: token, accountDetails: accountDetails }
            }} className="btn" >
                Transactions History
              </Link>
        </div>
    )
}

export default connect()(Home);
