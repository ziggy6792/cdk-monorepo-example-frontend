/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import {
  useSelectHeatMutation,
  ValidationItem,
  ValidationItemType,
  ValidationItemMessage,
  ValidationItemBase,
  ValidationItemHeatAlreadyOpen,
} from 'src/generated-types';
import { useHistory } from 'react-router';
import { ROUTE_SCOREBOARD } from 'src/config/routes';
import ProgressButton from 'src/components/ui/buttons/progress-button';
import Dialog from 'src/components/ui/dialog';
import ValidationItems, { ValidationItemContent } from 'src/modules/validation-items';
import { Link } from '@material-ui/core';
import ConfirmBox from 'src/modules/confirm-box/confirm-box';

interface IJudgeHeatProps {
  heat: {
    id: string;
    name: string;
  };
}

const JudgeHeat: React.FC<IJudgeHeatProps> = ({ heat }) => {
  const history = useHistory();

  const [selectHeat] = useSelectHeatMutation();

  const [open, setOpen] = useState(false);
  const [validationItems, setValidationItems] = useState<ValidationItemBase[]>([]);

  const onSelectHeat = async (validationLevel: ValidationItemType = ValidationItemType.Warn): Promise<void> => {
    const response = await selectHeat({ variables: { id: heat.id, validationLevel } });

    if (!response.data) {
      // Handle error globally
      return null;
    }
    if (response.data.selectHeat.__typename === 'ValidationItemList') {
      setValidationItems(response.data.selectHeat.items);
      setOpen(true);
    } else if (response.data.selectHeat.__typename === 'Event') {
      history.push(`${ROUTE_SCOREBOARD}/${response.data.selectHeat.id}`);
    }
    return null;
  };

  const validationMessageLookup = {
    [ValidationItemMessage.OpenheatAlreadyopen]: 'Another heat is already open in the event scorebaord. Please close it first.',
    [ValidationItemMessage.OpenheatNoriders]: 'There are no riders allocated to this heat.',
    [ValidationItemMessage.OpenheatNotfull]: 'This heat is not yet fully allocated.',
    [ValidationItemMessage.OpenheatNotready]: 'This heat is not ready to judge as allocations will depend on the results of former heats.',
    [ValidationItemMessage.OpenheatToofewriders]: 'There are not enough riders allocated to this heat.',
    [ValidationItemMessage.OpenheatAlreadyfinished]: 'This heat has been closed once already. Are you sue you want to re-open it?',
  };

  const validationItemContent: ValidationItemContent = (validationItem: ValidationItem | ValidationItemHeatAlreadyOpen) => {
    const message = validationMessageLookup[validationItem.message];
    if (validationItem.__typename === 'ValidationItemHeatAlreadyOpen') {
      return {
        action: <Link onClick={() => history.push(`${ROUTE_SCOREBOARD}/${validationItem.eventId}`)}>Open Scoreboard</Link>,
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
          title={`Judge ${heat.name}`}
          confirmButton={{
            onClick: () => onSelectHeat(ValidationItemType.Error),
            text: 'Judge Heat',
            disabled: !!validationItems.find((item) => item.type === ValidationItemType.Error),
          }}
          cancelButton={{ onClick: () => setOpen(false) }}
        >
          <ValidationItems validationItems={validationItems} validationItemContent={validationItemContent} />
        </ConfirmBox>
      </Dialog>
      <ProgressButton onClick={onSelectHeat}>Judge Heat</ProgressButton>
    </>
  );
};

export default JudgeHeat;
