import styled from 'styled-components'
import { Spin } from 'antd'

export default styled(Spin)`
  height: 100%;
  width: 100%;
  display: flex;

  > .ant-spin-dot {
    margin: auto;
  }
`
