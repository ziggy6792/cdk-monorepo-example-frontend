/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Paper, makeStyles, InputLabel, Grid, Typography, useTheme } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FieldProps } from 'formik';

export const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
    VirtualList: {
        maxHeight: '400px',
        overflowY: 'scroll',
        display: 'inline-block',
        padding: theme.spacing(1),
    },
}));

interface CustomInputProps extends FieldProps {
    options: any[];
    getOptionLabel: (option: any, index: number) => string;
    idField: string;
    label: string;
}

const DragAndDropList: React.FC<CustomInputProps> = (props) => {
    const { field, label, idField = 'id', options, getOptionLabel } = props;
    const classes = useStyles();

    const theme = useTheme();

    const [optionsMap, setOptionsMap] = useState(null);

    useEffect(() => {
        const optnsMap = {};
        options.forEach((option) => {
            optnsMap[option[idField]] = option;
        });
        setOptionsMap(optnsMap);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const orderedOptions: any[] = (optionsMap && field?.value.map((id) => optionsMap[id])) || [];

    const colors = {
        background: 'white',
        backgroundWhileDragging: lighten(theme.palette.primary.main, 0.8),
        item: theme.palette.primary.main,
        itemWhileDragging: theme.palette.primary.light,
    };

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const grid = 4;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        // minHeight: '4em',

        // change background colour if dragging
        background: isDragging ? colors.itemWhileDragging : colors.item,

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? colors.backgroundWhileDragging : colors.background,
        padding: grid,
        width: 250,
    });

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const retItems = reorder(orderedOptions, result.source.index, result.destination.index);

        props.form.setFieldValue(
            field.name,
            retItems.map((value: any) => {
                if (!value[idField]) {
                    value = { id: value, description: value };
                    setOptionsMap({ ...optionsMap, [value.id]: value });
                }
                return value[idField];
            })
        );
    };

    return (
        <Grid container direction='column'>
            {label && (
                <Grid item style={{ marginBottom: theme.spacing(1) }}>
                    <InputLabel>{label}</InputLabel>
                </Grid>
            )}
            <Grid item>
                <Paper className={classes.VirtualList}>
                    <Grid container>
                        <Grid item>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId='droppable'>
                                    {(provided, snapshot) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                            {orderedOptions.map((item, index) => (
                                                <Draggable key={item[idField]} draggableId={item[idField]} index={index}>
                                                    {
                                                        // eslint-disable-next-line no-shadow
                                                        (provided, snapshot) => (
                                                            <Grid
                                                                container
                                                                justify='space-between'
                                                                alignItems='center'
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                            >
                                                                <Grid item>
                                                                    <Typography variant='h5' style={{ color: 'white' }}>
                                                                        {getOptionLabel(item, index)}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    {/* #ToDo WHY CANT I VERTICAL ALIGN THIS!!!! */}
                                                                    {/* <Typography variant='h5' style={{ color: 'white', marginTop: '5px' }} justify='center'>
                                    <DragHandleIcon />
                                  </Typography> */}
                                                                    <Grid container alignItems='center'>
                                                                        <Grid item>
                                                                            <Typography variant='h5' style={{ color: 'white', marginTop: '5px' }}>
                                                                                <DragHandleIcon />
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DragAndDropList;
