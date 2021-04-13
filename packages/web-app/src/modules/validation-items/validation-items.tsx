import React from 'react';
import { ValidationItem as IValidationItem, ValidationItemBase, ValidationItemType } from 'src/generated-types';
import NotifyMessages, { INotifyMessage, NotifyMessageType } from 'src/modules/notify-messages';

export type ValidationItemContent = (ValidationItemBase: ValidationItemBase) => { action?: React.ReactNode; message: React.ReactNode };

interface ValidationItemsProps {
  validationItems: IValidationItem[];
  validationItemContent?: ValidationItemContent;
}

const mapValidationType = {
  [ValidationItemType.Error]: NotifyMessageType.ERROR,
  [ValidationItemType.Warn]: NotifyMessageType.WARN,
};

const ValidationItems: React.FC<ValidationItemsProps> = ({ validationItems, validationItemContent }) => {
  const validationMessages: INotifyMessage[] = validationItems.map(validationItem => {
    const { message, action } = validationItemContent(validationItem);
    return {
      message,
      action,
      type: mapValidationType[validationItem.type],
    };
  });

  return <NotifyMessages notifyMessages={validationMessages} />;
};

export default ValidationItems;
