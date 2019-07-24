import React, { Component } from 'react';

import '../../../style/LSideBar.css';
import bgImage from '../../../assets/image.jpg';
import pfpImage from '../../../assets/trimm.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab);

class Footer extends Component {
  constructor(props) {
    super(props);

  }
 
  render() {
   return (
        
    <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Made by:</h5>
            <ul className="footer-creators">
              <li>Aamir Farooq (frontend) <a className="font-awesome-icons" href="https://github.com/SlimShadyIAm"><FontAwesomeIcon icon={['fab', 'github']} /></a></li>
              <li>Nick Shindler (frontend) <a className="font-awesome-icons" href="https://git.snt.utwente.nl/shindler"><FontAwesomeIcon icon={['fab', 'gitlab']} /></a></li>
              <li>Veselin Daskalov (backend) <a className="font-awesome-icons" href="https://git.snt.utwente.nl/daskalov"><FontAwesomeIcon icon={['fab', 'gitlab']} /></a></li>
              <li>Frans de Boer (backend) <a className="font-awesome-icons" href="https://github.com/Frans-db"><FontAwesomeIcon icon={['fab', 'github']} /></a></li>
              <li>Nikola Martinos (database) <a className="font-awesome-icons" href="https://github.com/nickMartinos"><FontAwesomeIcon icon={['fab', 'github']} /></a></li>
              <li>Bozhidar Velinov (database) <a className="font-awesome-icons" href="https://git.snt.utwente.nl/MrNobody"><FontAwesomeIcon icon={['fab', 'gitlab']} /></a></li>
          </ul>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">About TRIMM</h5>
          <ul>
            <li><a className="grey-text text-lighten-3" href="https://www.trimm.nl/about-us">About TRIMM</a></li>
            <li><a className="grey-text text-lighten-3" href="https://www.trimm.nl/en/cases/runner-assist">About Runner Assist</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Support</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Privacy Policy</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Terms of Use</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2019 Group 06 @ University of Twente
      <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
    </div>
  </footer>
    );
  }
}

export default Footer;
