import { withScreenSize } from '@vx/responsive';
import Background from './background';
import BitcoinPrice from './bitcoinprice';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const first = fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-08-01&end=2017-09-05')
      .then(res => {
        return res.json();
      });

    const second = fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-10-01&end=2018-11-05')
      .then(res => {
        return res.json();
      });

    Promise.all([first, second]).then((json) => {
      this.setState({
        data: json
      });
    })
  }
  render() {
    const { screenWidth, screenHeight } = this.props;
    const { data } = this.state;
    return (
      <div className="app">
        <Background width={screenWidth} height={screenHeight} />
        <div className="center">
          <BitcoinPrice data={data} width={screenWidth} height={screenHeight} />
          <p className="disclaimer">
            {data.disclaimer}
          </p>
        </div>
        <style jsx>{`
          .app,
          .center {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            display: flex;
            font-family: arial;
            flex-direction: column;
          }
          .disclaimer {
            margin-top: 35px;
            font-size: 11px;
            color: white;
            opacity: 0.4;
          }
          .center {
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

export default withScreenSize(App);
