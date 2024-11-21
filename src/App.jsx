import React, { useState } from 'react'
import DummyText from './components/dummytext'

export default function DummyTextGenerator() {
  const [options, setOptions] = useState({
    addSpaces: false,
    addLineBreaks: false,
    nCharacters: 100,
    accents: false,
    template: '',
    specialCharacters: false
  });

  const handleGenerateText = (template = '') => {
    const number = document.querySelector('input[name="number"]').value;
    if (number === '') {
      document.querySelector('input[name="number"]').classList.add('border-[#F5BDE6]');
      const errorPopup = document.createElement('div');
      errorPopup.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'bg-red-500', 'rounded', 'px-4', 'py-2', 'text-[#363A4F]', 'text-sm', 'font-medium', 'transition-opacity', 'duration-300', 'opacity-0');
      setTimeout(() => errorPopup.classList.remove('opacity-0'), 10);
      setTimeout(() => errorPopup.classList.add('opacity-0'), 2900);
      errorPopup.textContent = 'Enter number of characters';
      document.querySelector('input[name="number"]').parentElement.appendChild(errorPopup);
      setTimeout(() => errorPopup.remove(), 3000);
      return;
    }
    document.querySelector('input[name="number"]').classList.remove('border-[#F5BDE6]');
    setOptions({
      nCharacters: parseInt(number),
      addSpaces: document.querySelector('input[name="addSpaces"]').checked,
      addLineBreaks: document.querySelector('input[name="addLineBreaks"]').checked,
      accents: document.querySelector('input[name="accents"]').checked,
      specialCharacters: document.querySelector('input[name="specialCharacters"]').checked,
      template: template
    });
  };

  return (
    <div className="min-h-screen p-8 bg-[#24273A]">
      <div className="max-w-2xl mx-auto border-2 border-[#F5BDE6] rounded-lg overflow-hidden bg-[#1E2030]">
        <div className="text-center p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5BDE6]">
            Dummy Text Generator
          </h1>
        </div>
        <div className="p-6 space-y-6">
          <DummyText options={options} className="w-full p-4 min-h-[100px] border border-[#F5BDE6] bg-[#363A4F] text-[#CAD3F5]"/>

          <div className="space-y-4">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-[#CAD3F5]">Number of Characters</label>
              <input 
                type="number" 
                id="number" 
                name="number" 
                className="mt-1 block w-full rounded-md border border-[#F5BDE6] focus:border-[#F5BDE6] focus:ring focus:ring-[#F5BDE6] focus:ring-opacity-50 bg-[#363A4F] text-[#CAD3F5] px-3 py-2"
                placeholder="Enter number of characters" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['addSpaces', 'addLineBreaks', 'accents', 'specialCharacters'].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={option}
                    name={option}
                    className="rounded text-[#F5BDE6] border-[#F5BDE6] focus:ring-[#F5BDE6] bg-[#363A4F]"
                  />
                  <label htmlFor={option} className="text-sm font-medium text-[#CAD3F5]">
                    {option.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { text: 'Random Text', template: '' },
              { text: 'Divina Commedia', template: 'divinaCommedia' },
              { text: 'Shining', template: 'shining' },
              { text: 'Pablo Neruda', template: 'pabloNeruda' },
              { text: 'Sql Injection', template: 'sql' }

            ].map((button) => (
              <button
                key={button.text}
                onClick={() => handleGenerateText(button.template)}
                className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-[#F5BDE6] text-[#24273A] hover:bg-[#F4DBD6]"
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}