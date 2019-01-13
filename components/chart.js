import { Line } from 'react-chartjs-2';

const colors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

export default ({reports}) => {
  const size = {
    label: 'size',
    backgroundColor: colors.red,
    stack: 'sizes',
    data: [
    ]
  }

  const tooltips = {
    callbacks: {
      title: function(tooltipItem, data) {
        return 'sup'
      },
      label: function(tooltipItem, data) {
        return 'aaa'
      },
      afterLabel: function(tooltipItem, data) {
        return 'asd'
      }
    }
  };

  const assets = {}

  reports.forEach((report) => {
    let index = 0;
    const { sizes } = report;

    sizes.forEach(size => {
      if (size.name in assets === false) {
        assets[size.name] = {
          label: size.name,
          backgroundColor: colors[++index],
          stack: 'size',
          data: []
        };
      }

      assets[size.name].data.push(size.size);
    });
  });

  const data = {
    datasets: []
  };

  for (const asset in assets) {
    data.datasets.push(assets[asset])
  }

  return (
    <div>
      <Line
        data={data}
        width={100}
        height={50}
        options={{
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }}
      />
    </div>
  )
}
