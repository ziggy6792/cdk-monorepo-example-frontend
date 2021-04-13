import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@material-ui/core';
import React from 'react';
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

const Breadcrumbs: React.FC<IBreadcrumbs> = ({ breadcrumbs }) => (
  <MuiBreadcrumbs aria-label='breadcrumb'>
    {breadcrumbs.items.map(({ name, type, id }, i) =>
      i < breadcrumbs.items.length - 1 ? (
        <Link color='inherit' href={`${routeLookup[type]}/${id}`}>
          {name}
        </Link>
      ) : (
        <Typography color='textPrimary'>{name}</Typography>
      )
    )}
  </MuiBreadcrumbs>
);

export default Breadcrumbs;
