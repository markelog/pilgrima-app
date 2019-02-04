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
        return {
          "bpi": {
            "2017-08-01": 2935.5875,
            "2017-08-02": 2923.58,
            "2017-08-03": 3014.3613,
            "2017-08-04": 3083.6813,
            "2017-08-05": 3501.7588,
            "2017-08-06": 3455.0025,
            "2017-08-07": 3631.9688,
            "2017-08-08": 3653.1625,
            "2017-08-09": 3577.5438,
            "2017-08-10": 3645.28,
            "2017-08-11": 3879.6075,
            "2017-08-12": 4117.6488,
            "2017-08-13": 4311.1963,
            "2017-08-14": 4582.7413,
            "2017-08-15": 4404.43,
            "2017-08-16": 4625.2963,
            "2017-08-17": 4516.34,
            "2017-08-18": 4359.4575,
            "2017-08-19": 4406.1313,
            "2017-08-20": 4311.22,
            "2017-08-21": 4254.9425,
            "2017-08-22": 4337.6725,
            "2017-08-23": 4391.2175,
            "2017-08-24": 4562.475,
            "2017-08-25": 4608.3238,
            "2017-08-26": 4587.4613,
            "2017-08-27": 4594.515,
            "2017-08-28": 4639.6588,
            "2017-08-29": 4848.1338,
            "2017-08-30": 4830.7275,
            "2017-08-31": 4964.8675,
            "2017-09-01": 5150.7238,
            "2017-09-02": 4843.975,
            "2017-09-03": 4831.695,
            "2017-09-04": 4519.7213,
            "2017-09-05": 4622.1213
          },
          "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
          "time": {
            "updated": "Sep 6, 2017 00:03:00 UTC",
            "updatedISO": "2017-09-06T00:03:00+00:00"
          }
        }
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
