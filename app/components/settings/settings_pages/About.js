import React, { Component, PropTypes } from 'react';
import { VERSION, NAME } from '../../../APP_INFORMATION.js';
import sidebar_styles from '../../Sidebar.css';
import styles from './Page.css';

class About extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
        <div className={sidebar_styles.panel_header}>
          <i className="material-icons md-24">info</i> About
        </div>
        <div className={styles.settings_body}>
          <div className={styles.item}>
            <h2 className={styles.divider}>{`${NAME} ${VERSION}`}</h2>
            <p>
              {`${NAME}`} is free software, licensed under the&nbsp;
              <a href="https://github.com/Aurora0001/IRCClient/blob/master/LICENSE" target="_blank">
                MIT License.
              </a>
            </p>
            <p>
              With thanks to:
              <ul className={styles.thanksList}>
                <li>Cameron Thomas (<a href="https://github.com/SirBlackhand" target="_blank">@SirBlackhand</a>)</li>
                <li><a href="https://github.com/NikxDa" target="_blank">NikxDa</a></li>
                <li><a href="https://github.com/Chronium" target="_blank">Chronium</a></li>
                <li><a href="https://github.com/SplittyDev" target="_blank">SplittyDev</a></li>
              </ul>
            </p>
          </div>
          <br />
          <h2 className={styles.divider}>Dependencies</h2>
          <div className={styles.item}>
            <h3 className={styles.divider}>Electron React Boilerplate v0.10.0</h3>
            <p>
              Licensed under the&nbsp;
              <a href="https://github.com/chentsulin/electron-react-boilerplate/blob/master/LICENSE" target="_blank">
                MIT License
              </a>
              &nbsp;by C. T. Lin.
            </p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.divider}>Google Material Icons</h3>
            <p>
              Licensed under the&nbsp;
              <a href="https://design.google.com/icons/" target="_blank">
                Apache License 2.0
              </a>
              &nbsp;by Google.
            </p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.divider}>Twitter Twemoji</h3>
            <p>
              Graphics licensed under the&nbsp;
              <a href="https://github.com/twitter/twemoji/blob/gh-pages/LICENSE-GRAPHICS" target="_blank">
                CC BY 4.0
              </a>.
              Rendering code from the 'twemoji' library is available under the&nbsp;
              <a href="https://github.com/twitter/twemoji/blob/gh-pages/LICENSE" target="_blank">
                MIT License
              </a>.
            </p>
          </div>
          <h4>
            Other dependencies may be found in resources/app/node_modules,
            along with their licenses.
          </h4>
          <h4>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.
          </h4>
          <p>
            If you do not agree with any of the above conditions, discontinue use
            of this program immediately.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
