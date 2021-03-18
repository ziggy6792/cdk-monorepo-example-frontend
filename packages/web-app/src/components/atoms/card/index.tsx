import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
});

const CardBase: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CardBase;
