import React from 'react';
import { shining, divinaCommedia, pabloNeruda } from './templates';

function DummyText({ options, className }) {
  
  function generateSQLInjectionTestString() {
    const sqlKeywords = ["SELECT", "DROP", "INSERT", "DELETE", "UPDATE", "UNION", "--", "#", "/*", "*/"];
    const specialChars = ["'", "\"", ";", "\\", ")", "(", "`", "|"];
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomString(length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += randomChars[Math.floor(Math.random() * randomChars.length)];
        }
        return result;
    }

    // Build the test string
    let testString = "";

    // Add a random SQL keyword
    testString += getRandomElement(sqlKeywords);

    // Add random special characters and random text
    for (let i = 0; i < 5; i++) { // Add 5 segments of random data
        testString += getRandomElement(specialChars);
        testString += getRandomString(Math.floor(Math.random() * 10) + 1); // Random string between 1-10 chars
    }

    // Add another SQL keyword to simulate more complexity
    testString += getRandomElement(sqlKeywords);

    return testString;
}



  function setDummyText() {
    if (options.template == 'sql') {
      let result = '';
      for (let i = 0; i < 500; i++) {
        result += generateSQLInjectionTestString();
      }
      return result.slice(0, options.nCharacters);;
    }
    let result = '';
    if (options.template == '') {
      const basicCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const accentedCharacters = 'áéíóúÁÉÍÓÚ';
      const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>/?';
      let characters = options.accents ? basicCharacters + accentedCharacters : basicCharacters;
  
      if (options.specialCharacters) {
        characters += specialCharacters;
      }
     
      for (let i = 0; i < options.nCharacters; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        if (options.addSpaces && i % (Math.floor(Math.random() * (10 - 3 + 1)) + 3) === 0) {
          result += ' ';
        }
        if (options.addLineBreaks && i % (Math.floor(Math.random() * (50 - 10 + 1)) + 10) === 0) {
          result += '\n';
        }
      }
    }
    else if (options.template != '') {
      if (options.template == 'shining') {
        result = shining.slice(0, options.nCharacters);
      }
      else if (options.template == 'divinaCommedia') {
        result = divinaCommedia.slice(0, options.nCharacters);
      }
      else if (options.template == 'pabloNeruda') {
        result = pabloNeruda.slice(0, options.nCharacters);
      }
      if (options.accents) {
        result = result.replace(/[aeiouAEIOU]/g, (match) => {
          const accentsMap = {
            'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú',
            'A': 'Á', 'E': 'É', 'I': 'Í', 'O': 'Ó', 'U': 'Ú'
          };
          return accentsMap[match] || match;
        });
      }
      if (options.specialCharacters) {
        result = result.replace(/./g, (match) => {
          const specialCharactersMap = {
            'a': '@', 'e': '3', 'i': '1', 'o': '0', 'u': '4',
            'A': '@', 'E': '3', 'I': '1', 'O': '0', 'U': '4'
          };
          return specialCharactersMap[match] || match;
        });
      }
      if (options.addSpaces) {
        result = result.replace(/./g, (match, index) => {
          if (index % (Math.floor(Math.random() * (10 - 3 + 1)) + 3) === 0) {
            return match + ' ';
          }
          return match;
        });
      }
      if (options.addLineBreaks) {
        result = result.replace(/./g, (match, index) => {
          if (index % (Math.floor(Math.random() * (50 - 10 + 1)) + 10) === 0) {
            return match + '\n';
          }
          return match;
        });
      }
    }
    return result;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="dummy-text-box bg-[#363A4F] text-[#CAD3F5] rounded-md p-4 overflow-auto max-h-[300px] custom-scrollbar">
        <pre className="whitespace-pre-wrap font-mono text-sm">{setDummyText()}</pre>
      </div>
      <button 
        className="dummy-text-copy absolute top-2 right-2 bg-[#F5BDE6] hover:bg-[#F4DBD6] text-[#24273A] rounded-full p-2 transition-colors"
        onClick={() => {
          navigator.clipboard.writeText(setDummyText());
          const copyPopup = document.createElement('div');
          copyPopup.classList.add('copied-popup', 'fixed', 'top-1/4', 'right-1/2', 'translate-x-1/2', 'translate-y-1/2', 'bg-[#1E2030]', 'text-[#CAD3F5]', 'rounded', 'p-2', 'transition-opacity', 'opacity-0', 'z-50', 'border', 'border-[#F5BDE6]');
          copyPopup.innerText = 'Copied!';
          document.body.appendChild(copyPopup);
          setTimeout(() => {
            copyPopup.classList.add('opacity-100');
          }, 100);
          setTimeout(() => {
            copyPopup.classList.remove('opacity-100');
            setTimeout(() => {
              document.body.removeChild(copyPopup);
            }, 300);
          }, 1000);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      </button>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #363A4F;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #F5BDE6;
          border-radius: 20px;
          border: 3px solid #363A4F;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #F4DBD6;
        }
      `}</style>
    </div>
  );
}

export default DummyText;