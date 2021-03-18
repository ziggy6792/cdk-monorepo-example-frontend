import React from 'react';
import Box from '@material-ui/core/Box';
import NavigationBar from 'src/components/organism/navigation-desktop';

interface IProps {
    isAuthenticated: boolean;
}

const MainTemplate: React.FC<IProps> = ({ children, isAuthenticated }) => {
    console.log('GO');
    return (
        <>
            <NavigationBar isAuthenticated={isAuthenticated} />
            <Box p={2}>{children}</Box>
        </>
    );
};

export default MainTemplate;
