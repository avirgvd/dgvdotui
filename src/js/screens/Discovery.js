/**
 * Created by avireddi on 12/18/2021.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  Heading,
  Form,
  FormField,
  Footer,
  Button,
  Box,
  TextInput,
  RadioButton,
  Main,
  Text,
  Select, DataTable, CheckBox
} from 'grommet';


import { pageLoaded } from './utils';
import {getRESTApi} from "../api/server-rest";

const DEFAULT_FILE_INFO = {
  osType: "",
  file: "",
  name: ''
};

const DATA = [{}, {}]

class Discovery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      district: {},
      districts: [],
      shop: {},
      shops: [],
      shopdetails: []
    };

    this.onCancel = this.onCancel.bind(this);

    this.onDistrict= this.onDistrict.bind(this);
    this.onShop= this.onShop.bind(this);

  }

  componentDidMount() {
    pageLoaded('Discovery');
    //console.log("Discovery: componentDidMount: ")
    getRESTApi("/rest/districts")
        .then((response) => {
          this.setState({districts: response})
        })
        .catch((err) => {
          console.log("componentDidMount: err: ", err);
          this.setState({districts: []})
        })
  }

  componentWillUnmount() {
    console.log("Discovery: componentWillUnmount: ")
  }

  onCancel() {
    let data = { ...this.props.deployServerSettings};

    data.activeState = 0;
  }

  onDistrict(event) {

    console.log(event.value)

    this.setState({district: event.value})

    getRESTApi("/rest/shops?district=" + event.value['name'])
        .then((response) => {
          this.setState({shops: response})
        })
        .catch((err) => {
          this.setState({shops: []})
        })
  }

  onShop(event) {

    this.setState({shop: event.value})


    console.log(this.state.district['name'])
    console.log(this.state.shop['name'])
    console.log(event.value)
    getRESTApi("/rest/shopdetails?district=" + this.state.district['name'] + "&shop=" + event.value['name'])
        .then((response) => {
          this.setState({shopdetails: response})
        })
        .catch((err) => {
          this.setState({shopdetails: []})
        })

  }

  onCheck = (event, value) => {
    if (event.target.checked) {
    } else {
    }
  };





  render() {
    console.log("render: Discovery: this.state: ", this.state);
    let columns = [
      {header: "Name", property: "name", primary: true},
      {header: "Lastupdated", property: "date"}
    ];
    // let data=[{"name":"Eric","count":5}, {"name":"Shimi","count":7}];
    let data = this.state.shopdetails.map((col) => {
        console.log("ITEM IS: ", col)
        return col;
    });

    return (
      <Box id="top2" fill="vertical" overflow="auto" align="start" flex="grow"  justify="start" direction="column" pad="large"  >

        < FormField label='Districts'>
          <Select
              name="district"
              placeholder={"Select"}
              value={this.state.district}
              labelKey={"name"}
              valueKey={{ key: 'name', reduce: false }}
              options={this.state.districts}
              onChange={this.onDistrict}
              // onChange={({item}) => this.setState({"selectedEthIface": item})}
              id="eth"
          />
        </FormField>
        < FormField label='Shops'>
          <Select
              name="shops"
              placeholder={"Select"}
              value={this.state.shop}
              labelKey={"name"}
              valueKey={{ key: 'name', reduce: false }}
              options={this.state.shops}
              onChange={this.onShop}
              // onChange={({item}) => this.setState({"selectedEthIface": item})}
              id="eth"
          />
        </FormField>
        <FormField>
        <DataTable
            columns={columns}
            data={data}
            sortable
            show={10}
            size="medium"
        />
        </FormField>
      </Box>
    );
  }
}

Discovery.defaultProps = {
  error: undefined,
};

Discovery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
};

Discovery.contextTypes = {
  intl: PropTypes.object
};

// const select = state => ({ ...state.deployservers });
export default Discovery;


