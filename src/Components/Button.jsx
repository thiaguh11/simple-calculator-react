import React from 'react'
import './Button.css'

export default props => <button className={`
    btn  
    ${props.double ? 'double' : ''}
    ${props.triple ? 'triple' : ''}
    ${props.operation ? 'operation' : ''}
    `}
    onClick={() => props.click && props.click(props.n)}
    >
    {props.n}
</button>