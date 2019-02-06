export default ({ left, top }) => {
  return (
    <g>
      <circle
        cx={left}
        cy={top}
        r={8}
        fill="#00f1a1"
        fillOpacity={0.2}
        style={{ pointerEvents: 'none' }}
      />
      <circle
        cx={left}
        cy={top}
        r={4}
        fill="#00f1a1"
        fillOpacity={0.8}
        style={{ pointerEvents: 'none' }}
      />
    </g>
  );
};
