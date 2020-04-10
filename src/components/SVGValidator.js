import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { parse, stringify } from 'svgson';
import { Button, Input, FormGroup, Form, Label } from 'reactstrap';
import { Widget } from '@latticejs/widgets';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.css';

class SVGValidator extends Component {
    onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            const iconsSet = JSON.parse(evt.target.result);
            for (const icon of iconsSet) {
              document.getElementById("fileContents").innerHTML += `<section><p>${icon.iconId}: ${stringify(icon.iconInfo)}</p></section>`;
            }
        }
        reader.onerror = function (evt) {
            document.getElementById("fileContents").innerHTML = "error reading file";
        }
      }
    }
  
    render() {
      return (
        <Grid container justify="center">
            <Grid item xs={6}>
                <Widget border="top" title="Icons Validator">
                    <Form>
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
  
  export default SVGValidator;