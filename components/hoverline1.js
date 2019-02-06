import { Line } from '@vx/shape';

export default ({ from, to }) => {
  return (
      <Line
        from={from}
        to={to}
        stroke="white"
        strokeWidth={1}
        style={{ pointerEvents: 'none' }}
        strokeDasharray="2,2"
      />
  );
};
