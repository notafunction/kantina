import React from 'react'
import ReactMarkdown from 'react-markdown'
import ChangeLogMarkdown from '../CHANGELOG.md'
import Container from '../components/Container'

const ChangeLog = () => {
  const [markdown, setMarkdown] = React.useState('')

  React.useEffect(() => {
    fetch(ChangeLogMarkdown)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text)
      })
  })

  return (
    <Container>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Container>
  )
}

export default ChangeLog
