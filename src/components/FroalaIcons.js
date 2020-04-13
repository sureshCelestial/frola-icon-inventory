import React, { Component } from 'react';

// Lattice packages
import LatticeAgGrid from '@latticejs/ag-grid';
import '@latticejs/ag-grid/styles/lattice-ag-grid-style.css';
import dataArr from '../helper/helper';
import '../css/style.css';

class FroalaIcons extends Component {
  constructor(props) {
    super(props);
    this.rowData = dataArr;
    this.columnDefs = [
      {
        headerName: 'S. No.',
        valueGetter: "node.rowIndex + 1",
        width: 180,
      },
      {
        headerName: 'Icon Name/Key',
        field: 'KEY',
        width: window.innerWidth / 7,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Font Awesome',
        field: 'FA5NAME',
        width: window.innerWidth / 7,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Thumbnail',
        field: 'THUMBNAIL',
        width: window.innerWidth / 8,
        cellRenderer: function(params) {
          return `<i class="fa fa-${params.value}" style="margin-left: 25"></i>`
        }
      },
      {
        headerName: 'Hover',
        field: 'THUMBNAIL',
        width: window.innerWidth / 8,
        cellRenderer: function(params) {
          return `<button class="thumbnail"><i class="fa fa-${params.value}" area-pressed="true"></i></button>`
        }
      },
      {
        headerName: 'Active',
        field: 'THUMBNAIL',
        width: window.innerWidth / 8,
        cellRenderer: function(params) {
          return `<i class="fa fa-${params.value} active" style="margin-left: 15"></i>`
        }
      },
      {
        headerName: 'Size',
        width: window.innerWidth / 6,
        valueGetter: function() {
          return "38x40 px";
        },
      }
    ];

    this.state = {
      showPagination: false
    };
  }

  render() {
    const { showPagination } = this.state;

    return (
      <LatticeAgGrid
        animateRows
        enableSorting
        enableFilter
        rowDragManaged={!showPagination}
        pagination={showPagination}
        paginationAutoPageSize={showPagination}
        columnDefs={this.columnDefs}
        rowData={this.rowData}
        rowSelection="multiple"
      />
    );
  }
}

export default FroalaIcons;
