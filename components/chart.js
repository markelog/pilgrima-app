import { Group } from '@vx/group';
import { AreaClosed, LinePath, Bar } from '@vx/shape';
import { withParentSize } from '@vx/responsive';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinearGradient } from '@vx/gradient';
import { PatternLines } from '@vx/pattern';
import { AxisBottom } from '@vx/axis';
import { withTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';

import Tooltips from './tooltips';
import HoverLine from './hoverline1';
import Circle from './circle';
import MaxPrice from './maxprice';
import MinPrice from './minprice';
import formatPrice from '../utils/formatPrice';
import formatDate from '../utils/formatDate';

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      data,
      parentWidth = 600,
      parentHeight = 400,
      margin = {},
      tooltipData,
      tooltipLeft,
      tooltipTop,
      showTooltip,
      hideTooltip
    } = this.props;

    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    const x = d => new Date(d.time);
    const y = d => d.price;
    const bisectDate = bisector(d => x(d)).left;

    const firstPoint = data[0][0];
    const currentPoint = data[0][data[0].length - 1];
    const minPrice = Math.min(...data[0].concat(data[1]).map(d => d.price));
    const maxPrice = Math.max(...data[0].concat(data[1]).map(y));

    const firstPrice = y(firstPoint);
    const currentPrice = y(currentPoint);
    const maxData = [
      { time: x(firstPoint), price: maxPrice },
      { time: x(currentPoint), price: maxPrice }
    ];
    const minData = [
      { time: x(firstPoint), price: minPrice },
      { time: x(currentPoint), price: minPrice }
    ];

    const xScale = scaleTime({
      range: [0, width],
      domain: [x(firstPoint), x(currentPoint)]
    });
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [minPrice, maxPrice + 100]
    });

    return (
      <div>
        <svg
          ref={s => (this.svg = s)}
          width={parentWidth}
          height={parentHeight}
        >
          <LinearGradient
            id="fill"
            from="#6086d6"
            to="#6086d6"
            fromOpacity={0.2}
            toOpacity={0}
          />
          {/* <PatternLines
            id="dLines"
            height={6}
            width={6}
            stroke="#27273f"
            strokeWidth={1}
            orientation={['diagonal']}
          /> */}
          <Group top={margin.top} left={margin.left}>
            <AxisBottom
              scale={xScale}
              x={x}
              top={height}
              left={margin.left + 18}
              numTicks={3}
              hideTicks
              hideAxisLine
              tickLabelProps={() => ({
                fill: "#ffffff",
                fontSize: 11,
                textAnchor: 'middle'
              })}
            />
            <MaxPrice
              data={maxData}
              yText={yScale(maxPrice)}
              label={formatPrice(maxPrice)}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
            />
            <AreaClosed
              stroke="transparent"
              data={data[0]}
              yScale={yScale}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              fill="url(#fill)"
            />
            <AreaClosed
              stroke="transparent"
              data={data[0]}
              yScale={yScale}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              fill="url(#dLines)"
            />
            <LinePath
              data={data[0]}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              stroke="#6086d6"
              strokeOpacity="0.8"
              strokeWidth={1}
            />

            <AreaClosed
              stroke="transparent"
              data={data[1]}
              yScale={yScale}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              fill="url(#fill)"
            />
            <AreaClosed
              stroke="transparent"
              data={data[1]}
              yScale={yScale}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              fill="url(#dLines)"
            />
            <LinePath
              data={data[1]}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              stroke="#6086d6"
              strokeOpacity="0.8"
              strokeWidth={1}
            />

            <MinPrice
              data={minData}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              yText={yScale(minPrice)}
              label={formatPrice(minPrice)}
            />
            <Bar
              data={data[0]}
              width={width}
              height={height - margin.bottom}
              fill="transparent"
              onMouseLeave={event => hideTooltip()}
              onMouseMove={event => {
                const getData = (data) => {
                  const { x: xPoint } = localPoint(this.svg, event);
                  const x0 = xScale.invert(xPoint);
                  const index = bisectDate(data, x0, 1);
                  const d0 = data[index - 1];
                  const d1 = data[index];

                  return x0 - xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0
                }

                const size = getData(data[0])
                const gzip = getData(data[1])

                showTooltip({
                  tooltipData: [size, gzip],
                  tooltipLeft: [xScale(x(size)), xScale(x(gzip))],
                  tooltipTop: [yScale(y(size)), yScale(y(gzip))]
                });
              }}
            />
          </Group>
          {tooltipData &&
            <HoverLine
              from={{
                x: tooltipLeft[1],
                y: yScale(y(maxData[1]))
              }}
              to={{
                x: tooltipLeft[1],
                y: yScale(y(minData[0]))
              }}
              tooltipLeft={tooltipLeft[1]}
              tooltipTop={tooltipTop[1]}
            />}

          {tooltipData &&
            <Circle
              left={tooltipLeft[0]}
              top={tooltipTop[0]}
            />}

          {tooltipData &&
            <Circle
              left={tooltipLeft[1]}
              top={tooltipTop[1]}
            />}

        </svg>
        {tooltipData &&
          <Tooltips
            yTop={tooltipTop[0] - 12}
            yLeft={tooltipLeft[0] + 12}
            yLabel={formatPrice(y(tooltipData[0]))}
            xTop={yScale(y(minData[0])) + 4}
            xLeft={tooltipLeft[0]}
            xLabel={formatDate(x(tooltipData[0]))}
          />
        }

        {tooltipData &&
          <Tooltips
            yTop={tooltipTop[1] - 12}
            yLeft={tooltipLeft[1] + 12}
            yLabel={formatPrice(y(tooltipData[1]))}
            xTop={yScale(y(minData[0])) + 4}
            xLeft={tooltipLeft[1]}
            xLabel={formatDate(x(tooltipData[1]))}
          />
        }
      </div>
    );
  }
}

export default withTooltip(Chart);
