import React, { useEffect } from 'react';
import DataInputs from './Components/DataInputs/DataInputs';
import DataSlider from './Components/DataSlider/DataSlider';
import DataSelect from './Components/DataSelect/DataSelect';
import Result from './Components/Result/Result';
import Filter from './Components/Filter/Filter';
import Cart from './Components/Cart/Cart';
import data from './data/data.json';
import config from './data/config.json';
import './App.css';

function App() {
    const configLength = config.filter(el => el.name === "Длина")[0];
    const configWidth = config.filter(el => el.name === "Ширина")[0];
    const configStrength = config.filter(el => el.type === "frame");
    let optionsData = data.filter(el => el.type === "list").map((option) => option.name);

    const [material, setMaterial] = React.useState('');
    const [width, setWidth] = React.useState(configWidth.min);
    const [length, setLength] = React.useState(configLength.min);
    const [strength, setStrength] = React.useState('');
    const [options, setOptions] = React.useState(optionsData);
    const [value, setValue] = React.useState(options[0]);
    const [filters, setFilters] = React.useState('');
    const [cartData, setCartData] = React.useState([]);
    
    useEffect(() => {
        if(filters === 'Пластик'){
            optionsData = data.filter(el => el.type === "list").filter(el => el.material === 'plastic').map((option) => option.name);
        }else if(filters === 'Метал'){
            optionsData = data.filter(el => el.type === "list").filter(el => el.material === 'metal').map((option) => option.name);
        }
        setOptions(optionsData);
        setValue(options[0]);
    },[filters]);

    function addToCart(data){
        const cart = [...cartData];
        const cartItem = {...data};
        cart.push(cartItem);
        setCartData(cart);
    }

    return (
    <div className="app">
        <div className='options'>
            <DataInputs 
                options={options} 
                value={value} 
                material={material}
                onChange={(newValue) => {setValue(newValue)}} 
                onInputChange={(newInputValue) => {setMaterial(newInputValue)}}
            />
            <Filter 
                options={['Метал', 'Пластик', '']} 
                value={filters.material} 
                label={'Вид материала'} 
                onChange={(newValue) => {setFilters(newValue ? newValue : '')}} 
                onInputChange={(newInputValue) => {setFilters(newInputValue ? newInputValue : '')}}
            />
        </div>
        <div className='sliders'>
            <DataSlider 
                name="Ширина" 
                value={width} 
                min={configWidth.min} 
                max={configWidth.max} 
                step={configWidth.step} 
                setState={setWidth}
            />
            <DataSlider 
                name="Длина" 
                value={length} 
                min={configLength.min} 
                max={configLength.max} 
                step={configLength.step} 
                setState={setLength}
            />
        </div>
        <DataSelect configStrength={configStrength} strength={strength} setStrength={setStrength}/>
        {material && width && length && strength &&
            <Result 
                material={material}
                width={width}
                length={length}
                strength={strength}
                addToCart={addToCart}
            />
        }
        {Boolean(cartData.length) &&
            <Cart cartData={cartData}/>
        }
    </div>
  );
}

export default App;
