import styled from 'styled-components'

export default styled.div`
  text-align: center;
  white-space: nowrap;
  &:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: ${props => props.height || 'auto'};
  }
  @media(max-width: 767px) {
    &:before {
      ${props => (props.mobileHeight ? `
        height: ${props.mobileHeight}
      ` : '')}
    }
  }
  @media(min-width: 768px) {
    &:before {
      ${props => (props.desktopHeight ? `
        height: ${props.desktopHeight}
      ` : '')}
    }
  }
`
