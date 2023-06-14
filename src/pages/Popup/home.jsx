import './css/home.css';

import React from "react";
import { LOCAL_STORAGE_VARIABLE } from "../modules/constants.js";
import * as utility from "../modules/util.js";
import Prices from './Prices/prices';
import Scan from './scan';
import Speed from './speed';
import Settings from './settings';
import Header from './header';
import logoLG from '../../assets/img/logo-lg.png';


export default class Home extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectedButton: utility.getLocalStorage(LOCAL_STORAGE_VARIABLE.selectedButton) ? utility.getLocalStorage(LOCAL_STORAGE_VARIABLE.selectedButton) : 'diamond',
      toggleButton: utility.getLocalStorage(LOCAL_STORAGE_VARIABLE.toggleButton) ? utility.getLocalStorage(LOCAL_STORAGE_VARIABLE.selectedButton) : false,
      // activeTab: 'BRC20'
    };
  }
  async componentDidMount() {
    var selectedBtn = await utility.getLocalStorage(LOCAL_STORAGE_VARIABLE.selectedButton, 'diamond');
    var toggleBtn = await utility.getLocalStorage(LOCAL_STORAGE_VARIABLE.toggleButton, false);
    this.setState({selectedButton: selectedBtn, toggleButton: toggleBtn});
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleForButtonClicked = (type) => {
    utility.setLocalStorage(LOCAL_STORAGE_VARIABLE.selectedButton, type);
    this.setState({ selectedButton: type });
  }
  // handleTabClick = (tab) => {
  //   this.setState({ activeTab: tab });
  // }
  toggleState = (e) => {
    utility.setLocalStorage(LOCAL_STORAGE_VARIABLE.toggleButton, e.target.checked);
    this.setState({ toggleButton: e.target.checked });
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { "message": "allowed", selected: e.target.checked ? true : false });
    });
  }

  render() {
    const { selectedButton,activeTab, toggleButton } = this.state;

    return (
      <div className="bg-box home-page">
        <div className="inner-container">
          <div className="popup-main-content">
            <div className="" style={{ height: "100%" }}>

              {selectedButton === 'price' &&
                <Prices />
              }
              {selectedButton === 'speed' &&
                <Speed />
              }
              {selectedButton === 'setting' &&
                <Settings />
              }
              {selectedButton === 'diamond' &&
                <div className="inner-body-container rarity-body-container">
                  <div className='section-inner-container'>
                   <div className='top-header'>
                      <div className='logo'>
                        <img src={logoLG} alt='satStats logo' />
                      </div>
                      <h1 className="options-heading">Display Satributes</h1>
                      <div className='switch-container'>
                        <label className="switch">
                          <input type="checkbox" onChange={this.toggleState} checked={toggleButton} />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    <div className='body-content'>
                      <Scan />
                    </div>
                  </div>
                </div>
              }
              <Header
                selectedButton={selectedButton}
                handleForButtonClicked={(type) => this.handleForButtonClicked(type)}
              />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
