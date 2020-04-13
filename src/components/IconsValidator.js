import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { stringify } from 'svgson';
import { Button, Input, FormGroup, Form, Label } from 'reactstrap';
import { Widget } from '@latticejs/widgets';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.css';
import LatticeAgGrid from '@latticejs/ag-grid';
import '@latticejs/ag-grid/styles/lattice-ag-grid-style.css';
import '../css/style.css';
import DropIcon from '../resources/images/drop.png';


class IconsValidator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            iconsSet: '',
            data: null,
            isIconGrid: false,
            file: null
        };
    }

    handleInputChange = (event) =>  {
        this.setState({ url: event.target.value });
    }

    onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.name.split('.').pop() !== 'json') {
            alert('Invalid File extension!');
            return false;
        }
        this.setState({file: file});
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
            this.setState({ iconsSet: JSON.parse(evt.target.result) });
        }
        reader.onerror = () => {
            document.getElementById("fileContents").innerHTML = "error reading file";
        }
      }
    }

    validateIcons = () => {
        const { url } = this.state;
        if (url) {
            let ext = url.split('.').pop();
            let script = null;
            if (ext === 'js') {
                script = document.createElement("script");
                script.src = url;
            } else if (ext === 'css') {
                script = document.createElement("link");
                script.href = url;
                script.rel = "stylesheet";
            } else {
                alert('Invalid file extension!');
                return false;
            }
            
            script.async = true;
            script.onload = () => console.log("script Loaded.....");
            document.body.appendChild(script);
        }
        
        this.scriptLoaded();
    }

    scriptLoaded = () => {
        const { iconsSet } = this.state;
        let data = [];
        for (const icon of iconsSet) {
            if (icon.iconClassKey) {
                data.push({
                    Key: icon.iconId,
                    class: icon.iconClassKey,
                    svg: false
                });
            } else if (icon.iconInfo) {
                data.push({
                    Key: icon.iconId,
                    class: stringify(icon.iconInfo),
                    svg: true
                });
            }
        }

        this.setState({
            data: data,
            isIconGrid: true
        });
    }

    getIconGrid = (data) => {
        const rowData = data;
        debugger;
        const columnDefs = [
            {
                headerName: 'Icon Key',
                field: 'Key'
            },
            {
                headerName: 'Class Name / SVG',
                field: 'class'
            },
            {
                headerName: 'Icon',
                field: 'class',
                cellRenderer: function(params) {
                    if (params.data.svg) {
                        return params.value;
                    } else {
                        return `<i class="${params.value}"></i>`;
                    }
                }
            }
        ];

        return (
            <LatticeAgGrid
              columnDefs={columnDefs}
              rowData={rowData}
            />
        );
    }

    getResultView = () => {
        if (this.state.isIconGrid) {
            return (
                this.getIconGrid(this.state.data)
            );
        } else {
            return "No Results";
        }
    }
  
    render() {
      return (
        <Grid container justify="center">
            <Grid item xs={6}>
                <Widget border="top" title="Icons Validator">
                    <Form className="validator">
                        <FormGroup>
                            <Label for="exampleUrl">Url:</Label>
                            <Input 
                                type="url" 
                                name="url"
                                placeholder="Enter the font icon Library URL"
                                value={this.state.url}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup className="dropbox">
                            <Dropzone onDrop={this.onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            )}
                            </Dropzone>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                {this.state.file ?
                                <div className="col-md-4">
                                    <strong>Selected File:</strong> 
                                    <img src={DropIcon} width={100} title={this.state.file.name} />
                                    <span className="selected-file">{this.state.file.name}</span>
                                </div> : null}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" onClick={this.validateIcons}>Validate Icons</Button>
                        </FormGroup>
                    </Form>
                </Widget>
            </Grid>
            <Grid item xs={5}>
                <Widget border="top" title="Icons Result">
                    {this.getResultView()}
                </Widget>
            </Grid>
        </Grid>
      );
    }
  }
  
  export default IconsValidator;