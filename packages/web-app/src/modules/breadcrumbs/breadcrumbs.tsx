/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as routes from 'src/config/routes';
import { LinkList, LinkType } from 'src/generated-types';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2,3,1,2),
    width: '90%',
    overflow: 'auto',
    borderBottom: '1px solid #ddd',
    marginBottom: 8
  },
  ol: {
    width: 'max-content',
    overflow: 'auto',
    padding: theme.spacing(0,4,0,0)
  },
  li: {
    display: 'inline-block'
  },
  separator: {
    display: 'inline-block'
  }
}));

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
  const classes = useStyles();

  useEffect(() => {
    const el = document.getElementById('alpaca-breadcrumbs');
    if(el){
      const { scrollWidth } = el;
      el.scrollLeft = scrollWidth
    }
  })

  return (
    <MuiBreadcrumbs
      id="alpaca-breadcrumbs"
      separator=">"
      aria-label='breadcrumb'
      className={classes.root}
      classes={{ ol:classes.ol, li: classes.li, separator: classes.separator }}
    >
      {breadcrumbs.items.map(({ name, type, id }, i) =>
        i < breadcrumbs.items.length - 1 ? (
          <Link
            key={`${id}-${name}`}
            color='inherit'
            onClick={() => history.push(`${routeLookup[type]}/${id}`)}
            style={{ cursor: 'pointer' }}
          >
            <Typography variant='h6' style={{ background: '#ccc', padding: '8px 12px', borderRadius: 4 }}>
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
