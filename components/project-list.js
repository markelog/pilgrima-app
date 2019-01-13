import Link from 'next/link'

export default ({projects}) => {
  const list = projects.map((item, index) => {
    const {repository} = item;
    const href = `/project/${repository}`;
    const as = `/project?repository=${repository}`;

    return (<li key={index}>
      <Link as={href} href={href}>
        <a>{repository}</a>
      </Link>
    </li>)
  })

  return <ul>{list}</ul>
}
