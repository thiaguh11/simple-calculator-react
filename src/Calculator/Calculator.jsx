import React from 'react'
import './Calculator.css'
import Btn from '../Components/Button'
import Display from '../Components/Display'

const initialState = {
    displayValue: "0",
    current: 0,
    clearDisplay: false,
    values: [0, 0],
    historic: "",
    clearHistoric: false
}

export default class Calculator extends React.Component {
    
    state = {...initialState}

    constructor(props){
        super(props)

        this.clear = this.clear.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }
    //LIMPAR MEMORIA
    clear(){
        this.setState({...initialState})
    }

    //FUNÇAO PARA CALCULO DOS VALORES RECEBE COMO PARAMETRO O PRIMEIRO E SEGUNDO VALOR E TBM A OPERAÇÃO A SER REALIZADA
    calculate(n1, n2, op){
        let res = 0
        switch(op){
            case "+":
                res = n1 + n2
                break;
            case "-":
                res = n1 - n2
                break;
            case "*":
                res = n1 * n2
                break;
            case "/":
                if(n2 === 0){
                    res = 0
                } else{
                    res = n1 / n2
                }
                break;
            default:
                res = null
                break;
        }
        return res
    }

    setOperation(operation){
        let current = this.state.current
        if(current === 0 && this.state.operation !== null){
            let newHistoric = operation === "=" ? "" : (this.state.values[current] + operation)
            this.setState({
                current: 1,
                operation, 
                clearDisplay: true,
                historic: this.state.historic + newHistoric
            })
        } else {
            const equals = operation === "="
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try{
                values[0] = this.calculate(values[0], values[1], currentOperation)
                values[0] = parseFloat(values[0].toFixed("2"))
                if(values[0] === null){
                    return
                }
            } catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0

            let newHistoric = operation === "=" ? (this.state.displayValue + this.state.operation)  : (this.state.displayValue + operation)

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                historic: equals ? "" : this.state.historic + newHistoric,
                values
            })
        }
    }

    addDigit(n){
        //RETORNA VAZIO SE O USUÁRIO TENTAR ADICIONAR MAIS DE UM PONTO (.)
        if(n === "." && this.state.displayValue.includes(".")){
            return
        }

        //ALTERAR SINAL DE UM NÚMERO
        if(n === "+/-"){
            let current = this.state.current
            let values = [...this.state.values]
            values[current] = (values[current]) * (-1)
            this.setState({values, displayValue: values[current]})
            return
        }

        //LIMPAR DISPLAY CASO CLEARDISPLAY SEJA TRUE E DISPLAYVALUE IGUAL A 0
        const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay
        const currentValue = clearDisplay ? "" : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n !== "."){
            const current = this.state.current
            let newValue = parseFloat(displayValue)
            let values = [...this.state.values]
            values[current] = newValue
            this.setState({values})
        }

    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} resValue={this.state.historic} />
                <Btn n="AC" click={this.clear} triple />
                <Btn n="/"  click={this.setOperation} operation />
                
                <Btn n="7"  click={this.addDigit} />
                <Btn n="8"  click={this.addDigit} />
                <Btn n="9"  click={this.addDigit} />
                <Btn n="*"  click={this.setOperation} operation />

                <Btn n="4"  click={this.addDigit} />
                <Btn n="5"  click={this.addDigit} />
                <Btn n="6"  click={this.addDigit} />
                <Btn n="-"  click={this.setOperation} operation />

                <Btn n="1"  click={this.addDigit} />
                <Btn n="2"  click={this.addDigit} />
                <Btn n="3"  click={this.addDigit} />
                <Btn n="+"  click={this.setOperation} operation />

                <Btn n="+/-"  click={this.addDigit} />
                <Btn n="0"  click={this.addDigit} />
                <Btn n="."  click={this.addDigit} />
                <Btn n="="  click={this.setOperation} operation />
            </div>
        )
    }
}