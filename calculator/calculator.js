let firstValue = ''
let secondValue = ''
let sign = ''
let tmpSign = ''
let thirdValue = ''

screenElement = document.querySelector('.js-screen');
screenElement.innerHTML = 0;

nums = document.querySelectorAll('.js-operand');
operators = document.querySelectorAll('.js-operator');
nums.forEach(element => {
  element.addEventListener('click', () => {
    clearElement.innerHTML = 'C';
    if (tmpSign === '')
    {
      if (sign === '')
      {
        firstValue += element.innerHTML;
        screenElement.innerHTML = ''
        screenElement.innerHTML += firstValue
        console.log(firstValue);
      }
      else
      {
        secondValue += element.innerHTML;
        // screenElement.innerHTML = ''
        screenElement.innerHTML += secondValue
        console.log(secondValue);
      }
    }
    else
    {
      thirdValue += element.innerHTML;
      // screenElement.innerHTML = ''
      screenElement.innerHTML = thirdValue
    }
  })
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    if (tmpSign === '')
    {
      tmpSign = operator.innerHTML;
      if (secondValue !== '')
      {
        if (tmpSign === '+' || tmpSign === '-')
        {
        let result = performOperation(sign, firstValue, secondValue);
        firstValue = String(result);
        secondValue = ''
        sign = tmpSign
        screenElement.innerHTML += sign
        tmpSign = ''
        }
        else if((tmpSign === 'x' || tmpSign === '/') && (sign === 'x' || sign === '/'))
        {
          let result = performOperation(sign, firstValue, secondValue);
          firstValue = String(result);
          secondValue = ''
          sign = tmpSign
          screenElement.innerHTML += sign
          tmpSign = ''
        }
      
      // else if((tmpSign === 'x' || tmpSign === '/') && (sign === '+' || sign === '-'))
      // {

      // }
      }
      else
      {
        sign = tmpSign;
        screenElement.innerHTML += sign
        tmpSign = ''
        console.log(sign);
      }
    }
    else
    {
      if (thirdValue === '')
      {
        //store the current operator
        tmpSign = operator.innerHTML;
      }
      else
      {
       let result = performOperation(tmpSign, secondValue, thirdValue);
       secondValue = String(result);
       thirdValue = ''
       tmpSign = operator.innerHTML;
      }
    }

  })
});

const clearElement = document.querySelector(".js-clear");
clearElement.addEventListener('click', () => {
  screenElement.innerHTML = 0;
  firstValue = ''
  secondValue = ''
  clearElement.innerHTML = 'AC';
})

const equalElement = document.querySelector('.js-equality');
equalElement.addEventListener('click', () => {
  // console.log(sign)
  // console.log(firstValue)
  // console.log(secondValue)
  let result = 0;
  if (tmpSign !== '')
  {
    result = performOperation(tmpSign, secondValue, thirdValue);
    secondValue = String(result)
    thirdValue = ''
  }
  result = performOperation(sign, firstValue, secondValue);
  screenElement.innerHTML = ''
  if (result !== 0){
    firstValue = result;
    screenElement.innerHTML = result
  }
  else{
    screenElement.innerHTML = firstValue;
    result = firstValue;
  }
  console.log(result)
  console.log(firstValue)
  console.log(secondValue)

  secondValue = ''
  sign = ''
})

function Add(first, second){
  return (Number(first) + Number(second));
}

function Mul(first, second){
  return (Number(first) * Number(second));
}

function Div(first, second){
  return (Number(first) / Number(second));
}

function Sub(first, second){
  return (Number(first) - Number(second));
}

performOperation = (operator, first, second) => {
  let result = 0;
  switch(operator)
  {
    case '+': result = Add(first, second); break;
    case '-': result = Sub(first, second); break;
    case 'x': result = Mul(first, second); break;
    case '/': result = Div(first, second); break;
  }
  return result;
}