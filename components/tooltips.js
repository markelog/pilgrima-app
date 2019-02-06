import { Tooltip } from '@vx/tooltip';

export default ({ yTop, yLeft, yLabel, xTop, xLeft, xLabel }) => {
  return (
    <div>
      <Tooltip
        top={xTop}
        left={xLeft}
        style={{
          transform: 'translateX(-50%)'
        }}
      >
        {xLabel}
      </Tooltip>
      <Tooltip
        top={yTop}
        left={yLeft}
        style={{
          backgroundColor: 'rgba(92, 119, 235, 1.000)',
          color: 'white'
        }}
      >
        <a href="https://yandex.ru">yandex</a>
        {yLabel}
      </Tooltip>
    </div>
  );
};
