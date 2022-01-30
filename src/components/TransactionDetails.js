import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Transaction.scss';

function TransactionDetails(props) {
    const transactionDetails = props.location.state ? props.location.state.accountDetails : null;
    return (
        <div className="app-transaction-container">
            <div className="link-home-page">
                <Link to="/home" className="btn">
                    Home
              </Link>
                <br />
                <Link to="/logout" className="btn">
                    Logout
              </Link>
            </div>
            {transactionDetails ? transactionDetails.map((transaction, index) => {
                <div className="transaction-details">
                    <table id="transactions-history" key={index}>
                        <tr>
                            <th>Id</th>
                            <th>AccountNumber</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>{transaction['id']}</td>
                            <td>{transaction['accountNumber']}</td>
                            <td>{transaction['transactionAmount']}</td>
                        </tr>
                    </table>
                </div>
            }) : null}
        </div>
    )
}

export default connect()(TransactionDetails)
