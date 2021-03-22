import React from 'react';

interface IEventsScreenProps {
    eventId: string;
}

const EventScreen: React.FC<IEventsScreenProps> = ({ eventId }) => {
    console.log('');
    return <div>{eventId}</div>;
};

export default EventScreen;
