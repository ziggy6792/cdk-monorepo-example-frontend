import React from 'react';
import { ValidationItem as IValidationItem, ValidationItemBase, ValidationItemType } from 'src/generated-types';
import ValidationMessages, { IValidationMessage, ValidationMessageType } from './validation-messages';

export type ValidationItemContent = (ValidationItemBase: ValidationItemBase) => { action?: React.ReactNode; message: React.ReactNode };

interface ValidationItemsProps {
    validationItems: IValidationItem[];
    validationItemContent?: ValidationItemContent;
}

const mapValidationType = {
    [ValidationItemType.Error]: ValidationMessageType.ERROR,
    [ValidationItemType.Warn]: ValidationMessageType.WARN,
};

const ValidationItems: React.FC<ValidationItemsProps> = ({ validationItems, validationItemContent }) => {
    const validationMessages: IValidationMessage[] = validationItems.map((validationItem) => {
        const { message, action } = validationItemContent(validationItem);
        return {
            message,
            action,
            type: mapValidationType[validationItem.type],
        };
    });

    return <ValidationMessages validationMessages={validationMessages} />;
};

export default ValidationItems;
