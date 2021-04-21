/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import {
  useEndHeatMutation,
  ValidationItem,
  ValidationItemType,
  ValidationItemMessage,
  ValidationItemBase,
  ValidationItemHeatAlreadyOpen,
} from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_COMPETITION, ROUTE_LIVE } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import ValidationItems, { ValidationItemContent } from 'src/modules/validation-items';
import { Link } from '@material-ui/core';
import ConfirmBox from 'src/modules/confirm-box';

interface IEndHeatProps {
  heat: {
    id: string;
    name: string;
  };
  onSucessfull?: () => void;
}

const EndHeat: React.FC<IEndHeatProps> = ({ heat, onSucessfull }) => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [validationItems, setValidationItems] = useState<ValidationItemBase[]>([]);

  const [endHeat] = useEndHeatMutation();

  const onEndHeat = async (validationLevel: ValidationItemType = ValidationItemType.Warn): Promise<void> => {
    const response = await endHeat({ variables: { id: heat.id, validationLevel } });
    if (!response.data) {
      // Handle error globally
      return null;
    }
    if (response.data.endHeat.__typename === 'ValidationItemList') {
      setValidationItems(response.data.endHeat.items);
      setOpen(true);
    } else if (response.data.endHeat.__typename === 'Competition') {
      // history.push(`${ROUTE_COMPETITION}/${response.data.endHeat.id}`);
      if (onSucessfull) {
        onSucessfull();
      }
      setOpen(false);
    }

    return null;
  };

  const validationMessageLookup = {
    [ValidationItemMessage.EndheatNotready]:
      'You have not scored enough runs. Please give each rider a score or remove all scores if you want to close this heat without scoring.',
    [ValidationItemMessage.EndheatNotfullyscored]: 'You have not given each rider a score for all runs. Are you sure you want to end the heat?',
    [ValidationItemMessage.EndheatCancel]: 'You are ending this heat without entering scores. You will need to reopen this heat later and enter scores.',
  };

  const validationItemContent: ValidationItemContent = (validationItem: ValidationItem | ValidationItemHeatAlreadyOpen) => {
    const message = validationMessageLookup[validationItem.message];
    if (validationItem.__typename === 'ValidationItemHeatAlreadyOpen') {
      return {
        action: <Link onClick={() => history.push(`${ROUTE_LIVE}/${validationItem.eventId}`)}>Open Scoreboard</Link>,
        message,
      };
    }
    return {
      message,
    };
  };

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <ConfirmBox
          title={`End ${heat.name}`}
          confirmButton={{
            onClick: () => onEndHeat(ValidationItemType.Error),
            text: 'End Heat',
            disabled: !!validationItems.find((item) => item.type === ValidationItemType.Error),
          }}
          cancelButton={{ onClick: () => setOpen(false) }}
        >
          <ValidationItems validationItems={validationItems} validationItemContent={validationItemContent} />
        </ConfirmBox>
      </Dialog>
      <ProgressButton onClick={onEndHeat}>End Heat</ProgressButton>
    </>
  );
};

export default EndHeat;
