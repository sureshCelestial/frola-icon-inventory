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
        headerName: 'Icon Key',
        field: 'KEY',
        width: window.innerWidth / 8,
        filter: 'agTextColumnFilter',
        rowDrag: true,
        checkboxSelection: true
      },
      {
        headerName: 'Name',
        field: 'NAME',
        width: window.innerWidth / 8,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'SVG Key',
        field: 'SVG_KEY',
        width: window.innerWidth / 8,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Font Awesome',
        field: 'FA5NAME',
        width: window.innerWidth / 8,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Thumbnail',
        field: 'THUMBNAIL',
        width: window.innerWidth / 8,
        cellRenderer: function(params) {
          return `<i class="fa fa-${params.value}"></i>`
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
          return `<i class="fa fa-${params.value} active"></i>`
        }
      },
      {
        headerName: 'Size',
        width: window.innerWidth / 8,
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
