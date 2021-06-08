import React from 'react';
import RecordDetails from '../RecordDetails/RecordDetails';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import { useParams } from "react-router-dom";
import RecordsList from '../RecordsList/RecordsList';
import './ShowRecordDetailsForUser.css';

export default function ShowRecordDetailsForUser() {
    const params = useParams();

    return (
        <>
            <div className="row">
                <div className="col-md-9">
                    <RecordDetails {...params} />
                    <div className="wrap_subscribeForm">
                        <SubscribeForm />
                    </div>
                </div>
                <div className="col-md-3">
                    <RecordsList />
                </div>
            </div>
        </>
    );
}