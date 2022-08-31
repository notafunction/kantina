import styled from 'styled-components'

const Styled = {
  Header: styled.div`
    padding: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      margin-bottom: 0;
      flex: 1;
    }
  `,

  Dropzone: styled.div`
    min-height: 250px;
    overflow: auto;
  `
}

Styled.Content = styled.div`
  max-height: 100%;
  background-color: ${(props) => props.itemColor};
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  white-space: normal;

  ${Styled.Header} {
    .ant-dropdown-trigger {
      opacity: 0;
      transition: all 0.1s ease-in;

      &.ant-dropdown-open {
        opacity: 1;
      }
    }
  }

  &:hover {
    ${Styled.Header} {
      .ant-dropdown-trigger {
        opacity: 1;
      }
    }
  }
`

export default Styled
