import './App.css';
import React, { useState } from 'react';

type Variant = {
  size: string;
  color: string;
  price: number;
  inventory: number;
};

const sizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
const initialColors = ["Red", "Blue", "Green"];

function App() {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [colors, setColors] = useState(initialColors);
  const [groupBy, setGroupBy] = useState<'size' | 'color' | ''>('');

  const addVariant = (size: string, color: string) => {
    setVariants([...variants, { size, color, price: 0, inventory: 0 }]);
  };

  const handleColorAdd = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor('');
    }
  };

  const handleSizeAdd = () => {
    if (newSize && !sizes.includes(newSize)) {
      sizes.push(newSize);
      setNewSize('');
    }
  };

  const handleUpdate = (index: number, field: string, value: number) => {
    const newVariants = variants.map((variant, i) => i === index ? { ...variant, [field]: value } : variant);
    setVariants(newVariants);
  };

  const handleGroupBy = (group: 'size' | 'color' | '') => {
    setGroupBy(group);
  };

  const groupedVariants = groupBy ? variants.reduce((acc: any, variant) => {
    const key = variant[groupBy];
    if (!acc[key]) acc[key] = [];
    acc[key].push(variant);
    return acc;
  }, {}) : { '': variants };
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Product Management</h1>
    <div className="mb-4">
      <h2 className="text-xl">Add Color</h2>
      <input
        className="border p-2 mr-2"
        type="text"
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
        placeholder="New color"
      />
      <button
        className="bg-blue-500 text-white p-2"
        onClick={handleColorAdd}
      >
        Add Color
      </button>
    </div>
    <div className="mb-4">
      <h2 className="text-xl">Add Size</h2>
      <input
        className="border p-2 mr-2"
        type="text"
        value={newSize}
        onChange={(e) => setNewSize(e.target.value)}
        placeholder="New size"
      />
      <button
        className="bg-blue-500 text-white p-2"
        onClick={handleSizeAdd}
      >
        Add Size
      </button>
    </div>
    <div className="mb-4">
      <h2 className="text-xl">Group By</h2>
      <button
        className={`p-2 mr-2 ${groupBy === 'size' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleGroupBy('size')}
      >
        Size
      </button>
      <button
        className={`p-2 ${groupBy === 'color' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleGroupBy('color')}
      >
        Color
      </button>
      <button
        className="p-2 bg-gray-200"
        onClick={() => handleGroupBy('')}
      >
        None
      </button>
    </div>
    <div className="grid grid-cols-5 gap-4 mb-4">
      {sizes.map((size) => (
        colors.map((color) => (
          <button
            key={`${size}-${color}`}
            className="bg-gray-200 p-2"
            onClick={() => addVariant(size, color)}
          >
            {size} - {color}
          </button>
        ))
      ))}
    </div>
    {Object.keys(groupedVariants).map((key) => (
      <div key={key}>
        {key && <h3 className="text-xl mb-2">{groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}: {key}</h3>}
        <table className="min-w-full bg-white mb-4">
          <thead>
            <tr>
              <th className="py-2">Size</th>
              <th className="py-2">Color</th>
              <th className="py-2">Price</th>
              <th className="py-2">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {groupedVariants[key].map((variant: Variant, index: number) => (
              <tr key={index}>
                <td className="border px-4 py-2">{variant.size}</td>
                <td className="border px-4 py-2">{variant.color}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => handleUpdate(index, 'price', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={variant.inventory}
                    onChange={(e) => handleUpdate(index, 'inventory', parseFloat(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
  );
}

export default App;
