import React from 'react'
import PropTypes from 'prop-types'
import { Result, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BrowserClient, Hub } from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'

function withNavigation(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => <Component {...props} navigate={useNavigate()} />
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth
})

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    const sentryClient = new BrowserClient({
      dsn: 'https://e1e0c6e085894adfa96c5538ea671110@o904613.ingest.sentry.io/6150119',
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0
    })

    const sentryHub = new Hub(sentryClient)

    this.state = {
      hasError: false,
      sentryHub
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.state.sentryHub.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })

      if (isLoaded(this.props.auth) && !isEmpty(this.props.auth)) {
        scope.setUser(this.props.auth)
      }

      this.state.sentryHub.captureException(error)
    })
  }

  renderResultTitle() {
    if (isLoaded(this.props.auth) && !isEmpty(this.props.auth)) {
      return `I'm sorry, ${this.props.auth.displayName}`
    } else {
      return `I'm sorry, Dave`
    }
  }

  handleGoHome = () => {
    this.setState({ hasError: false }, () => {
      this.props.navigate('/')
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title={this.renderResultTitle()}
          subTitle="I'm afraid I can't do that"
          extra={[
            <Button
              icon={<ArrowLeftOutlined />}
              key="back-home"
              type="primary"
              onClick={this.handleGoHome}>
              Back Home
            </Button>,
            <Button
              key="report-feedback"
              type="primary"
              onClick={this.state.sentryHub.showReportDialog}>
              Send Feedback
            </Button>
          ]}
        />
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object,
  navigate: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default withNavigation(connect(mapStateToProps)(ErrorBoundary))
