import MUIDataTable from 'mui-datatables';
import { customSort } from './table-helper';

const initMui = () => {
    MUIDataTable.defaultProps = {
        options: {
            filterType: 'dropdown',
            // responsive: "scrollMaxHeight",
            rowsPerPageOptions: [],
            rowsPerPage: 5,
            download: false,
            print: false,
            responsive: 'standard',
            selectableRows: 'none',
            rowHover: true,
        },
    };
};

export default initMui;
