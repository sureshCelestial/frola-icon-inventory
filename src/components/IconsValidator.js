import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { stringify } from 'svgson';
import { Button, Input, FormGroup, Form, Label } from 'reactstrap';
import { Widget } from '@latticejs/widgets';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.css';


class IconsValidator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            iconsSet: '',
            fields: {
                value: null
            }
        };
    }

    onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
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
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
        
    }

    scriptLoaded = () => {
      const { iconsSet } = this.state;
      for (const icon of iconsSet) {
        if (icon.iconClassKey) {
          document.getElementById("fileContents").innerHTML += 
            `<section><p>Source: Library &nbsp; ${icon.iconId}: <i class="${icon.iconClassKey}"></i></p></section>`;
        } else if (icon.iconInfo) {
          document.getElementById("fileContents").innerHTML +=
            `<section><p>Source: SVG Icon &nbsp; ${icon.iconId}: ${stringify(icon.iconInfo)}</p></section>`;
        }
      }
        // window.A.sort();
    }

    handleInputChange = (event) =>  {
        this.setState({
            url: event.target.value
        });
    }
  
    render() {
      return (
        <Grid container justify="center">
            <Grid item xs={6}>
                <Widget border="top" title="Icons Validator">
                    <Form>
                        <FormGroup>
                            <Label for="exampleUrl">Url:</Label>
                            <Input 
                                type="text" 
                                name="url" 
                                placeholder="Enter the font icon Library URL"
                                value={this.state.url}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Dropzone onDrop={this.onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                </section>
                            )}
                            </Dropzone>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" onClick={this.validateIcons}>Validate Icons</Button>
                        </FormGroup>
                    </Form>
                </Widget>
            </Grid>
            <Grid item xs={5}>
                <Widget border="top" title="Icons Result">
                    <div id="fileContents"></div>
                </Widget>
            </Grid>
        </Grid>
      );
    }
  }
  
  export default IconsValidator;