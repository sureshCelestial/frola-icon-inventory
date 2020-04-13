import React, { Component } from 'react';

// Lattice packages
import LatticeAgGrid from '@latticejs/ag-grid';
import '@latticejs/ag-grid/styles/lattice-ag-grid-style.css';
import '../css/style.css';

class IconGrid extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.data);
    this.rowData = this.props.data;
    this.columnDefs = [
      {
        headerName: 'Icon Key',
        field: 'Key'
      },
      {
        headerName: 'Class Name',
        field: 'class'
      },
      {
        headerName: 'Icon',
        field: 'class',
        cellRenderer: function(params) {
          return `<i class="${params.value}"></i>`
        }
      }
    ];
  }

  render() {
    return (
      <LatticeAgGrid
        columnDefs={this.columnDefs}
        rowData={this.rowData}
        rowSelection="multiple"
      />
    );
  }
}

export default IconGrid;
