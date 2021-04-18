/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import * as routes from 'src/config/routes';
import { LinkList, LinkType } from 'src/generated-types';

interface IBreadcrumbs {
  breadcrumbs: LinkList;
}

const routeLookup = {
  [LinkType.Event]: routes.ROUTE_EVENT,
  [LinkType.Competition]: routes.ROUTE_COMPETITION,
  [LinkType.Heat]: routes.ROUTE_HEAT,
};

const Breadcrumbs: React.FC<IBreadcrumbs> = ({ breadcrumbs }) => {
  const history = useHistory();
  return (
    <MuiBreadcrumbs separator=">" aria-label='breadcrumb' style={{ padding: 16 }}>
      {breadcrumbs.items.map(({ name, type, id }, i) =>
        i < breadcrumbs.items.length - 1 ? (
          <Link color='inherit' onClick={() => history.push(`${routeLookup[type]}/${id}`)} style={{ cursor: 'pointer' }}>
            <Typography variant='h6' style={{ background: '#ccc', padding: '8px 16px', borderRadius: 4 }}>
              {name}
            </Typography>
          </Link>
        ) : (
          <Typography color='textPrimary' variant='h6' style={{ background: '#fff', padding: '8px 16px', borderRadius: 4 }}>
            {name}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
